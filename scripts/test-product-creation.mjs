#!/usr/bin/env node

/**
 * Test Product Creation Script for Saleor
 *
 * This script tests if we can create a simple product
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
		console.log("📤 Sending request:", JSON.stringify({ query, variables }, null, 2));

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

		console.log("📊 Response Status:", response.status);
		console.log("📊 Response Headers:", Object.fromEntries(response.headers.entries()));

		const responseText = await response.text();
		console.log("📊 Raw Response:", responseText);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = JSON.parse(responseText);

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

// Test queries
const testQueries = [
	{
		name: "Check Product Creation Permissions",
		query: `
			query {
				__schema {
					mutationType {
						fields {
							name
							description
						}
					}
				}
			}
		`,
	},
	{
		name: "Try Simple Product Creation",
		query: `
			mutation {
				productCreate(input: {
					name: "Test Product"
					description: "A test product"
					productType: "UHJvZHVjdFR5cGU6MQ=="
					category: "Q2F0ZWdvcnk6MQ=="
					isPublished: true
					visibleInListing: true
				}) {
					product {
						id
						name
					}
					errors {
						field
						message
						code
					}
				}
			}
		`,
	},
];

// Main execution function
async function main() {
	console.log("🚀 Testing product creation capabilities...\n");

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

	console.log("🎉 Product creation tests completed!");
}

// Run the script
main().catch(console.error);
