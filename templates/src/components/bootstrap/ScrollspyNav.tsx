import React, { FC, ReactNode, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import Portal from '../../layouts/Portal/Portal';

interface IScrollspyNavProps {
	items: readonly string[];
	children?: ReactNode;
	offset?: number | undefined;
	tag?: string;
	setActiveId?(...args: unknown[]): unknown | undefined;
}
const ScrollspyNav: FC<IScrollspyNavProps> = ({
	tag,
	items,
	children,
	offset,
	setActiveId,
	...props
}) => {
	const [activeElement, setActiveElement] = useState(null);
	useEffect(() => {
		if (setActiveId) setActiveId(activeElement);
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeElement]);

	const INNER = (
		<Scrollspy
			items={items}
			offset={offset}
			currentClassName='active'
			componentTag={tag}
			onUpdate={(e) => {
				// @ts-ignore
				setActiveElement(e?.attributes.id.value);
			}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</Scrollspy>
	);

	if (children) {
		return INNER;
	}
	return <Portal>{INNER}</Portal>;
};
ScrollspyNav.propTypes = {
	// @ts-ignore
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	children: PropTypes.node,
	offset: PropTypes.number,
	tag: PropTypes.string,
	setActiveId: PropTypes.func,
};
ScrollspyNav.defaultProps = {
	children: null,
	offset: undefined,
	tag: 'span',
	setActiveId: undefined,
};

export default ScrollspyNav;
