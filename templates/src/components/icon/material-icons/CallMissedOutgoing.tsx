import React, { SVGProps } from 'react';

const SvgCallMissedOutgoing = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' fill='currentColor' className='svg-icon' {...props}>
			<path d='M0 0h24v24H0z' fill='none' />
			<path d='M19 10.41V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41l9 9z' />
		</svg>
	);
};

export default SvgCallMissedOutgoing;
