import React, { Children, cloneElement, forwardRef, FC, ReactNode, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { randomColor } from '../helpers/helpers';
import Popovers from './bootstrap/Popovers';
import useDarkMode from '../hooks/useDarkMode';
import { TColor } from '../type/color-type';

interface IAvatarGroupProps {
	className?: string;
	children: ReactNode[];
	size?: number;
}
export const AvatarGroup: FC<IAvatarGroupProps> = ({ className, children, size }) => {
	const { darkModeStatus } = useDarkMode();

	return (
		<div className={classNames('avatar-group', className)}>
			<div className='avatar-container'>
				{Children.map(children, (child, index) =>
					index < 3
						? // @ts-ignore
						  cloneElement(child, {
								borderColor: darkModeStatus ? 'dark' : 'white',
								border: 2,
								// @ts-ignore
								color: child.props.color || randomColor(),
								size,
						  })
						: null,
				)}
			</div>
			{children?.length > 3 && (
				<Popovers
					desc={Children.map(children, (child, index) =>
						index >= 3 ? (
							<>
								{/* @ts-ignore */}
								{child.props.userName}
								<br />
							</>
						) : null,
					)}
					trigger='hover'>
					<div className='avatar-more' style={{ width: size, height: size }}>
						+{children?.length - 3}
					</div>
				</Popovers>
			)}
		</div>
	);
};
AvatarGroup.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	size: PropTypes.number,
};
AvatarGroup.defaultProps = {
	className: undefined,
	size: 32,
};

interface IAvatarProps extends HTMLAttributes<HTMLImageElement> {
	border?: null | 0 | 1 | 2 | 3 | 4 | 5;
	borderColor?: null | TColor | 'link' | 'brand' | 'brand-two' | 'storybook' | 'white';
	className?: string;
	color?: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
	isOnline?: boolean;
	isReply?: boolean;
	rounded?: 'default' | 0 | 1 | 2 | 3 | 'bottom' | 'top' | 'circle' | 'end' | 'start' | 'pill';
	shadow?: 'none' | 'sm' | 'default' | 'lg' | null;
	size?: number;
	src: string;
	srcSet?: string | undefined;
	userName?: string | null;
}
const Avatar = forwardRef<HTMLImageElement, IAvatarProps>(
	(
		{
			srcSet,
			src,
			className,
			size,
			rounded,
			shadow,
			color,
			border,
			borderColor,
			userName,
			isOnline, // Not used
			isReply, // Not used
			...props
		},
		ref,
	) => {
		const { darkModeStatus } = useDarkMode();

		const INNER = (
			<img
				ref={ref}
				className={classNames(
					'avatar',
					{
						[`rounded${rounded !== 'default' ? `-${rounded}` : ''}`]: rounded,
						'rounded-0': rounded === 0,
						[`shadow${shadow !== 'default' ? `-${shadow}` : ''}`]: !!shadow,
						border: !!border,
						[`border-${border}`]: !!border,
						[`border-${borderColor}`]: borderColor,
					},
					`bg-l${darkModeStatus ? 'o' : ''}25-${color}`,
					className,
				)}
				srcSet={srcSet}
				src={src}
				alt='Avatar'
				width={size}
				height={size}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
			/>
		);

		if (userName) {
			return (
				<Popovers desc={userName} trigger='hover'>
					{INNER}
				</Popovers>
			);
		}
		return INNER;
	},
);
Avatar.displayName = 'Avatar';
Avatar.propTypes = {
	src: PropTypes.string.isRequired,
	srcSet: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.number,
	rounded: PropTypes.oneOf([
		'default',
		0,
		1,
		2,
		3,
		'bottom',
		'top',
		'circle',
		'end',
		'start',
		'pill',
	]),
	color: PropTypes.oneOf([
		null,
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
		'link',
		'brand',
		'brand-two',
		'storybook',
	]),
	shadow: PropTypes.oneOf([null, 'none', 'sm', 'default', 'lg']),
	border: PropTypes.oneOf([null, 0, 1, 2, 3, 4, 5]),
	borderColor: PropTypes.oneOf([
		null,
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
		'link',
		'brand',
		'brand-two',
		'storybook',
		'white',
	]),
	userName: PropTypes.string,
	isOnline: PropTypes.bool,
	isReply: PropTypes.bool,
};
Avatar.defaultProps = {
	srcSet: undefined,
	className: undefined,
	size: 128,
	rounded: 'circle',
	color: 'primary',
	shadow: null,
	border: null,
	borderColor: null,
	userName: null,
	isOnline: false,
	isReply: false,
};

export default Avatar;
