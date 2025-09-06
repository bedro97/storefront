"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import Link from "next/link";
import { Button } from "@/checkout/components/Button";

interface FlashSaleProduct {
	id: string;
	name: string;
	image: string;
	originalPrice: number;
	salePrice: number;
	discount: number;
	stockAvailable: number;
	stockTotal: number;
	endTime: string;
}

const flashSaleProducts: FlashSaleProduct[] = [
	{
		id: "1",
		name: "Korean Hyaluronic Acid Serum",
		image: "/products/serum-1.jpg",
		originalPrice: 45.0,
		salePrice: 22.5,
		discount: 50,
		stockAvailable: 23,
		stockTotal: 100,
		endTime: "2024-12-31T23:59:59",
	},
	{
		id: "2",
		name: "Premium Makeup Brush Set",
		image: "/products/brushes-1.jpg",
		originalPrice: 89.0,
		salePrice: 44.5,
		discount: 50,
		stockAvailable: 15,
		stockTotal: 50,
		endTime: "2024-12-31T23:59:59",
	},
	{
		id: "3",
		name: "Organic Face Mask Pack",
		image: "/products/masks-1.jpg",
		originalPrice: 35.0,
		salePrice: 17.5,
		discount: 50,
		stockAvailable: 67,
		stockTotal: 150,
		endTime: "2024-12-31T23:59:59",
	},
	{
		id: "4",
		name: "Luxury Fragrance Set",
		image: "/products/fragrance-1.jpg",
		originalPrice: 120.0,
		salePrice: 60.0,
		discount: 50,
		stockAvailable: 8,
		stockTotal: 25,
		endTime: "2024-12-31T23:59:59",
	},
];

export function FlashSale() {
	const [timeLeft, setTimeLeft] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime();
			const endTime = new Date(flashSaleProducts[0].endTime).getTime();
			const difference = endTime - now;

			if (difference > 0) {
				const hours = Math.floor(difference / (1000 * 60 * 60));
				const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((difference % (1000 * 60)) / 1000);

				setTimeLeft({ hours, minutes, seconds });
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<section className="xy-section bg-gradient-to-r from-xy-warning-50 to-xy-error-50">
			<div className="xy-container">
				{/* Header */}
				<div className="mb-12 text-center">
					<div className="mb-4 flex items-center justify-center gap-2">
						<Flame className="h-8 w-8 text-xy-error-600" />
						<h2 className="text-3xl font-bold text-xy-neutral-900 md:text-4xl">
							Flash Sales - Up to 50% Off
						</h2>
						<Flame className="h-8 w-8 text-xy-error-600" />
					</div>
					<p className="mx-auto max-w-2xl text-lg text-xy-neutral-600">
						Limited time offers! These deals won&apos;t last long - grab them while you can.
					</p>
				</div>

				{/* Countdown Timer */}
				<div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
					<div className="text-center">
						<h3 className="mb-4 text-lg font-semibold text-xy-neutral-900">Sale Ends In:</h3>
						<div className="flex justify-center gap-4">
							<div className="text-center">
								<div className="rounded-lg bg-xy-error-600 px-4 py-2 text-2xl font-bold text-white">
									{timeLeft.hours.toString().padStart(2, "0")}
								</div>
								<span className="text-sm text-xy-neutral-600">Hours</span>
							</div>
							<div className="text-center">
								<div className="rounded-lg bg-xy-error-600 px-4 py-2 text-2xl font-bold text-white">
									{timeLeft.minutes.toString().padStart(2, "0")}
								</div>
								<span className="text-sm text-xy-neutral-600">Minutes</span>
							</div>
							<div className="text-center">
								<div className="rounded-lg bg-xy-error-600 px-4 py-2 text-2xl font-bold text-white">
									{timeLeft.seconds.toString().padStart(2, "0")}
								</div>
								<span className="text-sm text-xy-neutral-600">Seconds</span>
							</div>
						</div>
					</div>
				</div>

				{/* Flash Sale Products */}
				<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{flashSaleProducts.map((product) => {
						const stockPercentage = (product.stockAvailable / product.stockTotal) * 100;

						return (
							<div
								key={product.id}
								className="xy-card-hover overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
							>
								{/* Product Image */}
								<div className="relative aspect-square overflow-hidden">
									<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-xy-neutral-200 to-xy-neutral-300">
										<span className="text-sm text-xy-neutral-500">Product Image</span>
									</div>

									{/* Discount Badge */}
									<div className="absolute left-3 top-3 rounded-full bg-xy-error-600 px-2 py-1 text-sm font-bold text-white">
										{product.discount}% OFF
									</div>

									{/* Stock Status */}
									<div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-xy-neutral-800">
										{product.stockAvailable} left
									</div>
								</div>

								{/* Product Info */}
								<div className="p-4">
									<h3 className="mb-2 line-clamp-2 font-semibold text-xy-neutral-900">{product.name}</h3>

									{/* Pricing */}
									<div className="mb-3 flex items-center gap-2">
										<span className="text-lg font-bold text-xy-error-600">
											${product.salePrice.toFixed(2)}
										</span>
										<span className="text-sm text-xy-neutral-500 line-through">
											${product.originalPrice.toFixed(2)}
										</span>
									</div>

									{/* Stock Progress */}
									<div className="mb-3">
										<div className="mb-1 flex justify-between text-xs text-xy-neutral-600">
											<span>Stock</span>
											<span>
												{product.stockAvailable}/{product.stockTotal}
											</span>
										</div>
										<div className="h-2 w-full rounded-full bg-xy-neutral-200">
											<div
												className="h-2 rounded-full bg-xy-primary-600 transition-all duration-300"
												style={{ width: `${stockPercentage}%` }}
											></div>
										</div>
									</div>

									{/* Add to Cart Button */}
									<Button className="xy-button-primary w-full py-2 text-sm" label="Add to Cart" />
								</div>
							</div>
						);
					})}
				</div>

				{/* View More Button */}
				<div className="text-center">
					<Link href="/flash-sales">
						<Button
							className="xy-button-secondary inline-flex items-center gap-2"
							label="View More Flash Sales"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
}
