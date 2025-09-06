import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense, type ReactNode } from "react";
import { type Metadata } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "XYHARMONEY - Harmony in Beauty | Premium Beauty & Wellness Products",
	description:
		"Discover inclusive beauty and wellness products at XYHARMONEY. Premium skincare, makeup, haircare, and fragrance for everyone. Shop now for exclusive offers and free shipping.",
	keywords:
		"beauty, skincare, makeup, haircare, fragrance, inclusive beauty, gender-neutral, Korean beauty, premium cosmetics, wellness products",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh">
			<body className={`${inter.className} min-h-dvh`} suppressHydrationWarning={true}>
				{children}
				<Suspense>
					<DraftModeNotification />
				</Suspense>
			</body>
		</html>
	);
}
