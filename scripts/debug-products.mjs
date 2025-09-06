#!/usr/bin/env node

/**
 * Debug Products Script
 *
 * This script helps debug product visibility and category assignments
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

// Debug functions
async function debugChannels() {
	console.log("🔍 Debugging Channels...");
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
	console.log("📊 Available Channels:");
	data.channels.forEach((channel) => {
		console.log(`  - ${channel.name} (${channel.slug}) - Active: ${channel.isActive}`);
	});
	return data.channels;
}

async function debugProductsInChannel(channelSlug) {
	console.log(`\n🔍 Debugging Products in Channel: ${channelSlug}`);
	const query = `
		query GetProducts($channelSlug: String!) {
			products(first: 20, channel: $channelSlug) {
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
							isPublished
							visibleInListings
						}
						category {
							id
							name
							slug
						}
					}
				}
			}
		}
	`;

	const data = await makeGraphQLRequest(query, { channelSlug });
	const products = data.products.edges.map((edge) => edge.node);

	console.log(`📊 Found ${products.length} products in ${channelSlug}:`);
	products.forEach((product, index) => {
		console.log(`  ${index + 1}. ${product.name}`);
		console.log(
			`     - Category: ${product.category?.name || "No category"} (${product.category?.slug || "N/A"})`,
		);
		console.log(`     - Channel Listings: ${product.channelListings.length}`);
		product.channelListings.forEach((listing) => {
			console.log(
				`       * ${listing.channel.name}: Published=${listing.isPublished}, Visible=${listing.visibleInListings}`,
			);
		});
		console.log("");
	});

	return products;
}

async function debugCategories() {
	console.log("\n🔍 Debugging Categories...");
	const query = `
		query {
			categories(first: 20) {
				edges {
					node {
						id
						name
						slug
						products(first: 5) {
							edges {
								node {
									id
									name
									slug
								}
							}
						}
					}
				}
			}
		}
	`;

	const data = await makeGraphQLRequest(query);
	const categories = data.categories.edges.map((edge) => edge.node);

	console.log("📊 Available Categories:");
	categories.forEach((category) => {
		const productCount = category.products.edges.length;
		console.log(`  - ${category.name} (${category.slug}) - ${productCount} products`);
		if (productCount > 0) {
			category.products.edges.forEach((edge) => {
				console.log(`    * ${edge.node.name}`);
			});
		}
	});

	return categories;
}

async function debugSkincareCategory() {
	console.log("\n🔍 Debugging Skincare Category Specifically...");
	const query = `
		query GetCategory($slug: String!) {
			category(slug: $slug) {
				id
				name
				slug
				products(first: 10) {
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
								isPublished
								visibleInListings
							}
						}
					}
				}
			}
		}
	`;

	try {
		const data = await makeGraphQLRequest(query, { slug: "skincare" });
		if (data.category) {
			console.log(`📊 Skincare Category: ${data.category.name}`);
			console.log(`   - ID: ${data.category.id}`);
			console.log(`   - Slug: ${data.category.slug}`);
			console.log(`   - Products: ${data.category.products.edges.length}`);

			data.category.products.edges.forEach((edge, index) => {
				const product = edge.node;
				console.log(`     ${index + 1}. ${product.name}`);
				console.log(`        - Channel Listings: ${product.channelListings.length}`);
				product.channelListings.forEach((listing) => {
					console.log(
						`          * ${listing.channel.name}: Published=${listing.isPublished}, Visible=${listing.visibleInListings}`,
					);
				});
			});
		} else {
			console.log("❌ Skincare category not found");
		}
	} catch (error) {
		console.error("❌ Error fetching skincare category:", error.message);
	}
}

// Main execution function
async function main() {
	console.log("🚀 Starting product debugging...\n");

	try {
		// Debug channels
		const channels = await debugChannels();

		// Debug products in default channel
		await debugProductsInChannel("default-channel");

		// Debug all categories
		await debugCategories();

		// Debug skincare category specifically
		await debugSkincareCategory();

		console.log("\n🎉 Debugging completed!");
	} catch (error) {
		console.error("❌ Debug script failed:", error.message);
		process.exit(1);
	}
}

// Run the script
main().catch(console.error);
