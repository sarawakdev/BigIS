import React, { FC, HTMLAttributes, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from './Avatar';
import useDarkMode from '../hooks/useDarkMode';
import { TColor } from '../type/color-type';

interface IChatAvatarProps extends HTMLAttributes<HTMLDivElement> {
	src?: string;
	srcSet?: string;
	className?: string;
	color?: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
	unreadMessage?: number;
	isOnline?: boolean;
	size?: number;
}
export const ChatAvatar: FC<IChatAvatarProps> = ({
	src,
	srcSet,
	className,
	color,
	unreadMessage,
	isOnline,
	size,
	...props
}) => {
	return (
		<div
			className={classNames('chat-avatar', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			<div className='position-relative'>
				{src && <Avatar srcSet={srcSet} src={src} size={size} color={color} />}
				{unreadMessage && (
					<span className='position-absolute top-15 start-85 translate-middle badge rounded-pill bg-danger'>
						{unreadMessage} <span className='visually-hidden'>unread messages</span>
					</span>
				)}
				{isOnline && (
					<span className='position-absolute top-85 start-85 translate-middle badge border border-2 border-light rounded-circle bg-success p-2'>
						<span className='visually-hidden'>Online user</span>
					</span>
				)}
			</div>
		</div>
	);
};
ChatAvatar.propTypes = {
	src: PropTypes.string,
	srcSet: PropTypes.string,
	className: PropTypes.string,
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
		'link',
		'brand',
		'brand-two',
		'storybook',
	]),
	unreadMessage: PropTypes.number,
	isOnline: PropTypes.bool,
	size: PropTypes.number,
};
ChatAvatar.defaultProps = {
	src: undefined,
	srcSet: undefined,
	className: undefined,
	color: undefined,
	unreadMessage: undefined,
	isOnline: false,
	size: 45,
};

interface IChatListItemProps extends HTMLAttributes<HTMLDivElement> {
	src: string;
	srcSet?: string;
	className?: string;
	isOnline?: boolean;
	color?: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
	size?: number;
	name: string;
	surname: string;
	latestMessage?: string;
	unreadMessage?: number;
	isActive?: boolean;
	lastSeenTime?: string;
}
export const ChatListItem: FC<IChatListItemProps> = ({
	src,
	srcSet,
	className,
	isOnline,
	color,
	size,
	name,
	surname,
	latestMessage,
	unreadMessage,
	isActive,
	lastSeenTime,
	...props
}) => {
	const { darkModeStatus } = useDarkMode();

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className={classNames('col-12 cursor-pointer', className)} {...props}>
			<div
				className={classNames(
					'd-flex align-items-center',
					'p-3 rounded-2',
					'transition-base',
					{
						'bg-l25-info-hover': !darkModeStatus,
						'bg-lo50-info-hover': darkModeStatus,
						'bg-l10-info': !darkModeStatus && isActive,
						'bg-lo25-info': darkModeStatus && isActive,
					},
				)}>
				<ChatAvatar
					src={src}
					srcSet={srcSet}
					isOnline={isOnline}
					unreadMessage={unreadMessage}
					color={color}
					size={size}
					className='me-3'
				/>
				<div className='d-grid'>
					<div className='d-flex flex-wrap d-xxl-block'>
						<span className='fw-bold fs-5 me-3'>{`${name} ${surname}`}</span>
						{lastSeenTime && (
							<small
								className={classNames(
									'text-info fw-bold px-3 py-1 rounded-pill align-top text-nowrap',
									{
										'bg-l10-info': !darkModeStatus,
										'bg-lo25-info': darkModeStatus,
									},
								)}>
								{lastSeenTime}
							</small>
						)}
					</div>
					<div className='text-muted text-truncate'>{latestMessage}</div>
				</div>
			</div>
		</div>
	);
};
ChatListItem.propTypes = {
	src: PropTypes.string.isRequired,
	srcSet: PropTypes.string,
	className: PropTypes.string,
	isOnline: PropTypes.bool,
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
		'link',
		'brand',
		'brand-two',
		'storybook',
	]),
	size: PropTypes.number,
	name: PropTypes.string.isRequired,
	surname: PropTypes.string.isRequired,
	latestMessage: PropTypes.string,
	unreadMessage: PropTypes.number,
	isActive: PropTypes.bool,
	lastSeenTime: PropTypes.string,
};
ChatListItem.defaultProps = {
	srcSet: undefined,
	className: undefined,
	isOnline: false,
	color: 'primary',
	size: 64,
	latestMessage: undefined,
	unreadMessage: undefined,
	isActive: false,
	lastSeenTime: undefined,
};

