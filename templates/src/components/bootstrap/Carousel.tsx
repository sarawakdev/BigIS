import React, { forwardRef, ReactNode, SetStateAction, useState } from 'react';
import PropTypes from 'prop-types';
import CarouselIndicators from './CarouselIndicators';
import CarouselControl from './CarouselControl';
import CarouselContainer from './CarouselContainer';
import CarouselItem from './CarouselItem';
import CarouselCaption from './CarouselCaption';
import { TCarouselRounded } from '../../type/carousel-type';

interface ICarouselProps {
	id?: string;
	items?: {
		src?: string;
		altText?: string;
		captionHeader?: string;
		captionText?: string;
	}[];
	children?: ReactNode;
	activeItemIndex?: number;
	isKeyboardControl?: boolean;
	isHoverPause?: boolean;
	isRide?: boolean;
	interval?: number | string | boolean;
	mouseEnter?(...args: unknown[]): unknown;
	mouseLeave?(...args: unknown[]): unknown;
	isSlide?: boolean;
	isDark?: boolean;
	className?: string;
	isEnableTouch?: boolean;
	isFade?: boolean;
	isIndicators?: boolean;
	isControl?: boolean;
	rounded?: TCarouselRounded;
	isFluid?: boolean;
	height?: number;
}
const Carousel = forwardRef<HTMLDivElement, ICarouselProps>(
	(
		{
			id,
			items,
			children,
			activeItemIndex,
			className,
			isKeyboardControl,
			isHoverPause,
			isRide,
			interval,
			mouseEnter,
			mouseLeave,
			isSlide,
			isDark,
			isEnableTouch,
			isFade,
			isIndicators,
			isControl,
			rounded,
			isFluid,
			height,
		},
		ref,
	) => {
		const ITEMS = items || children;
		const [activeIndex, setActiveIndex] = useState<number | undefined>(activeItemIndex);
		const [animating, setAnimating] = useState(false);

		const next = () => {
			if (animating) return;
			// @ts-ignore
			const nextIndex = activeIndex === ITEMS?.length - 1 ? 0 : activeIndex + 1;
			setActiveIndex(nextIndex);
		};

		const previous = () => {
			if (animating) return;
			// @ts-ignore
			const nextIndex = activeIndex === 0 ? ITEMS.length - 1 : activeIndex - 1;
			setActiveIndex(nextIndex);
		};

		const goToIndex = (newIndex: SetStateAction<number | undefined>) => {
			if (animating) return;
			setActiveIndex(newIndex);
		};

		const getSlideContent = (_item: {
			src?: string;
			altText?: string;
			captionHeader?: string;
			captionText?: string;
		}) => {
			if (items) {
				if (isFluid) {
					return (
						<>
							<div
								className='carousel-slide h-100'
								style={{
									backgroundImage: `url(${_item.src})`,
								}}
							/>
							<CarouselCaption
								captionText={_item.captionText}
								captionHeader={_item.captionHeader}
							/>
						</>
					);
				}
				return (
					<>
						<img src={_item.src} alt={_item.altText} className='d-block w-100' />
						<CarouselCaption
							captionText={_item.captionText}
							captionHeader={_item.captionHeader}
						/>
					</>
				);
			}
			return _item;
		};

		return (
			<CarouselContainer
				ref={ref}
				id={id}
				activeIndex={activeIndex}
				next={next}
				previous={previous}
				keyboard={isKeyboardControl}
				pause={isHoverPause ? 'hover' : false}
				ride={isRide ? 'carousel' : undefined}
				interval={interval}
				mouseEnter={mouseEnter}
				mouseLeave={mouseLeave}
				slide={isSlide || isFade}
				dark={isDark}
				className={className}
				isFluid={isFluid}
				hasChildren={!!children}
				height={height}
				enableTouch={isEnableTouch}
				fade={isFade}
				rounded={rounded}>
				{isIndicators && (
					<CarouselIndicators
						id={id}
						items={ITEMS}
						activeIndex={activeIndex}
						onClickHandler={goToIndex}
					/>
				)}
				{Array.isArray(ITEMS) &&
					ITEMS?.map((item, index) => {
						return (
							<CarouselItem
								onExiting={() => setAnimating(true)}
								onExited={() => setAnimating(false)}
								key={index}
								isFluid={isFluid || !!children}>
								{/* @ts-ignore */}
								{getSlideContent(item)}
							</CarouselItem>
						);
					})}
				{isControl && (
					<>
						<CarouselControl
							id={id}
							direction='prev'
							directionText='Previous'
							onClickHandler={previous}
						/>
						<CarouselControl
							id={id}
							direction='next'
							directionText='Next'
							onClickHandler={next}
						/>
					</>
				)}
			</CarouselContainer>
		);
	},
);
Carousel.displayName = 'Carousels';
Carousel.propTypes = {
	id: PropTypes.string,
	// @ts-ignore
	items: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string,
			altText: PropTypes.string,
			captionHeader: PropTypes.string,
			captionText: PropTypes.string,
		}),
	),
	children: PropTypes.node,
	/**
	 * The current active slide of the carousel
	 */
	activeItemIndex: PropTypes.number,
	/**
	 * Controls if the left and right arrow keys should control the carousel
	 */
	isKeyboardControl: PropTypes.bool,
	/**
	 * If its value is set to "true", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on
	 * mouseleave. If set to false, hovering over the carousel won't pause it.
	 */
	isHoverPause: PropTypes.bool,
	/**
	 * Autoplays the carousel after the user manually cycles the first item. If its value is set to "true", autoplays the carousel on load.
	 */
	isRide: PropTypes.bool,
	/**
	 * The interval at which the carousel automatically cycles
	 */
	interval: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
	/**
	 * Called when the mouse enters the Carousel
	 */
	mouseEnter: PropTypes.func,
	/**
	 * Called when the mouse exits the Carousel
	 */
	mouseLeave: PropTypes.func,
	/**
	 * Controls whether the slide animation on the Carousel works or not
	 */
	isSlide: PropTypes.bool,
	/**
	 * Make the controls, indicators and captions dark on the Carousel
	 */
	isDark: PropTypes.bool,
	className: PropTypes.string,
	isEnableTouch: PropTypes.bool,
	isFade: PropTypes.bool,
	isIndicators: PropTypes.bool,
	isControl: PropTypes.bool,
	// @ts-ignore
	rounded: PropTypes.oneOf([0, 1, 2, 3]),
	isFluid: PropTypes.bool,
	height: PropTypes.number,
};
Carousel.defaultProps = {
	id: undefined,
	items: undefined,
	children: null,
	activeItemIndex: 0,
	isKeyboardControl: false,
	isHoverPause: false,
	isRide: true,
	interval: 5000,
	mouseEnter: undefined,
	mouseLeave: undefined,
	isSlide: true,
	isDark: false,
	className: undefined,
	isEnableTouch: true,
	isFade: false,
	isIndicators: true,
	isControl: true,
	rounded: undefined,
	isFluid: false,
	height: undefined,
};

export default Carousel;
