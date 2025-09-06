import clsx from "clsx";
import { XIcon } from "lucide-react";
import { type HTMLAttributes } from "react";

type Props = {
	onClick: () => void;
} & Pick<HTMLAttributes<HTMLButtonElement>, "aria-controls">;

export const CloseButton = (props: Props) => {
	return (
		<button
			className={clsx(
				"flex h-10 w-10 items-center justify-center rounded-full bg-xy-neutral-100 transition-colors hover:bg-xy-neutral-200",
			)}
			aria-controls={props["aria-controls"]}
			aria-label="Close menu"
			onClick={props.onClick}
		>
			<XIcon className="h-5 w-5 text-xy-neutral-600" aria-hidden />
		</button>
	);
};
