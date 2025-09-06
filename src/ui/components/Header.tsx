import { Suspense } from "react";
import { Heart } from "lucide-react";
import { Logo } from "./Logo";
import { UserMenuContainer } from "./nav/components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./nav/components/CartNavItem";
import { SearchBar } from "./nav/components/SearchBar";
import { MobileMenuWrapper } from "./nav/components/MobileMenuWrapper";
import { Button } from "@/checkout/components/Button";

export const Header = ({ channel }: { channel: string }) => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-xy-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
			<div
				className="xy-container
			"
			>
				{/* Top Row - Logo and Actions */}
				<div className="flex h-32 items-center">
					{/* Left Side - Search Bar */}
					<div className="hidden w-64 md:block">
						<SearchBar channel={channel} />
					</div>

					{/* Center - Logo */}
					<div className="flex flex-1 items-center justify-center">
						<Logo variant="header" />
					</div>

					{/* Right Side - User Actions */}
					<div className="flex w-64 items-center justify-end space-x-2">
						{/* Wishlist */}
						<Button
							variant="tertiary"
							className="hidden h-12 w-12 rounded-full p-0 text-xy-neutral-600 transition-all duration-200 hover:bg-xy-primary-50 hover:bg-xy-primary-50 hover:text-xy-primary-600 md:flex"
							label={<Heart className="h-6 w-6" />}
							ariaLabel="Wishlist"
						/>

						{/* User Account */}
						<Suspense fallback={<div className="h-9 w-9" />}>
							<UserMenuContainer />
						</Suspense>

						{/* Cart */}
						<Suspense fallback={<div className="h-9 w-9" />}>
							<CartNavItem channel={channel} />
						</Suspense>

						{/* Mobile Menu Button */}
						<MobileMenuWrapper channel={channel}>
							<div className="space-y-6">
								{/* Beauty Categories */}
								<div className="space-y-3">
									<h3 className="border-b border-xy-neutral-200 pb-2 text-lg font-bold text-xy-neutral-900">
										Beauty Categories
									</h3>
									<div className="grid grid-cols-1 gap-3">
										<a
											href={`/${channel}/categories/beauty`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Beauty
										</a>
										<a
											href={`/${channel}/categories/skincare`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Skin Care
										</a>
										<a
											href={`/${channel}/categories/makeup`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Makeup
										</a>
										<a
											href={`/${channel}/categories/haircare`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Hair Care
										</a>
										<a
											href={`/${channel}/categories/bodycare`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Body Care
										</a>
										<a
											href={`/${channel}/categories/fragrance`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Fragrance
										</a>
										<a
											href={`/${channel}/categories/tools`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Tools & Brushes
										</a>
									</div>
								</div>

								{/* Gender Categories */}
								<div className="space-y-3">
									<h3 className="border-b border-xy-neutral-200 pb-2 text-lg font-bold text-xy-neutral-900">
										Shop By
									</h3>
									<div className="grid grid-cols-1 gap-3">
										<a
											href={`/${channel}/categories/men`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Men
										</a>
										<a
											href={`/${channel}/categories/women`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Women
										</a>
										<a
											href={`/${channel}/categories/unisex`}
											className="rounded-lg p-3 text-base font-medium text-xy-neutral-700 transition-colors hover:bg-xy-primary-50 hover:text-xy-primary-600"
										>
											Unisex
										</a>
									</div>
								</div>
							</div>
						</MobileMenuWrapper>
					</div>
				</div>

				{/* Bottom Row - Navigation Menu */}
				<nav className="hidden border-t border-xy-neutral-200 py-4 lg:block">
					<div className="flex items-center justify-center space-x-12">
						{/* Beauty Categories */}
						<div className="flex items-center space-x-8">
							<a
								href={`/${channel}/categories/beauty`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Beauty
							</a>
							<a
								href={`/${channel}/categories/skincare`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Skin Care
							</a>
							<a
								href={`/${channel}/categories/makeup`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Makeup
							</a>
							<a
								href={`/${channel}/categories/haircare`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Hair Care
							</a>
							<a
								href={`/${channel}/categories/bodycare`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Body Care
							</a>
							<a
								href={`/${channel}/categories/fragrance`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Fragrance
							</a>
							<a
								href={`/${channel}/categories/tools`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Tools & Brushes
							</a>
						</div>

						{/* Gender Categories */}
						<div className="flex items-center space-x-6">
							<a
								href={`/${channel}/categories/men`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Men
							</a>
							<a
								href={`/${channel}/categories/women`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Women
							</a>
							<a
								href={`/${channel}/categories/unisex`}
								className="transform text-base font-semibold text-xy-neutral-700 transition-colors duration-200 hover:scale-105 hover:text-xy-primary-600"
							>
								Unisex
							</a>
						</div>
					</div>
				</nav>

				{/* Mobile Search Bar */}
				<div className="pb-6 lg:hidden">
					<SearchBar channel={channel} />
				</div>
			</div>
		</header>
	);
};
