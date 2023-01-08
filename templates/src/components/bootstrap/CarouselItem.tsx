import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { TransitionTimeouts, TransitionStatuses, tagPropType } from './utils';

type TCarouselItemProps = {
	tag?: string;
	in?: boolean;
	children?: ReactNode;
	slide?: boolean;
	className?: string;
	isFluid?: boolean;
	onEnter(...args: unknown[]): unknown;
	onEntering(...args: unknown[]): unknown;
	onExit(...args: unknown[]): unknown;
	onExiting(...args: unknown[]): unknown;
	onExited(...args: unknown[]): unknown;
};
type TCarouselItemState = {
	startAnimation: boolean;
};
class CarouselItem extends Component<TCarouselItemProps, TCarouselItemState> {
	constructor(props: TCarouselItemProps | Readonly<TCarouselItemProps>) {
		super(props);

		this.state = {
			startAnimation: false,
		};

		this.onEnter = this.onEnter.bind(this);
		this.onEntering = this.onEntering.bind(this);
		this.onExit = this.onExit.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}

	onEnter(node: any, isAppearing: any) {
		this.setState({ startAnimation: false });
		// eslint-disable-next-line react/destructuring-assignment
		this.props.onEnter(node, isAppearing);
	}

	onEntering(node: { offsetHeight: any }, isAppearing: any) {
		// getting this variable triggers a reflow
		const { offsetHeight } = node;
		this.setState({ startAnimation: true });
		// eslint-disable-next-line react/destructuring-assignment
		this.props.onEntering(node, isAppearing);
		return offsetHeight;
	}

	onExit(node: any) {
		this.setState({ startAnimation: false });
		// eslint-disable-next-line react/destructuring-assignment
		this.props.onExit(node);
	}

	onExiting(node: { dispatchEvent: (arg0: CustomEvent<unknown>) => void }) {
		this.setState({ startAnimation: true });
		node.dispatchEvent(new CustomEvent('slide.bs.carousel'));
		// eslint-disable-next-line react/destructuring-assignment
		this.props.onExiting(node);
	}

	onExited(node: { dispatchEvent: (arg0: CustomEvent<unknown>) => void }) {
		node.dispatchEvent(new CustomEvent('slid.bs.carousel'));
		// eslint-disable-next-line react/destructuring-assignment
		this.props.onExited(node);
	}

	render() {
		const {
			in: isIn,
			children,
			slide,
			tag: Tag,
			className,
			isFluid,
			...transitionProps
		} = this.props;

		return (
			// @ts-ignore
			<Transition
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...transitionProps}
				enter={slide}
				exit={slide}
				in={isIn}
				onEnter={this.onEnter}
				onEntering={this.onEntering}
				onExit={this.onExit}
				onExiting={this.onExiting}
				onExited={this.onExited}>
				{(status) => {
					// @ts-ignore
					const { direction } = this.context;
					const isActive =
						status === TransitionStatuses.ENTERED ||
						status === TransitionStatuses.EXITING;
					const directionClassName =
						(status === TransitionStatuses.ENTERING ||
							status === TransitionStatuses.EXITING) &&
						// eslint-disable-next-line react/destructuring-assignment
						this.state.startAnimation &&
						(direction === 'end' ? 'carousel-item-start' : 'carousel-item-end');
					const orderClassName =
						status === TransitionStatuses.ENTERING &&
						(direction === 'end' ? 'carousel-item-next' : 'carousel-item-prev');
					const itemClasses = classNames(
						className,
						'carousel-item',
						isActive && 'active',
						directionClassName,
						orderClassName,
						{ 'h-100': isFluid },
					);

					// @ts-ignore
					return <Tag className={itemClasses}>{children}</Tag>;
				}}
			</Transition>
		);
	}
}
// @ts-ignore
CarouselItem.propTypes = {
	// @ts-ignore
	...Transition.propTypes,
	tag: tagPropType,
	in: PropTypes.bool,
	children: PropTypes.node,
	slide: PropTypes.bool,
	className: PropTypes.string,
	isFluid: PropTypes.bool,
};
// @ts-ignore
CarouselItem.defaultProps = {
	// @ts-ignore
	...Transition.defaultProps,
	tag: 'div',
	timeout: TransitionTimeouts.Carousel,
	slide: true,
	isFluid: false,
};
// @ts-ignore
CarouselItem.contextTypes = {
	direction: PropTypes.string,
};

export default CarouselItem;
