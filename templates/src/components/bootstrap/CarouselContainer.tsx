import React, { Component, cloneElement, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CarouselItem from './CarouselItem';

const SWIPE_THRESHOLD = 40;

type TCarouselContainerProps = {
	activeIndex?: number;
	next?(...args: unknown[]): unknown;
	previous?(...args: unknown[]): unknown;
	keyboard?: boolean;
	pause?: 'hover' | false;
	ride?: 'carousel';
	interval?: number | string | boolean;
	children?: any[];
	mouseEnter?(...args: unknown[]): unknown;
	mouseLeave?(...args: unknown[]): unknown;
	slide?: boolean;
	dark?: boolean;
	id?: string;
	className?: string;
	enableTouch?: boolean;
	fade?: boolean;
	rounded?: 0 | 1 | 2 | 3;
	isFluid?: boolean;
	hasChildren?: boolean;
	height?: number;
	innerRef?: any;
} & HTMLAttributes<HTMLDivElement>;
type TCarouselContainerState = {
	activeIndex?: number;
	direction?: string;
	indicatorClicked?: boolean;
};
class CarouselContainer extends Component<TCarouselContainerProps, TCarouselContainerState> {
	private touchStartX: number;

	private touchStartY: number;

	private cycleInterval: NodeJS.Timer | undefined;

	constructor(props: TCarouselContainerProps | Readonly<TCarouselContainerProps>) {
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.hoverStart = this.hoverStart.bind(this);
		this.hoverEnd = this.hoverEnd.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.touchStartX = 0;
		this.touchStartY = 0;
		this.state = {
			// eslint-disable-next-line react/destructuring-assignment
			activeIndex: this.props.activeIndex,
			direction: 'end',
			indicatorClicked: false,
		};
	}

	getChildContext() {
		// eslint-disable-next-line react/destructuring-assignment
		return { direction: this.state.direction };
	}

	componentDidMount() {
		// Set up the cycle
		// eslint-disable-next-line react/destructuring-assignment
		if (this.props.ride === 'carousel') {
			this.setInterval();
		}

		document.addEventListener('keyup', this.handleKeyPress);
	}

	static getDerivedStateFromProps(
		nextProps: { activeIndex: number },
		prevState: { activeIndex: any; direction: any; indicatorClicked: any },
	) {
		let newState = null;
		// eslint-disable-next-line prefer-const
		let { activeIndex, direction, indicatorClicked } = prevState;

		if (nextProps.activeIndex !== activeIndex) {
			// Calculate the direction to turn
			if (nextProps.activeIndex === activeIndex + 1) {
				direction = 'end';
			} else if (nextProps.activeIndex === activeIndex - 1) {
				direction = 'start';
			} else if (nextProps.activeIndex < activeIndex) {
				direction = indicatorClicked ? 'start' : 'end';
			} else if (nextProps.activeIndex !== activeIndex) {
				direction = indicatorClicked ? 'end' : 'start';
			}

			newState = {
				activeIndex: nextProps.activeIndex,
				direction,
				indicatorClicked: false,
			};
		}

		return newState;
	}

	componentDidUpdate(prevProps: any, prevState: { activeIndex: number | undefined }) {
		// eslint-disable-next-line react/destructuring-assignment
		if (prevState.activeIndex === this.state.activeIndex) return;
		this.setInterval(this.props);
	}

	componentWillUnmount() {
		this.clearInterval();
		document.removeEventListener('keyup', this.handleKeyPress);
	}

	setInterval(props = this.props) {
		// make sure not to have multiple intervals going...
		this.clearInterval();
		if (props.interval) {
			this.cycleInterval = setInterval(() => {
				// @ts-ignore
				props.next();
			}, parseInt(props.interval as string, 10));
		}
	}

	clearInterval() {
		clearInterval(this.cycleInterval);
	}

	hoverStart(...args: any[]) {
		// eslint-disable-next-line react/destructuring-assignment
		if (this.props.pause === 'hover') {
			this.clearInterval();
		}
		// eslint-disable-next-line react/destructuring-assignment
		if (this.props.mouseEnter) {
			// eslint-disable-next-line react/destructuring-assignment
			this.props.mouseEnter(...args);
		}
	}

	hoverEnd(...args: any[]) {
		// eslint-disable-next-line react/destructuring-assignment
		if (this.props.pause === 'hover') {
			this.setInterval();
		}
		// eslint-disable-next-line react/destructuring-assignment
		if (this.props.mouseLeave) {
			// eslint-disable-next-line react/destructuring-assignment
			this.props.mouseLeave(...args);
		}
	}

	// eslint-disable-next-line react/sort-comp
	handleKeyPress(evt: { keyCode: number }) {
		// eslint-disable-next-line react/destructuring-assignment
		if (this.props.keyboard) {
			if (evt.keyCode === 37) {
				// eslint-disable-next-line react/destructuring-assignment
				// @ts-ignore
				this.props.previous();
			} else if (evt.keyCode === 39) {
				// eslint-disable-next-line react/destructuring-assignment
				// @ts-ignore
				this.props.next();
			}
		}
	}

	handleTouchStart(e: { changedTouches: { screenX: number; screenY: number }[] }) {
		// eslint-disable-next-line react/destructuring-assignment
		if (!this.props.enableTouch) {
			return;
		}
		this.touchStartX = e.changedTouches[0].screenX;
		this.touchStartY = e.changedTouches[0].screenY;
	}

	handleTouchEnd(e: { changedTouches: { screenX: number; screenY: any }[] }) {
		// eslint-disable-next-line react/destructuring-assignment
		if (!this.props.enableTouch) {
			return;
		}

		const currentX = e.changedTouches[0].screenX;
		const currentY = e.changedTouches[0].screenY;
		const diffX = Math.abs(this.touchStartX - currentX);
		const diffY = Math.abs(this.touchStartY - currentY);

		// Don't swipe if Y-movement is bigger than X-movement
		if (diffX < diffY) {
			return;
		}

		if (diffX < SWIPE_THRESHOLD) {
			return;
		}

		if (currentX < this.touchStartX) {
			// eslint-disable-next-line react/destructuring-assignment
			// @ts-ignore
			this.props.next();
		} else {
			// eslint-disable-next-line react/destructuring-assignment
			// @ts-ignore
			this.props.previous();
		}
	}

	renderItems(carouselItems: unknown[], className: string | undefined) {
		const { slide } = this.props;
		return (
			<div className={className}>
				{carouselItems.map((item, index) => {
					// eslint-disable-next-line react/destructuring-assignment
					const isIn = index === this.state.activeIndex;
					// @ts-ignore
					return cloneElement(item, {
						in: isIn,
						slide,
					});
				})}
			</div>
		);
	}

	render() {
		const { id, slide, className, dark, fade, rounded, isFluid, hasChildren, height } =
			this.props;
		const outerClasses = classNames(className, 'carousel', {
			'carousel-fade': fade,
			slide,
			'carousel-dark': dark,
			'h-100': isFluid && !hasChildren,
		});

		const innerClasses = classNames('carousel-inner', {
			[`rounded-${rounded}`]: rounded || rounded === 0,
			'h-100': isFluid || hasChildren,
		});

		// filter out booleans, null, or undefined
		// eslint-disable-next-line react/destructuring-assignment
		const children = this.props?.children?.filter(
			(child) => child !== null && child !== undefined && typeof child !== 'boolean',
		);

		// @ts-ignore
		const slidesOnly = children?.every((child) => child?.type === CarouselItem);

		// Rendering only slides
		if (slidesOnly && children) {
			return (
				<div
					style={{ height }}
					className={outerClasses}
					onMouseEnter={this.hoverStart}
					onMouseLeave={this.hoverEnd}>
					{this.renderItems(children, innerClasses)}
				</div>
			);
		}

		// Rendering slides and controls
		if (children && children[0] instanceof Array) {
			const carouselItems = children[0];
			const controlLeft = children[1];
			const controlRight = children[2];

			return (
				// @ts-ignore
				<div
					style={{ height }}
					className={outerClasses}
					onMouseEnter={this.hoverStart}
					onMouseLeave={this.hoverEnd}>
					{this.renderItems(carouselItems, innerClasses)}
					{controlLeft}
					{controlRight}
				</div>
			);
		}

		// Rendering indicators, slides and controls
		const indicators = children && children[0];
		const wrappedOnClick = (e: any) => {
			// @ts-ignore
			if (typeof indicators.props.onClickHandler === 'function') {
				// @ts-ignore
				this.setState({ indicatorClicked: true }, () => indicators.props.onClickHandler(e));
			}
		};
		// @ts-ignore
		const wrappedIndicators = cloneElement(indicators, {
			onClickHandler: wrappedOnClick,
		});
		// @ts-ignore
		const carouselItems = children[1];
		// @ts-ignore
		const controlLeft = children[2];
		// @ts-ignore
		const controlRight = children[3];

		return (
			// @ts-ignore
			<div
				// eslint-disable-next-line react/destructuring-assignment,react/prop-types
				ref={this.props.innerRef}
				id={id}
				className={outerClasses}
				style={{ height }}
				// eslint-disable-next-line react/destructuring-assignment
				data-bs-ride={this.props.ride === 'carousel' ? 'carousel' : null}
				// eslint-disable-next-line react/destructuring-assignment
				data-bs-touch={!this.props.enableTouch ? 'false' : null}
				onMouseEnter={this.hoverStart}
				onMouseLeave={this.hoverEnd}
				// @ts-ignore
				onTouchStart={this.handleTouchStart}
				// @ts-ignore
				onTouchEnd={this.handleTouchEnd}>
				{wrappedIndicators}
				{/* @ts-ignore */}
				{this.renderItems(carouselItems, innerClasses)}
				{controlLeft}
				{controlRight}
			</div>
		);
	}
}
// @ts-ignore
CarouselContainer.propTypes = {
	// eslint-disable-next-line react/require-default-props
	activeIndex: PropTypes.number,
	// a function which should advance the carousel to the next slide (via activeIndex)
	next: PropTypes.func.isRequired,
	// a function which should advance the carousel to the previous slide (via activeIndex)
	previous: PropTypes.func.isRequired,
	keyboard: PropTypes.bool,
	pause: PropTypes.oneOf(['hover', false]),
	// This is how bootstrap defines it... I would prefer a bool named autoplay or something...
	// eslint-disable-next-line react/require-default-props
	ride: PropTypes.oneOf(['carousel']),
	// eslint-disable-next-line react/no-unused-prop-types
	interval: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
	// eslint-disable-next-line react/forbid-prop-types,react/require-default-props
	children: PropTypes.array,
	mouseEnter: PropTypes.func,
	mouseLeave: PropTypes.func,
	slide: PropTypes.bool,
	dark: PropTypes.bool,
	id: PropTypes.string,
	className: PropTypes.string,
	enableTouch: PropTypes.bool,
	fade: PropTypes.bool,
	rounded: PropTypes.oneOf([0, 1, 2, 3]),
	isFluid: PropTypes.bool,
	hasChildren: PropTypes.bool,
	height: PropTypes.number,
};
// @ts-ignore
CarouselContainer.defaultProps = {
	interval: 5000,
	pause: 'hover',
	keyboard: true,
	slide: true,
	enableTouch: true,
	// eslint-disable-next-line react/default-props-match-prop-types
	fade: false,
	id: null,
	className: undefined,
	mouseEnter: null,
	mouseLeave: null,
	dark: false,
	rounded: null,
	isFluid: false,
	hasChildren: false,
	height: null,
};
// @ts-ignore
CarouselContainer.childContextTypes = {
	direction: PropTypes.string,
};

export default React.forwardRef<HTMLDivElement, TCarouselContainerProps>((props, ref) => (
	// eslint-disable-next-line react/jsx-props-no-spreading
	<CarouselContainer innerRef={ref} {...props} />
));
