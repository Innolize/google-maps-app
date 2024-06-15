type ButtonProps = {
	text: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onClick?: any;
};

export const Button = ({ text, onClick }: ButtonProps) => {
	return (
		<button
			type="button"
			className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			onClick={onClick}
		>
			{text}
		</button>
	);
};
