import React from 'react';

interface ITodoCardProps {
	id?: number;
	title?: string;
	body?: string;
	onClick?: (id?: number) => void;
}

export const TodoCard: React.FC<ITodoCardProps> = (param) => {
	const clickHandler =
		typeof param.onClick === 'function' ? param.onClick : () => {};
	return (
		<React.Fragment>
			<div
				className="flex flex-col p-3 rounded-lg border mb-4 cursor-pointer hover:border-blue-500"
				onClick={() => clickHandler(param.id)}
			>
				<div>{param.id}</div>
				<div>{param.title}</div>
				<div>{param.body}</div>
			</div>
		</React.Fragment>
	);
};
