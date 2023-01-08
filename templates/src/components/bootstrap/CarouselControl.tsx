import React, { FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

interface ICarouselControlProps {
	id?: string;
	direction: 'prev' | 'next';
	onClickHandler(...args: unknown[]): unknown;
	directionText?: string;
	className?: string;
}
const CarouselControl: FC<ICarouselControlProps> = (props) => {
	const { id, direction, onClickHandler, directionText, className } = props;

	return (
		<button
			className={classNames(className, `carousel-control-${direction}`)}
			type='button'
			data-bs-target={id || 'carousel'}
			data-bs-slide={direction}
			onClick={(e) => {
				e.preventDefault();
				onClickHandler();
			}}>
			<span className={classNames(`carousel-control-${direction}-icon`)} aria-hidden='true' />
			<span className={classNames('visually-hidden')}>{directionText || direction}</span>
		</button>
	);
};
CarouselControl.propTypes = {
	id: PropTypes.string,
	// @ts-ignore
	direction: PropTypes.oneOf(['prev', 'next']).isRequired,
	onClickHandler: PropTypes.func.isRequired,
	directionText: PropTypes.string,
	className: PropTypes.string,
};
CarouselControl.defaultProps = {
	id: undefined,
	directionText: undefined,
	className: undefined,
};

export default CarouselControl;
