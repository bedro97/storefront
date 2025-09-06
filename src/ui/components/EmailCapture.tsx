"use client";

import { useState } from "react";
import { Mail, Gift, Truck, Shield } from "lucide-react";

export function EmailCapture() {
	const [email, setEmail] = useState("");
	const [consent, setConsent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !consent) return;

		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsSubmitting(false);
		setIsSubmitted(true);

		// Reset form after 3 seconds
		setTimeout(() => {
			setIsSubmitted(false);
			setEmail("");
			setConsent(false);
		}, 3000);
	};

	if (isSubmitted) {
		return (
			<section className="xy-section bg-gradient-to-r from-xy-primary-600 to-xy-secondary-600">
				<div className="xy-container">
					<div className="text-center text-white">
						<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
							<Mail className="h-8 w-8 text-white" />
						</div>
						<h2 className="mb-4 text-3xl font-bold md:text-4xl">Welcome to XYHARMONEY!</h2>
						<p className="mb-6 text-xl opacity-90">
							Check your email for your exclusive 15% discount code and free shipping offer.
						</p>
						<div className="inline-block rounded-lg bg-white/10 p-4">
							<p className="text-lg font-semibold">Code: WELCOME15</p>
							<p className="text-sm opacity-80">Valid for 30 days</p>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="xy-section bg-gradient-to-r from-xy-primary-600 to-xy-secondary-600">
			<div className="xy-container">
				<div className="mx-auto max-w-4xl">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						{/* Left Side - Content */}
						<div className="text-white">
							<h2 className="mb-6 text-3xl font-bold md:text-4xl">Join the XYHARMONEY Family</h2>
							<p className="mb-8 text-lg leading-relaxed opacity-90">
								Subscribe to our newsletter and be the first to know about new products, exclusive offers, and
								beauty tips. Plus, get instant access to special discounts and free shipping on your first
								order.
							</p>

							{/* Benefits */}
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
										<Gift className="h-4 w-4 text-white" />
									</div>
									<span className="font-medium text-white">15% off your first order</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
										<Truck className="h-4 w-4 text-white" />
									</div>
									<span className="font-medium text-white">Free shipping on orders over $50</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
										<Shield className="h-4 w-4 text-white" />
									</div>
									<span className="font-medium text-white">Exclusive member-only sales</span>
								</div>
							</div>
						</div>

						{/* Right Side - Form */}
						<div className="rounded-2xl bg-white p-8 shadow-xl">
							<div className="mb-6 text-center">
								<h3 className="mb-2 text-2xl font-bold text-xy-neutral-900">Get Your Welcome Gift</h3>
								<p className="text-xy-neutral-600">Enter your email below to receive your exclusive offer</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label htmlFor="email" className="mb-2 block text-sm font-medium text-xy-neutral-700">
										Email Address
									</label>
									<input
										id="email"
										type="email"
										value={email}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
										placeholder="Enter your email address"
										required
										className="w-full rounded-lg border border-xy-neutral-300 px-4 py-3 text-xy-neutral-900 placeholder-xy-neutral-500 focus:border-xy-primary-500 focus:outline-none focus:ring-2 focus:ring-xy-primary-200"
									/>
								</div>

								<div className="flex items-start gap-3">
									<input
										id="consent"
										type="checkbox"
										checked={consent}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked)}
										required
										className="mt-1 h-4 w-4 rounded border-xy-neutral-300 text-xy-primary-600 focus:ring-xy-primary-500"
									/>
									<label htmlFor="consent" className="text-sm leading-relaxed text-xy-neutral-600">
										I agree to receive marketing emails from XYHARMONEY about new products, exclusive offers,
										and beauty tips. I can unsubscribe at any time.
										<span className="text-xy-primary-600"> Privacy Policy</span>
									</label>
								</div>

								<button
									type="submit"
									disabled={!email || !consent || isSubmitting}
									className="xy-button-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
								>
									{isSubmitting ? (
										<div className="flex items-center gap-2">
											<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
											Subscribing...
										</div>
									) : (
										"Get My 15% Off + Free Shipping"
									)}
								</button>

								<p className="text-center text-xs text-xy-neutral-500">
									By subscribing, you agree to our Terms of Service and Privacy Policy. You can unsubscribe at
									any time.
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
