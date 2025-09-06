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

async function checkProductPricing() {
	const query = `
    query GetProductsWithPricing($channelSlug: String!) {
      products(first: 20, channel: $channelSlug) {
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

	const response = await fetch(SALEOR_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${SALEOR_AUTH_TOKEN}`,
		},
		body: JSON.stringify({
			query,
			variables: { channelSlug: "b2b" },
		}),
	});

	const data = await response.json();
	const products = data.data.products.edges.map((edge) => edge.node);

	console.log(`Found ${products.length} products in b2b channel with pricing:`);
	products.forEach((product, index) => {
		console.log(`  ${index + 1}. ${product.name}`);
		console.log(`     - Category: ${product.category?.name || "No category"}`);
		console.log(`     - Pricing: ${JSON.stringify(product.pricing, null, 2)}`);
		console.log(`     - Thumbnail: ${product.thumbnail?.url ? "Yes" : "No"}`);
		console.log("");
	});
}

checkProductPricing().catch(console.error);
