#!/usr/bin/env node

import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, "..", ".env");
config({ path: envPath });

const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL;
const SALEOR_AUTH_TOKEN = process.env.SALEOR_AUTH_TOKEN;

async function testFrontendQuery() {
	// This is the exact query the frontend uses
	const query = `
    query ProductList($first: Int = 9, $channel: String!) {
      products(first: $first, channel: $channel) {
        edges {
          node {
            id
            name
            slug
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                    currency
                  }
                }
                stop {
                  gross {
                    amount
                    currency
                  }
                }
              }
            }
            category {
              id
              name
            }
            thumbnail(size: 1024, format: WEBP) {
              url
              alt
            }
          }
        }
      }
    }
  `;

	console.log("Testing frontend query for b2b channel...");
	const response = await fetch(SALEOR_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${SALEOR_AUTH_TOKEN}`,
		},
		body: JSON.stringify({
			query,
			variables: { channel: "b2b", first: 20 },
		}),
	});

	const data = await response.json();
	console.log("Response:", JSON.stringify(data, null, 2));

	if (data.data && data.data.products) {
		console.log(`Found ${data.data.products.edges.length} products`);
	}
}

testFrontendQuery().catch(console.error);
