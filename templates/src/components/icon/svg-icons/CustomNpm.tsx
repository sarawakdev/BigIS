import React, { SVGProps } from 'react';

const SvgCustomNpm = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='1em'
		height='1em'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
		className='svg-icon'
		{...props}>
		<g fill='none' fillRule='evenodd'>
			<path fill='#D40001' d='M0 0h24v24H0z' />
			<path fill='#FFF' d='M16.718 7.928h-4.513V20.25H4V3h16v17.249h-3.282V7.93Z' />
		</g>
	</svg>
);
export default SvgCustomNpm;
