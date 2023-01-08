import React, {
	forwardRef,
	FC,
	ReactNode,
	useContext,
	useLayoutEffect,
	useRef,
	ReactElement,
	HTMLAttributes,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '../../layouts/Portal/Portal';
import TagWrapper from '../TagWrapper';
import useEventListener from '../../hooks/useEventListener';
import ThemeContext from '../../contexts/themeContext';
import useDeviceScreen from '../../hooks/useDeviceScreen';
import { TOffCanvasPlacement } from '../../type/offCanvas-type';

interface IOffCanvasTitleProps extends HTMLAttributes<HTMLElement> {
	id: string;
	children: ReactNode;
	className?: string;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
}
export const OffCanvasTitle = forwardRef<HTMLHeadingElement, IOffCanvasTitleProps>(
	({ tag, id, children, className, ...props }, ref) => {
		return (
			<TagWrapper
				tag={tag}
				ref={ref}
				id={id}
				className={classNames('offcanvas-title', className)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
OffCanvasTitle.displayName = 'OffCanvasTitle';
OffCanvasTitle.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span']),
};
OffCanvasTitle.defaultProps = {
	className: undefined,
	tag: 'h5',
};

interface IOffCanvasHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactElement<IOffCanvasTitleProps> | ReactNode;
	className?: string;
	setOpen?(...args: unknown[]): unknown | undefined;
}
export const OffCanvasHeader = forwardRef<HTMLDivElement, IOffCanvasHeaderProps>(
	({ children, className, setOpen, ...props }, ref) => {
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div ref={ref} className={classNames('offcanvas-header', className)} {...props}>
				{children}
				{setOpen && (
					<button
						type='button'
						className='btn-close text-reset'
						data-bs-dismiss='offcanvas'
						aria-label='Close'
						onClick={() => setOpen(false)}
					/>
				)}
			</div>
		);
	},
);
OffCanvasHeader.displayName = 'OffCanvasHeader';
OffCanvasHeader.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	setOpen: PropTypes.func,
};
OffCanvasHeader.defaultProps = {
	className: undefined,
	setOpen: undefined,
};

interface IOffCanvasBodyProps extends HTMLAttributes<HTMLElement> {
	tag?: 'div' | 'span' | 'section' | 'form';
	children: ReactNode;
	className?: string;
	onSubmit?(...args: unknown[]): unknown;
}
export const OffCanvasBody = forwardRef<HTMLDivElement, IOffCanvasBodyProps>(
	({ tag, children, className, ...props }, ref) => {
		return (
			<TagWrapper
				tag={tag}
				ref={ref}
				className={classNames('offcanvas-body', className)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
OffCanvasBody.displayName = 'OffCanvasBody';
OffCanvasBody.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.oneOf(['div', 'span', 'section', 'form']),
};
OffCanvasBody.defaultProps = {
	className: undefined,
	tag: 'div',
};

interface IOffCanvasProps extends HTMLAttributes<HTMLElement> {
	id?: string;
	children:
		| ReactElement<IOffCanvasHeaderProps>
		| ReactElement<IOffCanvasHeaderProps>[]
		| ReactElement<IOffCanvasBodyProps>
		| ReactElement<IOffCanvasBodyProps>[]
		| ReactNode
		| ReactNode[];
	placement?: TOffCanvasPlacement;
	titleId?: string | null;
	isOpen: boolean;
	setOpen(...args: unknown[]): unknown;
	isBodyScroll?: boolean;
	isBackdrop?: boolean;
	isModalStyle?: boolean;
	isRightPanel?: boolean;
	tag?: 'div' | 'section' | 'form';
	onSubmit?(...args: unknown[]): unknown;
	noValidate?: true;
}
const OffCanvas: FC<IOffCanvasProps> = ({
	id,
	titleId,
	children,
	placement,
	isBodyScroll,
	isBackdrop,
	isModalStyle,
	isOpen,
	setOpen,
	isRightPanel,
	tag: Tag,
	...props
}) => {
	const initialProps = {
		isBackdrop: isRightPanel ? false : isBackdrop,
		isBodyScroll: isRightPanel ? true : isBodyScroll,
		placement: isRightPanel ? 'end' : placement,
	};

	// @ts-ignore
	const { setRightPanel } = useContext(ThemeContext);
	const deviceScreen = useDeviceScreen();

	useLayoutEffect(() => {
		// @ts-ignore
		setRightPanel(isRightPanel && deviceScreen?.width > 1200 && isOpen);
	});

	const ref = useRef(null);

	// Disable Body Scroll
	useLayoutEffect(() => {
		if (!initialProps.isBodyScroll && isOpen) {
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = '0px';
		}
		return () => {
			document.body.style.overflow = 'auto';
			document.body.style.removeProperty('padding-right');
		};
	});

	// Backdrop close function
	const closeCanvas = (event: { target: any }) => {
		// @ts-ignore
		if (ref.current && !ref.current.contains(event.target) && !isRightPanel && isBackdrop) {
			setOpen(false);
		}
	};
	useEventListener('mousedown', closeCanvas);
	useEventListener('touchstart', closeCanvas);

	const PLACEMENT_ANIMATION = (initialProps.placement === 'start' && { x: '-100%' }) ||
		(initialProps.placement === 'top' && { y: '-100%' }) ||
		(initialProps.placement === 'bottom' && { y: '100%' }) || { x: '100%' };

	// @ts-ignore
	const MotionTagWrapper = motion[Tag];

	return (
		<Portal>
			<AnimatePresence exitBeforeEnter>
				{isOpen && (
					<>
						<MotionTagWrapper
							ref={ref}
							key='offCanvas'
							initial={{ opacity: 0, ...PLACEMENT_ANIMATION }}
							animate={{ opacity: 1, x: '0%', y: '0%' }}
							exit={{ opacity: 0, ...PLACEMENT_ANIMATION }}
							transition={{ ease: 'easeInOut', duration: 0.3 }}
							id={id}
							className={classNames(
								'offcanvas',
								`offcanvas-${initialProps.placement}`,
								{
									show: isOpen,
									'offcanvas-modal-style': isModalStyle,
									'offcanvas-right-panel':
										// @ts-ignore
										isRightPanel && deviceScreen?.width > 1200,
								},
							)}
							tabIndex='-1'
							aria-labelledby={titleId}
							data-bs-scroll={initialProps.isBodyScroll}
							data-bs-backdrop={initialProps.isBackdrop}
							style={{ visibility: isOpen && 'visible' }}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...props}>
							{children}
						</MotionTagWrapper>
						{initialProps.isBackdrop && (
							<div className={classNames('offcanvas-backdrop', 'fade', 'show')} />
						)}
					</>
				)}
			</AnimatePresence>
		</Portal>
	);
};
OffCanvas.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node.isRequired,
	placement: PropTypes.oneOf(['start', 'top', 'end', 'bottom']),
	titleId: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	isBodyScroll: PropTypes.bool,
	isBackdrop: PropTypes.bool,
	isModalStyle: PropTypes.bool,
	isRightPanel: PropTypes.bool,
	tag: PropTypes.oneOf(['div', 'section', 'form']),
};
OffCanvas.defaultProps = {
	id: undefined,
	placement: 'end',
	titleId: null,
	isBodyScroll: false,
	isBackdrop: true,
	isModalStyle: false,
	isRightPanel: false,
	tag: 'div',
};

export default OffCanvas;
