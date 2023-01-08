import React, {
	Children,
	cloneElement,
	ElementType,
	forwardRef,
	ReactElement,
	ReactNode,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import TagWrapper from '../TagWrapper';
import Collapse from './Collapse';
import { TColor } from '../../type/color-type';
import { TIcons } from '../../type/icons-type';

type TActiveItemId = string | number | boolean | null;

interface IAccordionItemProps {
	id: string | number;
	icon?: TIcons;
	title: string;
	children: ReactNode;
	tag?: ElementType;
	headerTag?: ElementType;
	overWriteColor?: null | TColor;
	parentId?: string | number | null;
	activeItem?: TActiveItemId;
	setActiveItem?: any;
}
export const AccordionItem = forwardRef<HTMLDivElement, IAccordionItemProps>(
	({ id, icon, title, children, tag, headerTag, overWriteColor, ...props }, ref) => {
		// eslint-disable-next-line react/prop-types
		const ACTIVE = props.activeItem === id;

		return (
			<TagWrapper tag={tag} ref={ref} className={classNames('accordion-item')}>
				<TagWrapper tag={headerTag} className={classNames('accordion-header')} id={id}>
					<button
						className={classNames('accordion-button', {
							collapsed: !ACTIVE,
							[`accordion-button-${overWriteColor}`]: overWriteColor,
						})}
						type='button'
						data-bs-toggle='collapse'
						data-bs-target={`#${id}Collapse`}
						aria-expanded={ACTIVE}
						aria-controls={`${id}Collapse`}
						onClick={() =>
							// eslint-disable-next-line react/prop-types
							ACTIVE ? props.setActiveItem(null) : props.setActiveItem(id)
						}>
						{icon && <Icon icon={icon} className='accordion-icon' />}
						{title}
					</button>
				</TagWrapper>
				<Collapse
					isOpen={ACTIVE}
					id={`${id}Collapse`}
					className={classNames('accordion-collapse')}
					aria-labelledby={id}
					data-bs-parent={`#${props.parentId}`}>
					<div className={classNames('accordion-body')}>{children}</div>
				</Collapse>
			</TagWrapper>
		);
	},
);
AccordionItem.displayName = 'AccordionItem';
AccordionItem.propTypes = {
	/**
	 * Unique ID
	 */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/**
	 * Automatically added
	 */
	parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/**
	 * Item title
	 */
	title: PropTypes.string.isRequired,
	/**
	 * Item Content
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Item title icon
	 */
	icon: PropTypes.string,
	tag: PropTypes.oneOf(['div', 'section']),
	headerTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'section']),
	/**
	 * If you have chosen color from the accordion's own properties, you can overwrite it with this.
	 */
	overWriteColor: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
};
AccordionItem.defaultProps = {
	parentId: null,
	icon: undefined,
	tag: 'div',
	headerTag: 'h2',
	overWriteColor: null,
};

interface IAccordionProps {
	tag?: 'div' | 'section';
	id: string | number;
	activeItemId?: TActiveItemId;
	children: ReactElement<IAccordionItemProps> | ReactElement<IAccordionItemProps>[] | Array<any>;
	shadow?: null | 'none' | 'sm' | 'default' | 'lg';
	color?: TColor;
	isFlush?: boolean;
	className?: string;
}
const Accordion = forwardRef<HTMLDivElement | HTMLTableSectionElement, IAccordionProps>(
	({ tag, id, activeItemId, children, shadow, color, isFlush, className }, ref) => {
		const [activeItem, setActiveItem] = useState<TActiveItemId>(
			activeItemId === false
				? null
				: activeItemId || (Array.isArray(children) && children?.flat()[0].props.id),
		);

		return (
			<TagWrapper
				tag={tag}
				ref={ref}
				className={classNames(
					'accordion',
					{
						'accordion-flush': isFlush,
						'shadow-none': isFlush,
						[`shadow${shadow !== 'default' ? `-${shadow}` : ''}`]: !!shadow,
					},
					className,
				)}
				id={id}>
				{Children.map(children, (child) =>
					// @ts-ignore
					['AccordionItem'].includes(child?.type?.displayName) ? (
						cloneElement(child as unknown as ReactElement<any>, {
							activeItem,
							setActiveItem,
							parentId: id,
							overWriteColor: child?.props?.overWriteColor || color,
						})
					) : (
						<code className='d-block'>
							Only AccordionItem component should be used as a child.
						</code>
					),
				)}
			</TagWrapper>
		);
	},
);
Accordion.displayName = 'Accordion';
Accordion.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/**
	 * By default, the first is enabled, you can enter the AcordionItem ID you want and make it appear active.
	 * If you don't want any of them to be active, you can give it "false".
	 */
	activeItemId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
	// @ts-ignore
	children: PropTypes.node.isRequired,
	/**
	 * If checked true the shadow is cleared.
	 */
	isFlush: PropTypes.bool,
	className: PropTypes.string,
	tag: PropTypes.oneOf(['div', 'section']),
	shadow: PropTypes.oneOf([null, 'none', 'sm', 'default', 'lg']),
	/**
	 * Active item color
	 */
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
};
Accordion.defaultProps = {
	activeItemId: null,
	isFlush: false,
	className: undefined,
	tag: 'div',
	shadow: 'default',
	color: 'primary',
};

export default Accordion;
