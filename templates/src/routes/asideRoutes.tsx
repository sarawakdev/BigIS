import React from 'react';
import { RouteProps } from 'react-router-dom';
import DefaultAside from '../pages/_layout/_asides/DefaultAside';

const asides: RouteProps[] = [
	{ path: '/signin', element: null },
	{ path: '/signup', element: null },
	{ path: '/blank', element: null },
	{ path: '*', element: <DefaultAside /> },
];

export default asides;
