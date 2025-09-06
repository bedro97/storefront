"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/checkout/components/Button";

interface MobileMenuWrapperProps {
	channel: string;
	children: React.ReactNode;
}

export const MobileMenuWrapper = ({ channel: _channel, children }: MobileMenuWrapperProps) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const openMobileMenu = () => {
		console.log("Opening mobile menu");
		setIsMobileMenuOpen(true);
	};
	const closeMobileMenu = () => {
		console.log("Closing mobile menu");
		setIsMobileMenuOpen(false);
	};

	console.log("MobileMenuWrapper render - isOpen:", isMobileMenuOpen);

	return (
		<>
			{/* Mobile Menu Button */}
			<Button
				variant="tertiary"
				className="h-12 w-12 rounded-full border border-xy-neutral-200 p-0 text-xy-neutral-600 transition-all duration-200 hover:bg-xy-primary-50 hover:text-xy-primary-600 lg:hidden"
				label={<Menu className="h-6 w-6" />}
				ariaLabel="Open menu"
				onClick={openMobileMenu}
			/>

			{/* Mobile Menu */}
			<MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
				{children}
			</MobileMenu>
		</>
	);
};
