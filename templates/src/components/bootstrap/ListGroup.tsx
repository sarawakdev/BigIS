import React, { forwardRef, HTMLAttributes, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TagWrapper from '../TagWrapper';
import { TColor } from '../../type/color-type';

interface IListGroupItemProps extends HTMLAttributes<HTMLElement> {
	tag?: 'section' | 'div' | 'li' | 'a' | 'button' | 'label';
	children: ReactNode;
	className?: string;
	color?: TColor;
	isActive?: boolean;
	isDisable?: boolean;
}
export const ListGroupItem = forwardRef<HTMLDivElement, IListGroupItemProps>(
	({ tag, children, className, color, isActive, isDisable, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'list-group-item',
					{
						'list-group-item-action': tag === 'a' || tag === 'button',
						[`list-group-item-${color}`]: color,
						active: isActive,
						disabled: isDisable,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
ListGroupItem.displayName = 'ListGroupItem';
ListGroupItem.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.oneOf(['section', 'div', 'li', 'a', 'button', 'label']),
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
	isActive: PropTypes.bool,
	isDisable: PropTypes.bool,
};
ListGroupItem.defaultProps = {
	className: undefined,
	tag: 'li',
	color: undefined,
	isActive: false,
	isDisable: false,
};

interface IListGroupProps extends HTMLAttributes<HTMLElement> {
	children: ReactElement<IListGroupItemProps> | ReactElement<IListGroupItemProps>[];
	className?: string;
	tag?: 'section' | 'div' | 'ol' | 'ul';
	isFlush?: boolean;
	isHorizontal?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
	isNumbered?: boolean;
}
const ListGroup = forwardRef<HTMLDivElement, IListGroupProps>(
	({ children, className, tag, isHorizontal, isFlush, isNumbered, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'list-group',
					{
						'list-group-flush': isFlush,
					},
					{ 'list-group-numbered': isNumbered },
					{
						[`list-group-horizontal${
							typeof isHorizontal === 'string' ? `-${isHorizontal}` : ''
						}`]: isHorizontal,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
ListGroup.displayName = 'ListGroup';
ListGroup.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.oneOf(['section', 'div', 'ol', 'ul']),
	isFlush: PropTypes.bool,
	// @ts-ignore
	isHorizontal: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl']),
	]),
	isNumbered: PropTypes.bool,
};
ListGroup.defaultProps = {
	className: undefined,
	tag: 'ul',
	isHorizontal: false,
	isFlush: false,
	isNumbered: false,
};

export default ListGroup;
