import { type ReactNode } from "react";
import { Header } from "@/ui/components/Header";
import { Footer } from "@/ui/components/Footer";

export const metadata = {
	title: "XYHARMONEY - Harmony in Beauty | Premium Beauty & Wellness Products",
	description:
		"Discover inclusive beauty and wellness products at XYHARMONEY. Premium skincare, makeup, haircare, and fragrance for everyone. Shop now for exclusive offers and free shipping.",
	keywords:
		"beauty, skincare, makeup, haircare, fragrance, inclusive beauty, gender-neutral, Korean beauty, premium cosmetics, wellness products",
	openGraph: {
		title: "XYHARMONEY - Harmony in Beauty",
		description: "Premium beauty and wellness products for everyone. Discover inclusive beauty solutions.",
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "XYHARMONEY - Harmony in Beauty",
		description: "Premium beauty and wellness products for everyone.",
	},
};

export default async function RootLayout(props: {
	children: ReactNode;
	params: Promise<{ channel: string }>;
}) {
	const channel = (await props.params).channel;

	return (
		<>
			<Header channel={channel} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
				<Footer />
			</div>
		</>
	);
}
