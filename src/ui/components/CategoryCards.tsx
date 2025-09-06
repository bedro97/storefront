import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

interface Category {
	id: string;
	name: string;
	slug: string;
	image: string;
	tagline: string;
	productCount: number;
}

const categories: Category[] = [
	{
		id: "1",
		name: "Skin Care",
		slug: "skincare",
		image: "/categories/skincare.svg",
		tagline: "Hydrate your skin with premium products",
		productCount: 150,
	},
	{
		id: "2",
		name: "Makeup",
		slug: "makeup",
		image: "/categories/makeup.svg",
		tagline: "Express yourself with vibrant colors",
		productCount: 200,
	},
	{
		id: "3",
		name: "Hair Care",
		slug: "haircare",
		image: "/categories/skincare.svg",
		tagline: "Nourish and style your hair",
		productCount: 120,
	},
	{
		id: "4",
		name: "Body Care",
		slug: "bodycare",
		image: "/categories/skincare.svg",
		tagline: "Pamper your body from head to toe",
		productCount: 80,
	},
	{
		id: "5",
		name: "Fragrance",
		slug: "fragrance",
		image: "/categories/skincare.svg",
		tagline: "Discover your signature scent",
		productCount: 90,
	},
	{
		id: "6",
		name: "Tools & Brushes",
		slug: "tools",
		image: "/categories/skincare.svg",
		tagline: "Professional tools for perfect application",
		productCount: 60,
	},
	{
		id: "7",
		name: "Men's Collection",
		slug: "men",
		image: "/categories/skincare.svg",
		tagline: "Grooming essentials for modern men",
		productCount: 75,
	},
	{
		id: "8",
		name: "Women's Collection",
		slug: "women",
		image: "/categories/skincare.svg",
		tagline: "Beauty products designed for women",
		productCount: 180,
	},
];

export function CategoryCards() {
	return (
		<section className="xy-section bg-gradient-to-br from-xy-neutral-50 to-xy-neutral-100">
			<div className="xy-container">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-xy-neutral-900 md:text-4xl">Shop by Category</h2>
					<p className="mx-auto max-w-2xl text-lg text-xy-neutral-600">
						Discover our curated collection of beauty and wellness products, organized to help you find
						exactly what you need.
					</p>
				</div>

				<div className="xy-grid-responsive">
					{categories.map((category) => (
						<LinkWithChannel key={category.id} href={`/categories/${category.slug}`} className="group block">
							<div className="xy-card-hover overflow-hidden rounded-xl border border-xy-neutral-200 bg-white shadow-lg transition-all duration-300 hover:border-xy-primary-200 hover:shadow-2xl">
								<div className="relative aspect-square overflow-hidden">
									<Image
										src={category.image}
										alt={category.name}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

									{/* Product Count Badge */}
									<div className="absolute right-3 top-3 rounded-full border border-xy-neutral-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-xy-neutral-800 shadow-md">
										{category.productCount}+ items
									</div>
								</div>

								<div className="bg-gradient-to-b from-white to-xy-neutral-50 p-6">
									<h3 className="mb-2 text-xl font-bold text-xy-neutral-900 transition-colors group-hover:text-xy-primary-600">
										{category.name}
									</h3>
									<p className="text-sm font-medium leading-relaxed text-xy-neutral-600">
										{category.tagline}
									</p>

									{/* Shop Now Arrow */}
									<div className="mt-4 flex items-center text-sm font-medium text-xy-primary-600 transition-colors group-hover:text-xy-secondary-600">
										Shop Now
										<svg
											className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</div>
							</div>
						</LinkWithChannel>
					))}
				</div>

				{/* View All Categories Button */}
				<div className="mt-12 text-center">
					<LinkWithChannel href="/categories" className="xy-button-secondary inline-flex items-center gap-2">
						View All Categories
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</LinkWithChannel>
				</div>
			</div>
		</section>
	);
}
