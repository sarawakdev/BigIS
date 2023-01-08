import React, { SVGProps } from 'react';

const SvgPlaylistPlay = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' fill='currentColor' className='svg-icon' {...props}>
			<path fill='none' d='M0 0h24v24H0z' />
			<path d='M3 10h11v2H3zM3 6h11v2H3zM3 14h7v2H3zM16 13v8l6-4z' />
		</svg>
	);
};

export default SvgPlaylistPlay;
