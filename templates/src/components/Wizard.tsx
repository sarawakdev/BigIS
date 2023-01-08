import React, { Children, cloneElement, FC, ReactElement, ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
	ICardProps,
} from './bootstrap/Card';
import Button from './bootstrap/Button';
import Popovers from './bootstrap/Popovers';
import useDarkMode from '../hooks/useDarkMode';
import { TColor } from '../type/color-type';

interface IWizardItemProps extends React.HTMLAttributes<HTMLDivElement> {
	id: string;
	children: ReactNode;
	title?: string;
	className?: string;
}
export const WizardItem: FC<IWizardItemProps> = ({ id, title, children, className, ...props }) => {
	return (
		<section
			id={id}
			className={classNames('wizard-item', className)}
			role='tabpanel'
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</section>
	);
};
WizardItem.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	className: PropTypes.string,
};
WizardItem.defaultProps = {
	className: undefined,
	title: undefined,
};

interface IWizardProps extends ICardProps {
	children: ReactElement<IWizardItemProps> | ReactElement<IWizardItemProps>[];
	color?: TColor;
	isHeader?: boolean | 'withButton';
}
const Wizard: FC<IWizardProps> = ({ children, onSubmit, isHeader, color, stretch, ...props }) => {
	const { themeStatus } = useDarkMode();
	const [activeItemIndex, setActiveItemIndex] = useState(0);

	const childCount = Array.isArray(children) ? children?.length : 1;

	const getTitleName = (i: number) => {
		return `Step ${i + 1}`;
	};

	const prevBtn = !!activeItemIndex && (
		<Button color={color} isLink onClick={() => setActiveItemIndex(activeItemIndex - 1)}>
			Previous
		</Button>
	);

	const nextBtn = (
		<>
			<Button
				className={classNames({ 'd-none': childCount === activeItemIndex + 1 }, 'me-0')}
				aria-hidden={childCount === activeItemIndex + 1}
				color={color}
				isLight
				onClick={() => setActiveItemIndex(activeItemIndex + 1)}>
				Next
			</Button>
			<Button
				className={classNames({ 'd-none': childCount !== activeItemIndex + 1 })}
				aria-hidden={childCount !== activeItemIndex + 1}
				type='submit'
				color={color}>
				Submit
			</Button>
		</>
	);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Card stretch={stretch} tag='form' onSubmit={onSubmit} {...props}>
			{!!isHeader && (
				<CardHeader>
					<CardLabel icon='Assignment' iconColor={color}>
						{Children.map(children, (child, index) => (
							<CardTitle
								key={child?.props?.id}
								className={index !== activeItemIndex ? 'd-none' : undefined}>
								{child?.props.title || getTitleName(index)}
							</CardTitle>
						))}
					</CardLabel>
					{isHeader === 'withButton' && (
						<CardActions>
							{prevBtn}
							{nextBtn}
						</CardActions>
					)}
				</CardHeader>
			)}
			<CardBody isScrollable={!!stretch}>
				<div className='wizard-progress position-relative'>
					<div className='progress'>
						<div
							className={classNames('progress-bar', {
								[`bg-${color}`]: color !== 'primary',
							})}
							role='progressbar'
							style={{ width: `${(100 / (childCount - 1)) * activeItemIndex}%` }}
							aria-valuenow={(100 / (childCount - 1)) * activeItemIndex}
							aria-valuemin={0}
							aria-valuemax={100}
							aria-label='progress'
						/>
					</div>
					{Children.map(children, (child, index) => (
						<Popovers
							key={child.props.id}
							desc={child.props.title || getTitleName(index)}
							trigger='hover'>
							<button
								type='button'
								className={classNames(
									'wizard-progress-btn',
									'position-absolute p-0 top-0',
									'translate-middle',
									'btn btn-sm',
									{
										[`btn-${color}`]: activeItemIndex >= index,
										[`btn-${themeStatus}`]: activeItemIndex < index,
									},
									'rounded-pill',
								)}
								style={{
									left: `${(100 / (childCount - 1)) * index}%`,
								}}
								onClick={() => setActiveItemIndex(index)}>
								{index + 1}
							</button>
						</Popovers>
					))}
				</div>

				<div className='wizard'>
					{Children.map(children, (child, index) =>
						cloneElement(child as unknown as ReactElement, {
							className: index !== activeItemIndex ? 'd-none' : '',
							'aria-hidden': index !== activeItemIndex,
						}),
					)}
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterLeft>{prevBtn}</CardFooterLeft>
				<CardFooterRight>{nextBtn}</CardFooterRight>
			</CardFooter>
		</Card>
	);
};
Wizard.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
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
	]),
	// @ts-ignore
	isHeader: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['withButton'])]),
	onSubmit: PropTypes.func.isRequired,
	// @ts-ignore
	stretch: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['full', 'semi'])]),
};
Wizard.defaultProps = {
	isHeader: false,
	color: 'primary',
	stretch: undefined,
};

export default Wizard;
