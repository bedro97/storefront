"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import Link from "next/link";

export function PromotionalBanner() {
	const [timeLeft, setTimeLeft] = useState({
		hours: 33,
		minutes: 25,
		seconds: 54,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) {
					return { ...prev, seconds: prev.seconds - 1 };
				} else if (prev.minutes > 0) {
					return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
				} else if (prev.hours > 0) {
					return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
				}
				return prev;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="bg-xy-neutral-900 py-4 text-white">
			<div className="xy-container">
				<div className="flex flex-col items-center gap-6">
					{/* Top row - Promotional offers */}
					<div className="flex flex-col items-center gap-4 text-center">
						{/* <div className="flex items-center gap-2">
							<Info className="text-xy-primary-400 h-5 w-5" />
							<span className="text-sm font-medium">Enter Code</span>
						</div> */}

						{/* Discount tiers */}
						<div className="flex flex-wrap items-center justify-center gap-4 text-sm">
							<span className="font-semibold text-xy-primary-400">8% OFF SAR 79 order</span>
							<span className="text-xy-neutral-400">|</span>
							<span className="font-semibold text-xy-primary-400">10% OFF SAR 149 order</span>
							<span className="text-xy-neutral-400">|</span>
							<span className="font-semibold text-xy-primary-400">15% OFF SAR 199 order</span>
						</div>
					</div>

					{/* Bottom row - Code, countdown, and details */}
					<div className="flex flex-col items-center gap-4 sm:flex-row">
						{/* Promo code */}
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">Enter Code</span>
							<div className="rounded border-2 border-xy-error-500 bg-xy-error-500/10 px-3 py-1">
								<span className="text-xy-error-400 text-lg font-bold">BTS2025</span>
							</div>
						</div>

						{/* Countdown timer */}
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-xy-primary-400" />
							<span className="text-sm font-medium">Ends in</span>
							<div className="flex items-center gap-1">
								<span className="rounded bg-xy-primary-600 px-2 py-1 text-sm font-bold text-white">
									{timeLeft.hours.toString().padStart(2, "0")}H
								</span>
								<span className="rounded bg-xy-primary-600 px-2 py-1 text-sm font-bold text-white">
									{timeLeft.minutes.toString().padStart(2, "0")}M
								</span>
								<span className="rounded bg-xy-primary-600 px-2 py-1 text-sm font-bold text-white">
									{timeLeft.seconds.toString().padStart(2, "0")}s
								</span>
							</div>
						</div>

						{/* See details link */}
						<Link
							href="/promotions/details"
							className="text-sm text-xy-primary-400 underline transition-colors hover:text-xy-primary-300"
						>
							See details
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
