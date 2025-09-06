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

async function checkB2BProducts() {
	const query = `
    query GetProducts($channelSlug: String!) {
      products(first: 20, channel: $channelSlug) {
        edges {
          node {
            id
            name
            slug
            category {
              name
              slug
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

	console.log(`Found ${products.length} products in b2b channel:`);
	products.forEach((product, index) => {
		console.log(`  ${index + 1}. ${product.name} - ${product.category?.name || "No category"}`);
	});
}

checkB2BProducts().catch(console.error);
