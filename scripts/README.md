# Bulk Add Products Script

This script connects to the Saleor GraphQL API and bulk-adds 5 testing products to the products catalog.

## Prerequisites

1. **Node.js** (version 14 or higher)
2. **Access to Saleor API** with admin permissions
3. **Environment variables** configured

## Setup

### 1. Install Dependencies

The script requires `node-fetch` and `dotenv` packages. Install them:

```bash
npm install node-fetch dotenv
# or
pnpm add node-fetch dotenv
```

### 2. Environment Variables

Create a `.env` file in the project root or set the following environment variables:

```bash
# Required
SALEOR_API_URL=https://your-saleor-instance.com/graphql/
SALEOR_AUTH_TOKEN=your-auth-token-here

# Alternative (if using existing Next.js env)
NEXT_PUBLIC_SALEOR_API_URL=https://your-saleor-instance.com/graphql/
```

### 3. Get Authentication Token

1. Log into your Saleor dashboard
2. Go to **Configuration** → **API**
3. Create a new token or use an existing one
4. Copy the token and set it as `SALEOR_AUTH_TOKEN`

## Usage

### Option 1: Using npm/pnpm script

```bash
pnpm run bulk-add-products
# or
npm run bulk-add-products
```

### Option 2: Direct execution

```bash
node scripts/bulk-add-products.js
```

## What the Script Does

The script will create 5 test products:

1. **Premium Hydrating Serum** - $29.99 (Skincare)
2. **Matte Liquid Lipstick - Ruby Red** - $18.50 (Makeup)
3. **Nourishing Hair Mask** - $24.99 (Hair Care)
4. **Gentle Body Wash - Lavender** - $15.75 (Body Care)
5. **Eau de Parfum - Midnight Bloom** - $45.00 (Fragrance)

### Features

- ✅ **Automatic Category Creation**: Creates categories if they don't exist
- ✅ **Product Variants**: Creates product variants with SKUs
- ✅ **Pricing**: Sets prices for the default channel
- ✅ **Error Handling**: Comprehensive error handling and reporting
- ✅ **Progress Tracking**: Shows real-time progress during execution
- ✅ **Summary Report**: Displays final results and statistics

## Output Example

```
🚀 Starting bulk product creation...
📡 API URL: https://your-saleor-instance.com/graphql/
🔍 Getting default channel...
✅ Using channel: Default Channel (default-channel)
🔄 Creating product: Premium Hydrating Serum
📁 Using category: Skincare (skincare)
✅ Product created: Premium Hydrating Serum (ID: 12345)
✅ Product variant created: PHS-001 (ID: 67890)
✅ Price set: $29.99 for variant PHS-001
✅ Successfully created: Premium Hydrating Serum
---
...

📊 Summary:
✅ Successfully created: 5 products
❌ Failed: 0 products

📋 Created Products:
1. Premium Hydrating Serum - $29.99 (SKU: PHS-001)
2. Matte Liquid Lipstick - Ruby Red - $18.50 (SKU: MLR-002)
3. Nourishing Hair Mask - $24.99 (SKU: NHM-003)
4. Gentle Body Wash - Lavender - $15.75 (SKU: GBW-004)
5. Eau de Parfum - Midnight Bloom - $45.00 (SKU: EDP-005)

🎉 Bulk product creation completed!
```

## Troubleshooting

### Common Issues

1. **Authentication Error**

   ```
   ❌ Error: SALEOR_AUTH_TOKEN environment variable is required
   ```

   **Solution**: Set the `SALEOR_AUTH_TOKEN` environment variable with a valid token.

2. **API URL Error**

   ```
   ❌ Error: SALEOR_API_URL environment variable is required
   ```

   **Solution**: Set the `SALEOR_API_URL` environment variable with your Saleor GraphQL endpoint.

3. **GraphQL Errors**

   ```
   ❌ GraphQL errors: [{"message": "Insufficient permissions"}]
   ```

   **Solution**: Ensure your token has admin permissions or the necessary product creation permissions.

4. **Channel Not Found**
   ```
   ❌ No active channel found
   ```
   **Solution**: Ensure your Saleor instance has at least one active channel.

### Debug Mode

To see more detailed error information, you can modify the script to log the full error responses:

```javascript
// Add this after line 45 in the script
console.log("Full error response:", JSON.stringify(data.errors, null, 2));
```

## Customization

### Adding More Products

Edit the `testProducts` array in the script to add more products:

```javascript
const testProducts = [
	// ... existing products
	{
		name: "Your New Product",
		description: "Product description here",
		category: "your-category",
		price: 25.99,
		sku: "YNP-006",
	},
];
```

### Modifying Product Data

You can customize:

- Product names and descriptions
- Categories (will be created automatically if they don't exist)
- Prices
- SKUs
- Product attributes (by modifying the `attributes` array in the mutations)

## Security Notes

- Never commit your `.env` file with real tokens
- Use environment-specific tokens for different environments
- Consider using read-only tokens for testing if you don't need to create products

## Support

If you encounter issues:

1. Check the Saleor documentation for GraphQL API details
2. Verify your API endpoint and token permissions
3. Check the Saleor logs for any server-side errors
4. Ensure your Saleor instance is running and accessible