interface IChatHeaderProps {
	to: string;
}
export const ChatHeader: FC<IChatHeaderProps> = ({ to }) => {
	return (
		<>
			<strong className='me-2'>To:</strong>
			{to}
		</>
	);
};
ChatHeader.propTypes = {
	to: PropTypes.string.isRequired,
};

interface IChatMessagesProps extends HTMLAttributes<HTMLDivElement> {
	messages: {
		id?: string | number;
		message?: string | number;
	}[];
	isReply?: boolean;
}
export const ChatMessages: FC<IChatMessagesProps> = ({ messages, isReply, ...props }) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='chat-messages' {...props}>
			{messages.map((i) => (
				<div
					key={i.id}
					className={classNames('chat-message', { 'chat-message-reply': isReply })}>
					{i.message}
				</div>
			))}
		</div>
	);
};
ChatMessages.propTypes = {
	// @ts-ignore
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			message: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	).isRequired,
	isReply: PropTypes.bool,
};
ChatMessages.defaultProps = {
	isReply: false,
};

interface IChatGroupProps extends HTMLAttributes<HTMLDivElement> {
	isReply?: boolean;
	messages: {
		id?: string | number;
		message?: string | number;
	}[];
	isOnline?: boolean;
	color?: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
	user: {
		src?: string;
		srcSet?: string;
		username?: string;
		name?: string;
		surname?: string;
		isOnline?: boolean;
		color?: TColor | 'link' | 'brand' | 'brand-two' | 'storybook';
	};
}
export const ChatGroup: FC<IChatGroupProps> = ({
	isReply,
	messages,
	isOnline,
	color,
	user,
	...props
}) => {
	const AVATAR = (
		<ChatAvatar
			src={user.src}
			srcSet={user.srcSet}
			isOnline={user.isOnline}
			color={user.color}
		/>
	);
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className={classNames('chat-group', { 'chat-group-reply': isReply })} {...props}>
			{!isReply && AVATAR}
			<ChatMessages messages={messages} isReply={isReply} />
			{isReply && AVATAR}
		</div>
	);
};
ChatGroup.propTypes = {
	isReply: PropTypes.bool,
	// @ts-ignore
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			message: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	).isRequired,
	isOnline: PropTypes.bool,
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
		'link',
		'brand',
		'brand-two',
		'storybook',
	]),
	// @ts-ignore
	user: PropTypes.shape({
		src: PropTypes.string,
		srcSet: PropTypes.string,
		username: PropTypes.string,
		name: PropTypes.string,
		surname: PropTypes.string,
		isOnline: PropTypes.bool,
		color: PropTypes.oneOf([
			'primary',
			'secondary',
			'success',
			'info',
			'warning',
			'danger',
			'light',
			'dark',
			'link',
			'brand',
			'brand-two',
			'storybook',
		]),
	}).isRequired,
};
ChatGroup.defaultProps = {
	isReply: false,
	isOnline: false,
	color: undefined,
};

interface IChatProps {
	children: ReactNode;
	className?: string;
}
const Chat: FC<IChatProps> = ({ children, className }) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className={classNames('chat-container', className)}>{children}</div>
	);
};
Chat.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
Chat.defaultProps = {
	className: undefined,
};

export default Chat;
