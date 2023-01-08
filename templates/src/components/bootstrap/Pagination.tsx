import React, { forwardRef, HTMLAttributes, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/Icon';

interface IPaginationItemProps extends HTMLAttributes<HTMLLIElement> {
	className?: string;
	isDisabled?: boolean;
	isActive?: boolean;
	isPrev?: boolean;
	isFirst?: boolean;
	isNext?: boolean;
	isLast?: boolean;
	children?: ReactNode;
	onClick?(...args: unknown[]): unknown | undefined;
}
export const PaginationItem = forwardRef<HTMLLIElement, IPaginationItemProps>(
	(
		{
			className,
			isDisabled,
			isActive,
			isPrev,
			isFirst,
			isNext,
			isLast,
			children,
			onClick,
			...props
		},
		ref,
	) => {
		return (
			<li
				ref={ref}
				className={classNames(
					'page-item',
					{
						disabled: isDisabled,
						active: isActive,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				<span
					role='button'
					onClick={onClick}
					onKeyDown={onClick}
					className='page-link'
					tabIndex={isDisabled ? -1 : undefined}
					aria-disabled={isDisabled ? 'true' : undefined}
					aria-label={
						(isPrev && 'First Page') || (isNext && 'Last Page') || `${children} page`
					}>
					{isPrev && <Icon icon='ChevronLeft' />}
					{isFirst && <Icon icon='FirstPage' />}
					{isNext && <Icon icon='ChevronRight' />}
					{isLast && <Icon icon='LastPage' />}
					{children}
				</span>
			</li>
		);
	},
);
PaginationItem.displayName = 'PaginationItem';
PaginationItem.propTypes = {
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	isActive: PropTypes.bool,
	isPrev: PropTypes.bool,
	isFirst: PropTypes.bool,
	isNext: PropTypes.bool,
	isLast: PropTypes.bool,
	children: PropTypes.node,
	onClick: PropTypes.func,
};
PaginationItem.defaultProps = {
	className: undefined,
	isDisabled: false,
	isActive: false,
	isPrev: false,
	isFirst: false,
	isNext: false,
	isLast: false,
	children: null,
	onClick: undefined,
};

interface IPaginationProps extends HTMLAttributes<HTMLElement> {
	ariaLabel: string;
	children:
		| ReactElement<IPaginationItemProps>
		| ReactElement<IPaginationItemProps>[]
		| ReactNode
		| ReactNode[];
	className?: string | undefined;
	size?: 'sm' | 'lg' | null;
}
const Pagination = forwardRef<HTMLDivElement, IPaginationProps>(
	({ ariaLabel, className, children, size, ...props }, ref) => {
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<nav ref={ref} aria-label={ariaLabel} className={className} {...props}>
				<ul className={classNames('pagination', { [`pagination-${size}`]: size }, 'm-0')}>
					{children}
				</ul>
			</nav>
		);
	},
);
Pagination.displayName = 'Pagination';
Pagination.propTypes = {
	ariaLabel: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'lg']),
};
Pagination.defaultProps = {
	className: undefined,
	size: null,
};

export default Pagination;
