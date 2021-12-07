import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routeList } from './routeList';

const RouteRenderer = () => {
	const Relem = useRoutes(routeList);
	return <React.Fragment>{Relem}</React.Fragment>;
};

export const RouteComponent: React.FC<any> = () => {
	return (
		<BrowserRouter>
			<RouteRenderer />
		</BrowserRouter>
	);
};
