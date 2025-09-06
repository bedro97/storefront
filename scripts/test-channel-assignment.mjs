#!/usr/bin/env node

/**
 * Test Channel Assignment Script for Saleor
 *
 * This script tests different ways to assign products to channels
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

// Test different channel assignment approaches
const testMutations = [
	{
		name: "Test with channels field",
		query: `
			mutation ProductChannelListingUpdate($id: ID!, $input: ProductChannelListingUpdateInput!) {
				productChannelListingUpdate(id: $id, input: $input) {
					errors {
						field
						message
						code
					}
				}
			}
		`,
		variables: {
			id: "UHJvZHVjdDoxOTk=", // Use a real product ID from our previous attempts
			input: {
				channels: ["Q2hhbm5lbDoz"], // b2b channel ID
			},
		},
	},
	{
		name: "Test with addChannels field",
		query: `
			mutation ProductChannelListingUpdate($id: ID!, $input: ProductChannelListingUpdateInput!) {
				productChannelListingUpdate(id: $id, input: $input) {
					errors {
						field
						message
						code
					}
				}
			}
		`,
		variables: {
			id: "UHJvZHVjdDoxOTk=",
			input: {
				addChannels: ["Q2hhbm5lbDoz"],
			},
		},
	},
	{
		name: "Test with updateChannels field",
		query: `
			mutation ProductChannelListingUpdate($id: ID!, $input: ProductChannelListingUpdateInput!) {
				productChannelListingUpdate(id: $id, input: $input) {
					errors {
						field
						message
						code
					}
				}
			}
		`,
		variables: {
			id: "UHJvZHVjdDoxOTk=",
			input: {
				updateChannels: ["Q2hhbm5lbDoz"],
			},
		},
	},
];

// Main execution function
async function main() {
	console.log("🚀 Testing channel assignment mutations...\n");

	for (const test of testMutations) {
		try {
			console.log(`🔍 Testing: ${test.name}`);
			const data = await makeGraphQLRequest(test.query, test.variables);
			console.log(`✅ ${test.name}: Success`);
			console.log(`📊 Data:`, JSON.stringify(data, null, 2));
			console.log("---\n");
		} catch (error) {
			console.error(`❌ ${test.name}: Failed - ${error.message}`);
			console.log("---\n");
		}
	}

	console.log("🎉 Channel assignment tests completed!");
}

// Run the script
main().catch(console.error);
