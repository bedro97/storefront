#!/usr/bin/env node

/**
 * Move Products to Default Channel Script
 *
 * This script moves products from the b2b channel to the default channel
 */

import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, "..", ".env");
config({ path: envPath });

// Configuration
const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL;
const SALEOR_AUTH_TOKEN = process.env.SALEOR_AUTH_TOKEN;

if (!SALEOR_API_URL) {
	console.error("❌ Error: NEXT_PUBLIC_SALEOR_API_URL environment variable is required");
	process.exit(1);
}

if (!SALEOR_AUTH_TOKEN) {
	console.error("❌ Error: SALEOR_AUTH_TOKEN environment variable is required");
	process.exit(1);
}

// Helper function to make GraphQL requests
async function makeGraphQLRequest(query, variables = {}) {
	try {
		const response = await fetch(SALEOR_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${SALEOR_AUTH_TOKEN}`,
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`HTTP ${response.status} Error:`, errorText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (data.errors) {
			console.error("GraphQL Errors:", JSON.stringify(data.errors, null, 2));
			throw new Error(`GraphQL errors: ${JSON.stringify(data.errors, null, 2)}`);
		}

		return data.data;
	} catch (error) {
		console.error("❌ GraphQL request failed:", error.message);
		throw error;
	}
}

// Get all channels
async function getChannels() {
	const query = `
		query {
			channels {
				id
				name
				slug
				isActive
			}
		}
	`;

	const data = await makeGraphQLRequest(query);
	return data.channels;
}

// Get products from b2b channel
async function getProductsFromChannel(channelSlug) {
	const query = `
		query GetProducts($channelSlug: String!) {
			products(first: 10, channel: $channelSlug) {
				edges {
					node {
						id
						name
						slug
						channelListings {
							channel {
								id
								name
								slug
							}
						}
					}
				}
			}
		}
	`;

	const data = await makeGraphQLRequest(query, { channelSlug });
	return data.products.edges.map((edge) => edge.node);
}

// Move product to default channel
async function moveProductToChannel(productId, channelId) {
	const mutation = `
		mutation ProductChannelListingUpdate($id: ID!, $input: ProductChannelListingUpdateInput!) {
			productChannelListingUpdate(id: $id, input: $input) {
				errors {
					field
					message
					code
				}
			}
		}
	`;

	const result = await makeGraphQLRequest(mutation, {
		id: productId,
		input: {
			updateChannels: [
				{
					channelId: channelId,
					isPublished: true,
				},
			],
		},
	});

	return result.productChannelListingUpdate;
}

// Main execution function
async function main() {
	console.log("🚀 Moving products to default channel...\n");

	try {
		// Get all channels
		console.log("🔍 Getting channels...");
		const channels = await getChannels();
		const b2bChannel = channels.find((ch) => ch.slug === "b2b");
		const defaultChannel = channels.find((ch) => ch.slug === "default-channel");

		if (!b2bChannel) {
			throw new Error("b2b channel not found");
		}

		if (!defaultChannel) {
			throw new Error("default-channel not found");
		}

		console.log(`✅ Found b2b channel: ${b2bChannel.name} (${b2bChannel.id})`);
		console.log(`✅ Found default channel: ${defaultChannel.name} (${defaultChannel.id})`);

		// Get products from b2b channel
		console.log("\n🔍 Getting products from b2b channel...");
		const products = await getProductsFromChannel(b2bChannel.slug);
		console.log(`✅ Found ${products.length} products in b2b channel`);

		if (products.length === 0) {
			console.log("ℹ️  No products found in b2b channel");
			return;
		}

		// Move each product to default channel
		console.log("\n🔄 Moving products to default channel...");
		const results = [];

		for (const product of products) {
			try {
				console.log(`🔄 Moving: ${product.name}`);
				const result = await moveProductToChannel(product.id, defaultChannel.id);

				if (result.errors.length > 0) {
					console.error(`❌ Failed to move ${product.name}:`, result.errors);
					results.push({ product: product.name, success: false, errors: result.errors });
				} else {
					console.log(`✅ Successfully moved: ${product.name}`);
					results.push({ product: product.name, success: true });
				}
			} catch (error) {
				console.error(`❌ Error moving ${product.name}:`, error.message);
				results.push({ product: product.name, success: false, error: error.message });
			}
		}

		// Summary
		console.log("\n📊 Summary:");
		const successful = results.filter((r) => r.success).length;
		const failed = results.filter((r) => !r.success).length;
		console.log(`✅ Successfully moved: ${successful} products`);
		console.log(`❌ Failed: ${failed} products`);

		if (successful > 0) {
			console.log("\n📋 Moved Products:");
			results
				.filter((r) => r.success)
				.forEach((result, index) => {
					console.log(`${index + 1}. ${result.product}`);
				});
		}

		if (failed > 0) {
			console.log("\n❌ Failed Products:");
			results
				.filter((r) => !r.success)
				.forEach((result, index) => {
					console.log(`${index + 1}. ${result.product} - ${result.error || JSON.stringify(result.errors)}`);
				});
		}

		console.log("\n🎉 Product migration completed!");
	} catch (error) {
		console.error("❌ Script failed:", error.message);
		process.exit(1);
	}
}

// Run the script
main().catch(console.error);
