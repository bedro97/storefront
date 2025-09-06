"use client";

import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

interface LogoProps {
	variant?: "default" | "small" | "footer" | "header";
	showText?: boolean;
	className?: string;
}

export function Logo({ variant = "default", showText = false, className = "" }: LogoProps) {
	const logoSize = variant === "small" ? 48 : variant === "footer" ? 64 : variant === "header" ? 280 : 800;
	const textSize =
		variant === "small"
			? "text-lg"
			: variant === "footer"
				? "text-sm"
				: variant === "header"
					? "text-xl"
					: "text-3xl";

	return (
		<LinkWithChannel href="/" className={`flex items-center gap-3 ${className}`}>
			<div className="relative">
				<Image
					src="/Xybeauty.png"
					alt="XYHARMONEY Logo"
					width={logoSize}
					height={logoSize}
					className="object-contain"
					priority={variant === "default"}
				/>
			</div>
			{showText && <span className={`font-bold ${textSize} xy-text-gradient`}>XYHARMONEY</span>}
		</LinkWithChannel>
	);
}
