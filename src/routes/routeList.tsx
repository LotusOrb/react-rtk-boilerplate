import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { AppOutletContainer } from '../features/app/container/AppOutletContainer';

const HomePage = React.lazy(() =>
	import('../page/HomePage').then((c) => ({ default: c.HomePage }))
);
const TodoPage = React.lazy(() =>
	import('../page/todo/TodoPage').then((c) => ({ default: c.TodoPage }))
);
const TodoPageDetail = React.lazy(() =>
	import('../page/todo/TodoDetailPage').then((c) => ({
		default: c.TodoDetailPage,
	}))
);
export const routeList: RouteObject[] = [
	{
		path: '/',
		element: <AppOutletContainer />,
		children: [
			{
				index: true,
				element: <Suspense fallback="loading...." children={<HomePage />} />,
			},
		],
	},
	{
		path: '/todo',
		element: <AppOutletContainer />,
		children: [
			{
				index: true,
				element: <Suspense fallback="loading...." children={<TodoPage />} />,
			},
			{
				path: ':id',
				element: (
					<Suspense fallback="loading...." children={<TodoPageDetail />} />
				),
			},
		],
	},
];
