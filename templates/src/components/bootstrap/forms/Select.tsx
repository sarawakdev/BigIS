import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Option, { IOptionsProps, Options } from '../Option';
import Validation from './Validation';

interface ISelectProps extends Partial<IOptionsProps>, HTMLAttributes<HTMLSelectElement> {
	id?: string;
	className?: string;
	name?: string;
	children?: ReactNode;
	ariaLabel: string;
	placeholder?: string;
	size?: 'lg' | 'sm';
	multiple?: boolean;
	disabled?: boolean;
	required?: boolean;
	ariaDescribedby?: string;
	ariaLabelledby?: string;
	title?: string;
	value?: string | string[];
	defaultValue?: string | string[];
	isTouched?: boolean;
	isValid?: boolean;
	invalidFeedback?: string;
	validFeedback?: string;
	isValidMessage?: boolean;
	isTooltipFeedback?: boolean;
	onBlur?(...args: unknown[]): unknown;
	onChange?(...args: unknown[]): unknown;
	onFocus?(...args: unknown[]): unknown;
	onInput?(...args: unknown[]): unknown;
	onInvalid?(...args: unknown[]): unknown;
	onSelect?(...args: unknown[]): unknown;
}
const Select = forwardRef<HTMLSelectElement, ISelectProps>(
	(
		{
			id,
			name,
			className,
			children,
			required,
			placeholder,
			ariaDescribedby,
			ariaLabelledby,
			ariaLabel,
			list,
			multiple,
			title,
			size,
			disabled,
			value,
			defaultValue,
			isValid,
			isTouched,
			invalidFeedback,
			validFeedback,
			isValidMessage,
			isTooltipFeedback,
			onBlur,
			onChange,
			onFocus,
			onInput,
			onInvalid,
			onSelect,
			...props
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		ref,
	) => {
		return (
			<>
				<select
					ref={ref}
					id={id}
					className={classNames(
						'form-select',
						{
							[`form-select-${size}`]: size,
							'text-muted': value === '' && placeholder,
							'is-invalid': !isValid && isTouched && invalidFeedback,
							'is-valid': !isValid && isTouched && !invalidFeedback,
						},
						className,
					)}
					name={name}
					aria-label={ariaLabel}
					aria-describedby={ariaDescribedby}
					aria-labelledby={ariaLabelledby}
					multiple={multiple}
					disabled={disabled}
					title={title}
					value={value}
					defaultValue={defaultValue}
					required={required}
					onBlur={onBlur}
					onChange={onChange}
					onFocus={onFocus}
					onInput={onInput}
					onInvalid={onInvalid}
					onSelect={onSelect}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}>
					{placeholder && (
						<Option value='' hidden>
							{placeholder}
						</Option>
					)}
					{children || (list && <Options list={list} />)}
				</select>
				{isValidMessage && (
					<Validation
						isTouched={isTouched}
						invalidFeedback={invalidFeedback}
						validFeedback={validFeedback}
						isTooltip={isTooltipFeedback}
					/>
				)}
			</>
		);
	},
);
Select.displayName = 'Select';
Select.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	/**
	 * If the name value is left blank, the id value is assigned.
	 */
	name: PropTypes.string,
	children: PropTypes.node,
	ariaLabel: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	size: PropTypes.oneOf(['lg', 'sm']),
	multiple: PropTypes.bool,
	/**
	 * A *disabled* element isn't editable and isn't sent on submit.
	 */
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	ariaDescribedby: PropTypes.string,
	ariaLabelledby: PropTypes.string,
	title: PropTypes.string,
	/**
	 * For formik ***`formik.values.ID_OR_NAME`***
	 */
	// @ts-ignore
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	// @ts-ignore
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	// @ts-ignore
	list: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	),
	/**
	 * For formik ***`formik.touched.ID_OR_NAME`***
	 */
	isTouched: PropTypes.bool,
	/**
	 * For formik ***`formik.isValid`***
	 */
	isValid: PropTypes.bool,
	/**
	 * For formik ***`formik.errors.ID_OR_NAME`***
	 */
	invalidFeedback: PropTypes.string,
	validFeedback: PropTypes.string,
	isValidMessage: PropTypes.bool,
	isTooltipFeedback: PropTypes.bool,
	/**
	 * Fires the moment that the element loses focus. For formik ***`formik.handleBlur`***
	 */
	onBlur: PropTypes.func,
	/**
	 * Fires the moment when the value of the element is changed. For formik ***`formik.handleChange`***
	 */
	onChange: PropTypes.func,
	/**
	 * Fires the moment when the element gets focus
	 */
	onFocus: PropTypes.func,
	/**
	 * Script to be run when an element gets user input
	 */
	onInput: PropTypes.func,
	/**
	 * Script to be run when an element is invalid
	 */
	onInvalid: PropTypes.func,
	/**
	 * Fires after some text has been selected in an element
	 */
	onSelect: PropTypes.func,
	/**
	 * More information, [react-input-mask](https://github.com/sanniassin/react-input-mask#react-input-mask).
	 */
};
Select.defaultProps = {
	id: undefined,
	className: undefined,
	name: undefined,
	children: null,
	placeholder: undefined,
	multiple: false,
	size: undefined,
	disabled: false,
	required: false,
	ariaDescribedby: undefined,
	ariaLabelledby: undefined,
	title: undefined,
	value: undefined,
	defaultValue: undefined,
	list: undefined,
	isTouched: false,
	isValid: false,
	invalidFeedback: undefined,
	validFeedback: undefined,
	isValidMessage: true,
	isTooltipFeedback: false,
	onBlur: undefined,
	onChange: undefined,
	onFocus: undefined,
	onInput: undefined,
	onInvalid: undefined,
	onSelect: undefined,
};

export default Select;
