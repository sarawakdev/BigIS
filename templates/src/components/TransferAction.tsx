import React, { FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card, { CardBody } from './bootstrap/Card';
import useDarkMode from '../hooks/useDarkMode';

export type TTransferActionStatus = 'Completed' | 'Processing' | 'Failed';
interface ITransferActionProps {
	currency: string;
	amount: number;
	status: TTransferActionStatus;
	img: string;
	className?: string;
	imgWidth?: number;
}

const TransferAction: FC<ITransferActionProps> = ({
	currency,
	amount,
	status,
	img,
	className,
	imgWidth,
}) => {
	const { darkModeStatus } = useDarkMode();

	const STATUS =
		(status === 'Completed' && 'success') ||
		(status === 'Processing' && 'warning') ||
		(status === 'Failed' && 'danger');
	return (
		<Card className={className}>
			<CardBody>
				<div className='row g-3 align-items-center'>
					<div className='col d-flex align-items-center'>
						<div className='flex-shrink-0'>
							<div className='ratio ratio-1x1' style={{ width: 72 }}>
								<div
									className={classNames(
										'rounded-2',
										'd-flex align-items-center justify-content-center',
										{
											'bg-l10-info': !darkModeStatus,
											'bg-lo25-info': darkModeStatus,
										},
									)}>
									<span className='text-info fs-1 fw-bold'>{currency}</span>
								</div>
							</div>
						</div>
						<div className='flex-grow-1 ms-3 d-flex justify-content-between align-items-center'>
							<div>
								<div className='fw-bold fs-6 mb-0'>Transfer</div>
								<div className='text-muted'>
									<small>
										SWIFT:{' '}
										<span className='text-info fw-bold'>
											{currency}
											{amount}
										</span>
									</small>
								</div>
							</div>
						</div>
					</div>
					<div className='col'>
						<img src={img} alt='Bank Of America' width={imgWidth} height='auto' />
					</div>
					<div className='col-auto'>
						<div
							className={classNames(
								`bg-l${
									darkModeStatus ? 'o25' : '10'
								}-${STATUS} text-${STATUS} fw-bold px-3 py-2 rounded-pill`,
							)}>
							{status}
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
TransferAction.propTypes = {
	currency: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	// @ts-ignore
	status: PropTypes.oneOf(['Completed', 'Processing', 'Failed']).isRequired,
	img: PropTypes.string.isRequired,
	className: PropTypes.string,
	imgWidth: PropTypes.number,
};
TransferAction.defaultProps = {
	className: undefined,
	imgWidth: 150,
};

export default TransferAction;
