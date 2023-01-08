import React, { Children, cloneElement, forwardRef, HTMLAttributes, ReactElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { TColor } from '../../type/color-type';

const useStyles = createUseStyles({
	// stylelint-disable-next-line selector-type-no-unknown
	dynamicHeight: (props) => ({
		// @ts-ignore
		height: props.height,
	}),
});

interface IProgressProps extends HTMLAttributes<HTMLDivElement> {
	value?: number;
	min?: number;
	max?: number;
	height?: number | string | null;
	isStriped?: boolean;
	isAnimated?: boolean;
	isAutoColor?: boolean;
	color?: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
	children?: ReactElement<IProgressProps> | ReactElement<IProgressProps>[];
	className?: string;
	isOnlyBar?: boolean;
}
const Progress = forwardRef<HTMLDivElement, IProgressProps>(
	(
		{
			value,
			min,
			max,
			height,
			isStriped,
			isAnimated,
			isAutoColor,
			color,
			children,
			className,
			// eslint-disable-next-line react/prop-types
			isOnlyBar,
			...props
		},
		ref,
	) => {
		// @ts-ignore
		const VALUE = (100 * (value - min)) / (max - min);
		// @ts-ignore
		const classes = useStyles({ height });

		const ONLY_BAR = (
			<div
				style={{
					width: `${VALUE}%`,
				}}
				className={classNames(
					'progress-bar',
					{
						'bg-danger': VALUE < 25 && isAutoColor,
						'bg-warning': VALUE >= 25 && VALUE < 50 && isAutoColor,
						'bg-info': VALUE >= 50 && VALUE < 75 && isAutoColor,
						'bg-success': VALUE >= 75 && isAutoColor,
					},
					{
						[`bg-${color}`]: color && !isAutoColor,
						'progress-bar-striped': isStriped || isAnimated,
						'progress-bar-animated': isAnimated,
					},
				)}
				role='progressbar'
				aria-label={`${value}%`}
				aria-valuenow={value}
				aria-valuemin={min}
				aria-valuemax={max}
			/>
		);

		if (isOnlyBar) {
			return ONLY_BAR;
		}
		return (
			<div
				ref={ref}
				className={classNames('progress', { [classes.dynamicHeight]: !!height }, className)}
				style={{
					// @ts-ignore
					// eslint-disable-next-line react/prop-types
					...props.style,
				}}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children
					? Children.map(children, (child) =>
							cloneElement(child as ReactElement, { isOnlyBar: true }),
					  )
					: ONLY_BAR}
			</div>
		);
	},
);
Progress.displayName = 'Progress';
Progress.propTypes = {
	value: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	/**
	 * If the value is a number, it is automatically used as px. Example: 10, '1rem', '5vh', etc.
	 */
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	isStriped: PropTypes.bool,
	isAnimated: PropTypes.bool,
	isAutoColor: PropTypes.bool,
	color: PropTypes.oneOf([
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
	/**
	 * To use more than one `<Progress />`
	 */
	// @ts-ignore
	children: PropTypes.node,
	className: PropTypes.string,
};
Progress.defaultProps = {
	value: 0,
	min: 0,
	max: 100,
	height: null,
	isStriped: false,
	isAnimated: false,
	isAutoColor: false,
	color: undefined,
	children: undefined,
	className: undefined,
};

export default Progress;
