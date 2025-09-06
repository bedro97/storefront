import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	// Generate different offer types based on product name for variety
	const getOfferTag = (productName: string) => {
		const offers = [
			{ text: "20% OFF", type: "discount", color: "bg-red-500" },
			{ text: "NEW", type: "new", color: "bg-green-500" },
			{ text: "SALE", type: "sale", color: "bg-orange-500" },
			{ text: "BESTSELLER", type: "bestseller", color: "bg-purple-500" },
			{ text: "LIMITED", type: "limited", color: "bg-pink-500" },
		];

		// Use product name hash to consistently assign offers
		const hash = productName.split("").reduce((a, b) => {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0);

		return offers[Math.abs(hash) % offers.length];
	};

	const offer = getOfferTag(product.name);
	return (
		<li data-testid="ProductElement">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
					{product?.thumbnail?.url && (
						<ProductImageWrapper
							loading={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ""}
							width={512}
							height={512}
							sizes={"512px"}
							priority={priority}
						/>
					)}

					{/* Offer Tag */}
					<div
						className={`absolute left-2 top-2 ${offer.color} transform rounded-md px-2 py-1 text-xs font-bold text-white shadow-lg transition-all duration-300 group-hover:scale-105`}
					>
						{offer.text}
					</div>
					<div className="p-4">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<h3 className="line-clamp-2 text-sm font-semibold text-neutral-900 transition-colors group-hover:text-xy-primary-600">
									{product.name}
								</h3>
								<p className="mt-1 text-xs text-neutral-500" data-testid="ProductElement_Category">
									{product.category?.name}
								</p>
							</div>
						</div>
						<div className="mt-3 flex items-center justify-between">
							<p className="text-sm font-bold text-neutral-900" data-testid="ProductElement_PriceRange">
								{formatMoneyRange({
									start: product?.pricing?.priceRange?.start?.gross,
									stop: product?.pricing?.priceRange?.stop?.gross,
								})}
							</p>
							{/* Add to Cart Button */}
							<button className="translate-y-2 transform rounded-md bg-xy-primary-600 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-all duration-300 hover:bg-xy-primary-700 group-hover:translate-y-0 group-hover:opacity-100">
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
