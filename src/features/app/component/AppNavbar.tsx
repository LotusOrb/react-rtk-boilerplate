import React from 'react';
import { NavLink } from 'react-router-dom';
interface INavbarProps {}

export const Navbar: React.FC<INavbarProps> = (param) => {
	return (
		<React.Fragment>
			<div className="container">
				<div className="w-full flex flex-wrap border-b px-4 py-2 items-center mb-4">
					<NavLink to="/" className="font-medium cursor-pointer">
						Web Tittle
					</NavLink>
					<div className="ml-auto flex">
						<NavLink
							className={({ isActive }) =>
								'mx-2 px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer ' +
								(isActive ? 'text-blue-500' : '')
							}
							to="/todo"
						>
							Todo
						</NavLink>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
