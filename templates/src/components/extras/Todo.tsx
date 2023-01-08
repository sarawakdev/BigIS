import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Checks from '../bootstrap/forms/Checks';
import Badge from '../bootstrap/Badge';
import Button from '../bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';
import useDarkMode from '../../hooks/useDarkMode';
import { TColor } from '../../type/color-type';

/**
 * Prop Types
 * @type {{list: Requireable<(InferPropsInner<Pick<{date: Requireable<object>, badge: Requireable<InferProps<{color: Requireable<string>, text: Requireable<string>}>>, id: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, title: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, status: Requireable<boolean>}, never>> & Partial<InferPropsInner<Pick<{date: Requireable<object>, badge: Requireable<InferProps<{color: Requireable<string>, text: Requireable<string>}>>, id: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, title: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, status: Requireable<boolean>}, "date" | "badge" | "id" | "title" | "status">>>)[]>}}
 */
const TodoPropTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			status: PropTypes.bool,
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			// eslint-disable-next-line react/forbid-prop-types
			date: PropTypes.object,
			badge: PropTypes.shape({
				text: PropTypes.string,
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
			}),
		}),
	),
};

export interface ITodoListItem {
	id?: string | number;
	status?: boolean;
	title?: string | number;
	date?: object;
	badge?: {
		text?: string;
		color?: TColor;
	};
}

interface ITodoItemProps {
	list: ITodoListItem[];
	setList(...args: unknown[]): unknown;
	index: number;
}
export const TodoItem = forwardRef<HTMLDivElement, ITodoItemProps>(
	({ index, list, setList, ...props }, ref) => {
		const itemData = list[index];

		const handleChange = (_index: number) => {
			const newTodos = [...list];
			newTodos[_index].status = !newTodos[_index].status;
			setList(newTodos);
		};

		const removeTodo = (_index: number) => {
			const newTodos = [...list];
			newTodos.splice(_index, 1);
			setList(newTodos);
		};

		const { themeStatus } = useDarkMode();

		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div ref={ref} className={classNames('todo-item')} {...props}>
				<div className='todo-bar'>
					<div
						className={classNames('h-100 w-100', 'rounded', {
							[`bg-${itemData?.badge?.color}`]: itemData?.badge,
						})}
					/>
				</div>
				<div className='todo-check'>
					<Checks checked={list[index].status} onChange={() => handleChange(index)} />
				</div>
				<div className='todo-content'>
					<div
						className={classNames('todo-title', {
							'text-decoration-line-through': list[index].status,
						})}>
						{itemData.title}
					</div>
					{itemData.date && (
						<div className='todo-subtitle text-muted small'>
							{moment(itemData.date).fromNow()}
						</div>
					)}
				</div>
				<div className='todo-extras'>
					{itemData?.badge && (
						<span className='me-2'>
							<Badge isLight color={itemData.badge.color}>
								{itemData.badge.text}
							</Badge>
						</span>
					)}
					<span>
						<Dropdown>
							<DropdownToggle hasIcon={false}>
								<Button color={themeStatus} icon='MoreHoriz' />
							</DropdownToggle>
							<DropdownMenu isAlignmentEnd>
								<DropdownItem>
									<Button onClick={() => removeTodo(index)} icon='Delete'>
										Delete
									</Button>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</span>
				</div>
			</div>
		);
	},
);
TodoItem.displayName = 'TodoItem';
TodoItem.propTypes = {
	// @ts-ignore
	list: TodoPropTypes.list.isRequired,
	setList: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
};
TodoItem.defaultProps = {};

export interface ITodoProps {
	list: ITodoListItem[];
	className?: string;
	setList(...args: unknown[]): unknown;
}
const Todo = forwardRef<HTMLDivElement, ITodoProps>(
	({ className, list, setList, ...props }, ref) => {
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<div ref={ref} className={classNames('todo', className)} {...props}>
				{list.map((i, index) => (
					<TodoItem key={i.id} index={index} list={list} setList={setList} />
				))}
			</div>
		);
	},
);
Todo.displayName = 'Todo';
Todo.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	list: TodoPropTypes.list.isRequired,
	setList: PropTypes.func.isRequired,
};
Todo.defaultProps = {
	className: undefined,
};

export default Todo;
