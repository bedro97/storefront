"use client";

import { Fragment, type ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Logo } from "../../Logo";
import { CloseButton } from "./CloseButton";

type Props = {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
};

export const MobileMenu = ({ children, isOpen, onClose }: Props) => {
	console.log("MobileMenu render - isOpen:", isOpen);

	return (
		<>
			<Transition show={isOpen} as={Fragment}>
				<Dialog open={isOpen} onClose={onClose} className="relative z-50">
					{/* Backdrop */}
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" onClick={onClose} />
					</Transition.Child>

					<Dialog.Panel className="fixed inset-0 z-20 flex h-full w-full flex-col bg-white">
						{/* Header with Logo and Close Button */}
						<Transition.Child
							className="flex h-16 shrink-0 items-center justify-between bg-white px-4 shadow-sm sm:px-6"
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Logo variant="small" />
							<CloseButton onClick={onClose} aria-controls="mobile-menu" />
						</Transition.Child>

						{/* Content Area */}
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4"
							enterTo="opacity-100 translate-y-0"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-4"
						>
							<div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
						</Transition.Child>
					</Dialog.Panel>
				</Dialog>
			</Transition>
		</>
	);
};
