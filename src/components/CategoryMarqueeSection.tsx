"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CategoryMarqueeSection.module.css";

type ProofLogo = { src: string; alt: string };
type Category = {
	id: string;
	name: string;
	slug: string;
	backgroundImage?: {
		url: string;
		alt?: string | null;
	} | null;
};

type Props = {
	channel: string;
	categories: Category[];
	headline?: string;
	subhead?: string;
	bullets?: string[];
	primaryCta?: { label: string; href: string };
	secondaryCta?: { label: string; href: string };
	proofLogos?: ProofLogo[];
	testimonial?: { quote: string; author: string };
	riskReversal?: string; // e.g., "14-day money-back guarantee"
	urgencyNote?: string; // e.g., "Limited stock for launch month"
	marqueeSpeedSeconds?: number; // default 30
};

export function CategoryMarqueeSection({
	channel: _channel,
	categories,
	headline = "Get the results you want, faster.",
	subhead = "Premium picks, transparent pricing, delivered instantly.",
	bullets = [
		"High-value bundles that actually save money",
		"Clear delivery & region compatibility",
		"Instant codes with real support",
	],
	primaryCta = { label: "Shop Bestsellers", href: "/collection/bestsellers" },
	secondaryCta = { label: "Browse all categories", href: "/categories" },
	proofLogos = [],
	testimonial,
	riskReversal = "14-day money-back guarantee.",
	urgencyNote = "New drops weekly — popular items sell out fast.",
	marqueeSpeedSeconds = 30,
}: Props) {
	// Debug: Log categories to see what data we have
	console.log("Categories data:", categories);
	console.log("First category:", categories[0]);
	console.log(
		"Categories with images:",
		categories.filter((c) => c?.backgroundImage?.url),
	);

	// Split categories into two groups for dual marquees
	const midPoint = Math.ceil(categories.length / 2);
	const firstGroup = categories.slice(0, midPoint);
	const secondGroup = categories.slice(midPoint);

	// Create duplicates for smooth scrolling
	const dup1 = [...firstGroup, ...firstGroup, ...firstGroup];
	const dup2 = [...secondGroup, ...secondGroup, ...secondGroup];

	return (
		<section className="xy-container py-12 md:py-16" aria-label="Shop categories and featured benefits">
			<div className={styles.wrapper}>
				{/* LEFT: Hormozi content */}
				<div className="flex flex-col justify-center gap-5">
					<h1 className="text-4xl font-extrabold leading-tight text-xy-neutral-900 md:text-5xl">
						{headline}
					</h1>
					<p className="text-lg text-xy-neutral-600 md:text-xl">{subhead}</p>

					<ul className="mt-2 space-y-2">
						{bullets.map((b, i) => (
							<li key={i} className="flex items-start gap-2">
								<span className="mt-1 inline-block h-2 w-2 rounded-full bg-xy-primary-600" />
								<span className="text-xy-neutral-700">{b}</span>
							</li>
						))}
					</ul>

					<div className="mt-4 flex flex-wrap gap-3">
						<Link href={primaryCta.href} className="xy-button-primary rounded-xl px-5 py-3">
							{primaryCta.label}
						</Link>
						<Link href={secondaryCta.href} className="xy-button-secondary rounded-xl px-5 py-3">
							{secondaryCta.label}
						</Link>
					</div>

					{/* Social proof */}
					{(proofLogos.length > 0 || testimonial) && (
						<div className="mt-6 space-y-3">
							{proofLogos.length > 0 && (
								<div className="flex flex-wrap items-center gap-4 opacity-80">
									{proofLogos.map((l, i) => (
										<Image key={i} src={l.src} alt={l.alt} width={80} height={28} className="h-7 w-auto" />
									))}
								</div>
							)}
							{testimonial && (
								<blockquote className="text-sm italic text-xy-neutral-600">
									&ldquo;{testimonial.quote}&rdquo; —{" "}
									<span className="font-medium not-italic">{testimonial.author}</span>
								</blockquote>
							)}
						</div>
					)}

					{/* Risk reversal & urgency */}
					<div className="mt-4 text-sm text-xy-neutral-600">
						<span className="font-medium text-xy-primary-600">{riskReversal}</span>{" "}
						<span className="opacity-80">{urgencyNote}</span>
					</div>
				</div>

				{/* RIGHT: Dual Vertical marquees - Hidden on mobile */}
				<div className={styles.dualMarqueeContainer}>
					{/* First Marquee */}
					<div className={styles.marqueeShell} style={{ ["--speed" as any]: `${marqueeSpeedSeconds}s` }}>
						<div className={styles.track} role="list" aria-label="Browse categories - Group 1">
							{dup1.length === 0 && (
								<div className="px-3 py-2 text-sm text-xy-neutral-500 opacity-70">
									No categories available
								</div>
							)}
							{dup1.map((c, idx) => (
								<Link
									key={`marquee1-${c?.id}-${idx}`}
									href={`/categories/${c?.slug}`}
									className={styles.categoryCard}
									role="listitem"
								>
									<div className={styles.imageContainer}>
										{c?.backgroundImage?.url ? (
											<>
												{console.log(`Loading image for ${c.name}:`, c.backgroundImage.url)}
												<Image
													src={c.backgroundImage.url}
													alt={c.backgroundImage.alt || c.name}
													fill
													className={styles.categoryImage}
													onLoad={() => console.log(`Image loaded for ${c.name}`)}
													onError={(e) => console.error(`Image failed to load for ${c.name}:`, e)}
												/>
											</>
										) : (
											<div className={styles.placeholderImage}>
												<span className={styles.placeholderText}>{c?.name?.charAt(0) || "📦"}</span>
											</div>
										)}
									</div>
									<div className={styles.categoryInfo}>
										<span className={styles.categoryName}>{c?.name}</span>
									</div>
								</Link>
							))}
						</div>
					</div>

					{/* Second Marquee - Moving in opposite direction */}
					<div className={styles.marqueeShell} style={{ ["--speed" as any]: `${marqueeSpeedSeconds + 5}s` }}>
						<div className={styles.trackReverse} role="list" aria-label="Browse categories - Group 2">
							{dup2.length === 0 && (
								<div className="px-3 py-2 text-sm text-xy-neutral-500 opacity-70">
									No categories available
								</div>
							)}
							{dup2.map((c, idx) => (
								<Link
									key={`marquee2-${c?.id}-${idx}`}
									href={`/categories/${c?.slug}`}
									className={styles.categoryCard}
									role="listitem"
								>
									<div className={styles.imageContainer}>
										{c?.backgroundImage?.url ? (
											<>
												{console.log(`Loading image for ${c.name}:`, c.backgroundImage.url)}
												<Image
													src={c.backgroundImage.url}
													alt={c.backgroundImage.alt || c.name}
													fill
													className={styles.categoryImage}
													onLoad={() => console.log(`Image loaded for ${c.name}`)}
													onError={(e) => console.error(`Image failed to load for ${c.name}:`, e)}
												/>
											</>
										) : (
											<div className={styles.placeholderImage}>
												<span className={styles.placeholderText}>{c?.name?.charAt(0) || "📦"}</span>
											</div>
										)}
									</div>
									<div className={styles.categoryInfo}>
										<span className={styles.categoryName}>{c?.name}</span>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* Mobile: Simple category grid - Visible only on mobile */}
				<div className={styles.mobileCategoryGrid}>
					{categories.map((c, idx) => (
						<Link
							key={`mobile-${c?.id}-${idx}`}
							href={`/categories/${c?.slug}`}
							className={styles.mobileCategoryCard}
						>
							<div className={styles.mobileImageContainer}>
								{c?.backgroundImage?.url ? (
									<Image
										src={c.backgroundImage.url}
										alt={c.backgroundImage.alt || c.name}
										fill
										className={styles.mobileCategoryImage}
									/>
								) : (
									<div className={styles.mobilePlaceholderImage}>
										<span className={styles.mobilePlaceholderText}>{c?.name?.charAt(0) || "📦"}</span>
									</div>
								)}
							</div>
							<span className={styles.mobileCategoryName}>{c?.name}</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
