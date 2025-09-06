"use client";

import { useState, useEffect } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/checkout/components/Button";

interface HeroSlide {
	id: string;
	image: string;
	headline: string;
	subheading: string;
	ctaText: string;
	ctaLink: string;
	activeDates: {
		start: string;
		end: string;
	};
}

const heroSlides: HeroSlide[] = [
	{
		id: "1",
		image: "/cosmetics.gif",
		headline: "Welcome to XY Beauty",
		subheading: "Discover premium cosmetics and skincare products",
		ctaText: "Shop Now",
		ctaLink: "/products",
		activeDates: {
			start: "2024-01-01",
			end: "2024-12-31",
		},
	},
	{
		id: "2",
		image: "/cosmeticsbanner.jpg",
		headline: "Summer Flash Sale",
		subheading: "Up to 50% off on selected beauty products",
		ctaText: "Shop Now",
		ctaLink: "/collections/summer-sale",
		activeDates: {
			start: "2024-06-01",
			end: "2024-08-31",
		},
	},
	{
		id: "3",
		image: "/makeup.gif",
		headline: "",
		subheading: "",
		ctaText: "",
		ctaLink: "",
		activeDates: {
			start: "2024-01-01",
			end: "2024-12-31",
		},
	},
	{
		id: "4",
		image: "/korean.webp",
		headline: "",
		subheading: "",
		ctaText: "",
		ctaLink: "",
		activeDates: {
			start: "2024-01-01",
			end: "2024-12-31",
		},
	},
];

export function HeroCarousel() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [isAutoPlaying]);

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
		setIsAutoPlaying(false);
		// Resume auto-play after 10 seconds
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const goToPrevious = () => {
		setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const goToNext = () => {
		setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const currentSlideData = heroSlides[currentSlide];

	return (
		<div className="relative h-[500px] w-full overflow-hidden bg-gradient-to-r from-xy-primary-50 to-xy-secondary-50 md:h-[600px] lg:h-[700px]">
			{/* Hero Slide */}
			<div className="relative h-full w-full">
				<Image
					src={currentSlideData.image}
					alt={currentSlideData.headline}
					fill
					className="object-cover"
					priority
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-black/20" />

				{/* Content - Only show if there's content to display */}
				{(currentSlideData.headline || currentSlideData.subheading || currentSlideData.ctaText) && (
					<div
						className={`absolute inset-0 flex items-center ${
							currentSlide === 1 ? "justify-end pr-60" : "justify-center"
						}`}
					>
						<div className={`max-w-4xl px-4 text-center text-white`}>
							{currentSlideData.headline && (
								<h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-5xl lg:text-6xl">
									{currentSlideData.headline}
								</h1>
							)}
							{currentSlideData.subheading && (
								<p className="mb-8 text-lg drop-shadow-md md:text-xl lg:text-2xl">
									{currentSlideData.subheading}
								</p>
							)}
							{currentSlideData.ctaText && currentSlideData.ctaLink && (
								<Link href={currentSlideData.ctaLink}>
									<Button className="xy-button-primary px-8 py-4 text-lg" label={currentSlideData.ctaText} />
								</Link>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={goToPrevious}
				className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-xy-neutral-800 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
				aria-label="Previous slide"
			>
				<ChevronLeft className="h-6 w-6" />
			</button>

			<button
				onClick={goToNext}
				className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-xy-neutral-800 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
				aria-label="Next slide"
			>
				<ChevronRight className="h-6 w-6" />
			</button>

			{/* Slide Indicators */}
			<div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
				{heroSlides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`h-3 w-3 rounded-full transition-all duration-300 ${
							index === currentSlide ? "scale-125 bg-white" : "bg-white/50 hover:bg-white/75"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>

			{/* Pause/Play Button */}
			<button
				onClick={() => setIsAutoPlaying(!isAutoPlaying)}
				className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-xy-neutral-800 shadow-lg transition-all duration-300 hover:bg-white"
				aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
			>
				{isAutoPlaying ? (
					<div className="flex h-4 w-4 items-center justify-center">
						<div className="mx-0.5 h-4 w-1 bg-current"></div>
						<div className="mx-0.5 h-4 w-1 bg-current"></div>
					</div>
				) : (
					<div className="flex h-4 w-4 items-center justify-center">
						<div className="ml-1 h-0 w-0 border-b-2 border-l-4 border-t-2 border-b-transparent border-l-current border-t-transparent"></div>
					</div>
				)}
			</button>
		</div>
	);
}
