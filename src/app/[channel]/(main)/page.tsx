import { Suspense } from "react";
import { HeroCarousel } from "@/ui/components/HeroCarousel";
import { CategoryCards } from "@/ui/components/CategoryCards";
import { EmailCapture } from "@/ui/components/EmailCapture";
import { FlashSale } from "@/ui/components/FlashSale";
import { ProductList } from "@/ui/components/ProductList";
import { PromotionalBanner } from "@/ui/components/PromotionalBanner";
import { executeGraphQL } from "@/lib/graphql";
import { ProductListDocument } from "@/gql/graphql";

export default async function HomePage({ params }: { params: Promise<{ channel: string }> }) {
	// Ensure params are properly awaited
	const resolvedParams = await params;
	const { channel } = resolvedParams;

	console.log("Channel:", channel);
	console.log("Channel type:", typeof channel);
	console.log("Channel value:", JSON.stringify(channel));

	// Ensure channel is a string and has a value
	if (!channel || typeof channel !== "string") {
		console.error("Invalid channel parameter:", channel);
		return (
			<div className="min-h-screen p-8">
				<div className="text-center">
					<h1 className="mb-4 text-2xl font-bold text-xy-error-600">Invalid Channel</h1>
					<p className="text-xy-neutral-600">
						Channel parameter is missing or invalid: {JSON.stringify(channel)}
					</p>
				</div>
			</div>
		);
	}

	try {
		console.log("Executing GraphQL with variables:", { channel, first: 20 });

		const products = await executeGraphQL(ProductListDocument, {
			variables: { channel: channel, first: 20 },
			revalidate: 60 * 60 * 24,
		});

		console.log("GraphQL Response:", JSON.stringify(products, null, 2));
		console.log("Products count:", products.products?.edges?.length || 0);

		return (
			<div className="min-h-screen">
				{/* Promotional Banner */}
				<PromotionalBanner />

				{/* Hero Carousel */}
				<HeroCarousel />

				{/* Featured Products */}
				<section className="xy-section bg-white">
					<div className="xy-container">
						<div className="mb-12 text-center">
							<h2 className="mb-4 text-3xl font-bold text-xy-neutral-900 md:text-4xl">Featured Products</h2>
							<p className="mx-auto max-w-2xl text-lg text-xy-neutral-600">
								Discover our most popular and trending beauty products, carefully curated for you.
							</p>
						</div>

						{/* Debug Info */}
						<div className="mb-4 rounded-lg bg-xy-neutral-100 p-4">
							<p className="text-sm text-xy-neutral-600">Channel: {channel}</p>
							<p className="text-sm text-xy-neutral-600">
								Products found: {products.products?.edges?.length || 0}
							</p>
							{products.products?.edges?.length === 0 && (
								<p className="text-sm text-xy-error-600">
									No products found for this channel. Please check your Saleor backend.
								</p>
							)}
						</div>

						<Suspense fallback={<div>Loading products...</div>}>
							<ProductList products={products.products?.edges.map((edge) => edge.node) ?? []} />
						</Suspense>

						{/* View All Products Button */}
						<div className="mt-12 text-center">
							<a href={`/${channel}/products`} className="xy-button-secondary inline-flex items-center gap-2">
								View All Products
								<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</a>
						</div>
					</div>
				</section>

				{/* Category Cards */}
				<CategoryCards />

				{/* Flash Sale */}
				<FlashSale />

				{/* Email Capture */}
				<EmailCapture />

				{/* SEO Content */}
				<section className="xy-section bg-xy-neutral-50">
					<div className="xy-container">
						<div className="mx-auto max-w-4xl text-center">
							<h2 className="mb-6 text-2xl font-bold text-xy-neutral-900 md:text-3xl">
								XYHARMONEY - Harmony in Beauty
							</h2>
							<div className="prose prose-lg mx-auto text-xy-neutral-700">
								<p className="mb-4">
									Welcome to XYHARMONEY, your premier destination for inclusive beauty and wellness products.
									We believe that beauty knows no boundaries - it&apos;s for everyone, regardless of gender,
									age, or background.
								</p>
								<p className="mb-4">
									Our carefully curated collection features premium skincare, makeup, haircare, and fragrance
									products from the world&apos;s most trusted brands. From Korean beauty innovations to
									classic European formulations, we bring you the best of global beauty traditions.
								</p>
								<p className="mb-4">
									Whether you&apos;re looking for gentle skincare for sensitive skin, vibrant makeup for
									self-expression, or professional tools for perfect application, XYHARMONEY has everything
									you need to feel confident and beautiful in your own skin.
								</p>
								<p>
									Join our community of beauty enthusiasts and discover products that celebrate diversity,
									promote self-care, and enhance your natural beauty. At XYHARMONEY, we&apos;re committed to
									providing high-quality, inclusive beauty solutions that empower everyone to embrace their
									unique style.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	} catch (error) {
		console.error("GraphQL Error:", error);
		return (
			<div className="min-h-screen p-8">
				<div className="text-center">
					<h1 className="mb-4 text-2xl font-bold text-xy-error-600">Error Loading Products</h1>
					<p className="text-xy-neutral-600">
						There was an error loading the products. Please check your Saleor backend connection.
					</p>
					<pre className="mt-4 overflow-auto rounded bg-xy-neutral-100 p-4 text-sm">
						{JSON.stringify(error, null, 2)}
					</pre>
				</div>
			</div>
		);
	}
}
