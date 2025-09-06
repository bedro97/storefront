import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart } from "lucide-react";
import { ChannelSelect } from "./ChannelSelect";
import { Logo } from "./Logo";
import { ChannelsListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer() {
	// Note: Footer links are currently hardcoded, but this can be used for dynamic menu loading
	// const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
	// 	variables: { slug: "footer", channel },
	// 	revalidate: 60 * 60 * 24,
	// });
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: null;
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-xy-neutral-900 text-white">
			{/* Main Footer Content */}
			<div className="xy-container py-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Company Info */}
					<div className="space-y-4">
						<Logo variant="footer" showText={true} className="text-white" />
						<p className="text-sm leading-relaxed text-xy-neutral-300">
							XYHARMONEY brings you the finest beauty and wellness products from around the world. Our mission
							is to provide inclusive, high-quality products for everyone.
						</p>

						{/* Contact Info */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm text-xy-neutral-300">
								<Mail className="h-4 w-4" />
								<span>support@xyharmoney.com</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-xy-neutral-300">
								<Phone className="h-4 w-4" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-xy-neutral-300">
								<MapPin className="h-4 w-4" />
								<span>123 Beauty Street, NY 10001</span>
							</div>
						</div>
					</div>

					{/* Support */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white">Customer Support</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/support/order-tracking"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Order Tracking
								</Link>
							</li>
							<li>
								<Link
									href="/support/contact"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="/support/faq"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href="/support/returns"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Returns & Exchanges
								</Link>
							</li>
							<li>
								<Link
									href="/support/shipping"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Shipping Information
								</Link>
							</li>
						</ul>
					</div>

					{/* Programs & Partnerships */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white">Programs & Partnerships</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/programs/loyalty"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									XY Points Club
								</Link>
							</li>
							<li>
								<Link
									href="/programs/referral"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Friend Rewards
								</Link>
							</li>
							<li>
								<Link
									href="/programs/student"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Student Discount
								</Link>
							</li>
							<li>
								<Link
									href="/partnerships/influencer"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Influencer Program
								</Link>
							</li>
							<li>
								<Link
									href="/partnerships/affiliate"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Affiliate Program
								</Link>
							</li>
						</ul>
					</div>

					{/* About & Legal */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white">About XYHARMONEY</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Our Story
								</Link>
							</li>
							<li>
								<Link
									href="/about/sustainability"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Sustainability
								</Link>
							</li>
							<li>
								<Link
									href="/about/wholesale"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Wholesale
								</Link>
							</li>
							<li>
								<Link
									href="/careers"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="/press"
									className="text-sm text-xy-neutral-300 transition-colors hover:text-white"
								>
									Press & Media
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Social Links & App Download */}
				<div className="mt-12 border-t border-xy-neutral-800 pt-8">
					<div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
						{/* Social Media */}
						<div className="flex items-center gap-4">
							<span className="text-sm text-xy-neutral-400">Follow us:</span>
							<div className="flex space-x-3">
								<Link
									href="https://facebook.com/xyharmoney"
									className="text-xy-neutral-400 transition-colors hover:text-white"
								>
									<Facebook className="h-5 w-5" />
								</Link>
								<Link
									href="https://instagram.com/xyharmoney"
									className="text-xy-neutral-400 transition-colors hover:text-white"
								>
									<Instagram className="h-5 w-5" />
								</Link>
								<Link
									href="https://twitter.com/xyharmoney"
									className="text-xy-neutral-400 transition-colors hover:text-white"
								>
									<Twitter className="h-5 w-5" />
								</Link>
								<Link
									href="https://youtube.com/xyharmoney"
									className="text-xy-neutral-400 transition-colors hover:text-white"
								>
									<Youtube className="h-5 w-5" />
								</Link>
								<Link
									href="https://pinterest.com/xyharmoney"
									className="text-xy-neutral-400 transition-colors hover:text-white"
								>
									<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
									</svg>
								</Link>
								<Link
									href="https://tiktok.com/@xyharmoney"
									className="text-xy-neutral-400 transition-colors hover:text-white"
								>
									<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
									</svg>
								</Link>
							</div>
						</div>

						{/* App Download */}
						<div className="text-center lg:text-right">
							<p className="mb-2 text-sm text-xy-neutral-400">Download our mobile app</p>
							<div className="flex space-x-2">
								<Link
									href="#"
									className="rounded-lg bg-xy-neutral-800 px-4 py-2 text-sm text-white transition-colors hover:bg-xy-neutral-700"
								>
									App Store
								</Link>
								<Link
									href="#"
									className="rounded-lg bg-xy-neutral-800 px-4 py-2 text-sm text-white transition-colors hover:bg-xy-neutral-700"
								>
									Google Play
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Currency Selector */}
				{channels?.channels && (
					<div className="mt-8 border-t border-xy-neutral-800 pt-8">
						<div className="flex items-center justify-center gap-2 text-xy-neutral-400">
							<span className="text-sm">Change currency:</span>
							<ChannelSelect channels={channels.channels} />
						</div>
					</div>
				)}
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-xy-neutral-800 bg-xy-neutral-950">
				<div className="xy-container py-6">
					<div className="flex flex-col items-center justify-between gap-4 text-sm text-xy-neutral-400 md:flex-row">
						<div className="flex items-center gap-2">
							<span>© {currentYear} XYHARMONEY. All rights reserved.</span>
							<Heart className="h-4 w-4 text-xy-primary-500" />
						</div>

						<div className="flex items-center space-x-6">
							<Link href="/legal/terms" className="transition-colors hover:text-white">
								Terms of Service
							</Link>
							<Link href="/legal/privacy" className="transition-colors hover:text-white">
								Privacy Policy
							</Link>
							<Link href="/legal/cookies" className="transition-colors hover:text-white">
								Cookie Policy
							</Link>
							<Link href="/legal/accessibility" className="transition-colors hover:text-white">
								Accessibility
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
