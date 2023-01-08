import React from 'react';
import { ThemeProvider } from 'react-jss';
import logo from '../logo.svg';
import { getOS } from '../helpers/helpers';
import Wrapper from '../layouts/Wrapper/Wrapper';
import AsideRoutes from '../layouts/Aside/AsideRoutes';

const App = () => {
	getOS();

	const theme = {
		theme: 'light',
		primary: '#000',
		secondary: '#fff',
		success: '#0f0',
		info: '#00f',
		warning: '#ff0',
		danger: '#f00',
		dark: '#000',
		light: '#fff',
	};
	return (
		<ThemeProvider theme={theme}>
			<div className='app'>
				<AsideRoutes />
				<Wrapper />
			</div>
		</ThemeProvider>
	);
};

export default App;
