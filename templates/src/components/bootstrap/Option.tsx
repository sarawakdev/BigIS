import React, { FC, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';

interface IOptionProps extends HTMLAttributes<HTMLOptionElement> {
	children: string;
	value?: string | number;
	disabled?: boolean;
	ariaLabelledby?: string | null;
}
const Option: FC<IOptionProps> = ({ children, value, disabled, ariaLabelledby, ...props }) => {
	return (
		<option
			value={value}
			disabled={disabled}
			aria-labelledby={ariaLabelledby || children}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</option>
	);
};
Option.propTypes = {
	children: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	disabled: PropTypes.bool,
	ariaLabelledby: PropTypes.string,
};
Option.defaultProps = {
	disabled: false,
	ariaLabelledby: null,
};

export interface IOptionsProps {
	list: {
		value?: string | number;
		text?: string | number;
		label?: string | number;
	}[];
}
// @ts-ignore
export const Options: FC<IOptionsProps> = ({ list }) => {
	return list?.map((item) => (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Option key={item.value} value={item.value} {...item}>
			{/* @ts-ignore */}
			{item.text || item.label}
		</Option>
	));
};
Options.propTypes = {
	// @ts-ignore
	list: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	).isRequired,
};

export default Option;
