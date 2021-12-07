import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../component/AppNavbar';

interface IAppOutletContainerProps {}

export const AppOutletContainer: React.FC<IAppOutletContainerProps> = (param) => {
	return (
		<React.Fragment>
			<Navbar />
			<Outlet />
		</React.Fragment>
	);
};
