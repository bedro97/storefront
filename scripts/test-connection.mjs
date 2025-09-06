#!/usr/bin/env node

/**
 * Test Connection Script for Saleor
 *
 * This script tests the connection to the Saleor GraphQL API
 * and checks what permissions we have.
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

console.log("🔍 Testing Saleor API connection...");
console.log(`📡 API URL: ${SALEOR_API_URL}`);
console.log(`🔑 Token: ${SALEOR_AUTH_TOKEN.substring(0, 20)}...`);

// Test queries
const testQueries = [
	{
		name: "Channels",
		query: `
			query {
				channels {
					id
					name
					slug
					isActive
				}
			}
		`,
	},
	{
		name: "Current User",
		query: `
			query {
				me {
					id
					email
					firstName
					lastName
				}
			}
		`,
	},
	{
		name: "Product Types",
		query: `
			query {
				productTypes(first: 5) {
					edges {
						node {
							id
							name
							slug
						}
					}
				}
			}
		`,
	},
	{
		name: "Categories",
		query: `
			query {
				categories(first: 5) {
					edges {
						node {
							id
							name
							slug
						}
					}
				}
			}
		`,
	},
];

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

		const responseText = await response.text();
		console.log(`📊 Response Status: ${response.status}`);
		console.log(`📊 Response Headers:`, Object.fromEntries(response.headers.entries()));

		if (!response.ok) {
			console.log(`📊 Response Body:`, responseText);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = JSON.parse(responseText);

		if (data.errors) {
			console.log(`📊 GraphQL Errors:`, JSON.stringify(data.errors, null, 2));
			throw new Error(`GraphQL errors: ${JSON.stringify(data.errors, null, 2)}`);
		}

		return data.data;
	} catch (error) {
		console.error("❌ GraphQL request failed:", error.message);
		throw error;
	}
}

// Main execution function
async function main() {
	console.log("\n🚀 Starting API connection tests...\n");

	for (const test of testQueries) {
		try {
			console.log(`🔍 Testing: ${test.name}`);
			const data = await makeGraphQLRequest(test.query);
			console.log(`✅ ${test.name}: Success`);
			console.log(`📊 Data:`, JSON.stringify(data, null, 2));
			console.log("---\n");
		} catch (error) {
			console.error(`❌ ${test.name}: Failed - ${error.message}`);
			console.log("---\n");
		}
	}

	console.log("🎉 API connection tests completed!");
}

// Run the script
main().catch(console.error);
