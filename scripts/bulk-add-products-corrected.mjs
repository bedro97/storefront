#!/usr/bin/env node

/**
 * Bulk Add Products Script for Saleor (Corrected Version)
 *
 * This script connects to the Saleor GraphQL API and bulk-adds 5 testing products
 * to the products catalog of the testing environment.
 *
 * Usage:
 *   node scripts/bulk-add-products-corrected.mjs
 *
 * Environment Variables Required:
 *   - NEXT_PUBLIC_SALEOR_API_URL: The Saleor GraphQL API endpoint
 *   - SALEOR_AUTH_TOKEN: Authentication token for the API
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
	console.error('   You can get this from your Saleor dashboard under "API" section');
	process.exit(1);
}

// Test products data
const testProducts = [
	{
		name: "Premium Hydrating Serum",
		description: JSON.stringify({
			blocks: [
				{
					type: "paragraph",
					data: {
						text: "A lightweight, fast-absorbing serum that delivers intense hydration to your skin. Perfect for all skin types, this serum contains hyaluronic acid and vitamin C for a radiant, healthy glow.",
					},
				},
			],
		}),
		category: "skincare",
		price: 29.99,
		sku: "PHS-001",
	},
	{
		name: "Matte Liquid Lipstick - Ruby Red",
		description: JSON.stringify({
			blocks: [
				{
					type: "paragraph",
					data: {
						text: "Long-lasting matte liquid lipstick in a stunning ruby red shade. This highly pigmented formula provides full coverage with a comfortable, non-drying finish that lasts up to 12 hours.",
					},
				},
			],
		}),
		category: "makeup",
		price: 18.5,
		sku: "MLR-002",
	},
	{
		name: "Nourishing Hair Mask",
		description: JSON.stringify({
			blocks: [
				{
					type: "paragraph",
					data: {
						text: "Deep conditioning hair mask enriched with argan oil and keratin. Restores moisture, reduces frizz, and leaves hair silky smooth. Suitable for all hair types, especially damaged and dry hair.",
					},
				},
			],
		}),
		category: "haircare",
		price: 24.99,
		sku: "NHM-003",
	},
	{
		name: "Gentle Body Wash - Lavender",
		description: JSON.stringify({
			blocks: [
				{
					type: "paragraph",
					data: {
						text: "Soothing body wash with natural lavender extract and gentle cleansing agents. Creates a rich, luxurious lather that cleanses without stripping your skin's natural moisture barrier.",
					},
				},
			],
		}),
		category: "bodycare",
		price: 15.75,
		sku: "GBW-004",
	},
	{
		name: "Eau de Parfum - Midnight Bloom",
		description: JSON.stringify({
			blocks: [
				{
					type: "paragraph",
					data: {
						text: "Elegant and sophisticated fragrance with notes of jasmine, vanilla, and sandalwood. A perfect evening scent that lasts all night. Presented in a beautiful glass bottle.",
					},
				},
			],
		}),
		category: "fragrance",
		price: 45.0,
		sku: "EDP-005",
	},
];

// GraphQL mutations
const CREATE_PRODUCT_MUTATION = `
	mutation ProductCreate($input: ProductCreateInput!) {
		productCreate(input: $input) {
			product {
				id
				name
				slug
				description
			}
			errors {
				field
				message
				code
			}
		}
	}
`;

const CREATE_PRODUCT_VARIANT_MUTATION = `
	mutation ProductVariantCreate($input: ProductVariantCreateInput!) {
		productVariantCreate(input: $input) {
			productVariant {
				id
				sku
			}
			errors {
				field
				message
				code
			}
		}
	}
`;

const ADD_PRODUCT_VARIANT_PRICE_MUTATION = `
	mutation ProductVariantChannelListingAdd($id: ID!, $input: [ProductVariantChannelListingAddInput!]!) {
		productVariantChannelListingAdd(id: $id, input: $input) {
			productVariant {
				id
				channelListings {
					channel {
						id
						name
					}
					price {
						gross {
							amount
							currency
						}
					}
				}
			}
			errors {
				field
				message
				code
			}
		}
	}
`;

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

// Helper function to get the default channel
async function getDefaultChannel() {
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
	const activeChannel = data.channels.find((channel) => channel.isActive);

	if (!activeChannel) {
		throw new Error("No active channel found");
	}

	return activeChannel;
}

// Helper function to get the default product type
async function getDefaultProductType() {
	const query = `
		query {
			productTypes(first: 10) {
				edges {
					node {
						id
						name
						slug
					}
				}
			}
		}
	`;

	const data = await makeGraphQLRequest(query);
	const defaultType = data.productTypes.edges.find((edge) => edge.node.slug === "default-type");

	if (!defaultType) {
		throw new Error("Default product type not found");
	}

	return defaultType.node;
}

// Helper function to get or create a category
async function getOrCreateCategory(categoryName) {
	const query = `
		query GetCategory($slug: String!) {
			category(slug: $slug) {
				id
				name
				slug
			}
		}
	`;

	try {
		const data = await makeGraphQLRequest(query, { slug: categoryName });
		if (data.category) {
			return data.category;
		}
	} catch (error) {
		// Category doesn't exist, we'll create it
	}

	// Create category
	const createCategoryMutation = `
		mutation CategoryCreate($input: CategoryInput!) {
			categoryCreate(input: $input) {
				category {
					id
					name
					slug
				}
				errors {
					field
					message
					code
				}
			}
		}
	`;

	const createData = await makeGraphQLRequest(createCategoryMutation, {
		input: {
			name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
			slug: categoryName,
			description: JSON.stringify({
				blocks: [
					{
						type: "paragraph",
						data: {
							text: `Products in the ${categoryName} category`,
						},
					},
				],
			}),
		},
	});

	if (createData.categoryCreate.errors.length > 0) {
		throw new Error(`Failed to create category: ${JSON.stringify(createData.categoryCreate.errors)}`);
	}

	return createData.categoryCreate.category;
}

// Main function to create a product
async function createProduct(productData, channelId, categoryId, productTypeId) {
	console.log(`🔄 Creating product: ${productData.name}`);

	// Create the product
	const productResult = await makeGraphQLRequest(CREATE_PRODUCT_MUTATION, {
		input: {
			name: productData.name,
			description: productData.description,
			category: categoryId,
			productType: productTypeId,
			attributes: [],
		},
	});

	if (productResult.productCreate.errors.length > 0) {
		throw new Error(`Failed to create product: ${JSON.stringify(productResult.productCreate.errors)}`);
	}

	const product = productResult.productCreate.product;
	console.log(`✅ Product created: ${product.name} (ID: ${product.id})`);

	// Create product variant
	const variantResult = await makeGraphQLRequest(CREATE_PRODUCT_VARIANT_MUTATION, {
		input: {
			product: product.id,
			sku: productData.sku,
			attributes: [],
			trackInventory: true,
		},
	});

	if (variantResult.productVariantCreate.errors.length > 0) {
		throw new Error(
			`Failed to create product variant: ${JSON.stringify(variantResult.productVariantCreate.errors)}`,
		);
	}

	const variant = variantResult.productVariantCreate.productVariant;
	console.log(`✅ Product variant created: ${variant.sku} (ID: ${variant.id})`);

	// Set the price for the variant
	const priceResult = await makeGraphQLRequest(ADD_PRODUCT_VARIANT_PRICE_MUTATION, {
		id: variant.id,
		input: [
			{
				channelId: channelId,
				price: productData.price,
				costPrice: productData.price * 0.6, // 40% margin
			},
		],
	});

	if (priceResult.productVariantChannelListingAdd.errors.length > 0) {
		throw new Error(
			`Failed to set product price: ${JSON.stringify(priceResult.productVariantChannelListingAdd.errors)}`,
		);
	}

	console.log(`✅ Price set: $${productData.price} for variant ${variant.sku}`);

	return {
		product,
		variant,
		price: productData.price,
	};
}

// Main execution function
async function main() {
	console.log("🚀 Starting bulk product creation...");
	console.log(`📡 API URL: ${SALEOR_API_URL}`);

	try {
		// Get default channel
		console.log("🔍 Getting default channel...");
		const channel = await getDefaultChannel();
		console.log(`✅ Using channel: ${channel.name} (${channel.slug})`);

		// Get default product type
		console.log("🔍 Getting default product type...");
		const productType = await getDefaultProductType();
		console.log(`✅ Using product type: ${productType.name} (${productType.slug})`);

		const results = [];

		// Process each product
		for (const productData of testProducts) {
			try {
				// Get or create category
				const category = await getOrCreateCategory(productData.category);
				console.log(`📁 Using category: ${category.name} (${category.slug})`);

				// Create the product
				const result = await createProduct(productData, channel.id, category.id, productType.id);
				results.push(result);

				console.log(`✅ Successfully created: ${productData.name}`);
				console.log("---");
			} catch (error) {
				console.error(`❌ Failed to create product "${productData.name}":`, error.message);
				console.log("---");
			}
		}

		// Summary
		console.log("\n📊 Summary:");
		console.log(`✅ Successfully created: ${results.length} products`);
		console.log(`❌ Failed: ${testProducts.length - results.length} products`);

		if (results.length > 0) {
			console.log("\n📋 Created Products:");
			results.forEach((result, index) => {
				console.log(`${index + 1}. ${result.product.name} - $${result.price} (SKU: ${result.variant.sku})`);
			});
		}

		console.log("\n🎉 Bulk product creation completed!");
	} catch (error) {
		console.error("❌ Script failed:", error.message);
		process.exit(1);
	}
}

// Run the script
main().catch(console.error);
