import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { CardFooter, CardFooterLeft, CardFooterRight } from './bootstrap/Card';
import Pagination, { PaginationItem } from './bootstrap/Pagination';
import Select from './bootstrap/forms/Select';
import Option from './bootstrap/Option';

export const PER_COUNT = {
	3: 3,
	5: 5,
	10: 10,
	25: 25,
	50: 50,
};

export const dataPagination = (data: any[], currentPage: number, perPage: number) =>
	data.filter(
		(i, index) => index + 1 > (currentPage - 1) * perPage && index + 1 <= currentPage * perPage,
	);

interface IPaginationButtonsProps {
	setCurrentPage(...args: unknown[]): unknown;
	currentPage: number;
	perPage: number;
	setPerPage(...args: unknown[]): unknown;
	data: unknown[];
	label: string;
}
const PaginationButtons: FC<IPaginationButtonsProps> = ({
	setCurrentPage,
	currentPage,
	perPage,
	setPerPage,
	data,
	label,
}) => {
	const totalItems = data.length;
	const totalPage = Math.ceil(totalItems / perPage);

	const pagination = () => {
		let items = [];

		let i = currentPage - 1;
		while (i >= currentPage - 1 && i > 0) {
			items.push(
				<PaginationItem key={i} onClick={() => setCurrentPage(currentPage - 1)}>
					{i}
				</PaginationItem>,
			);

			i -= 1;
		}

		items = items.reverse();

		items.push(
			<PaginationItem key={currentPage} isActive onClick={() => setCurrentPage(currentPage)}>
				{currentPage}
			</PaginationItem>,
		);

		i = currentPage + 1;
		while (i <= currentPage + 1 && i <= totalPage) {
			items.push(
				<PaginationItem key={i} onClick={() => setCurrentPage(currentPage + 1)}>
					{i}
				</PaginationItem>,
			);

			i += 1;
		}

		return items;
	};

	const getInfo = () => {
		const start = perPage * (currentPage - 1) + 1;

		const end = perPage * currentPage;

		return (
			<span className='pagination__desc'>
				Showing {start} to {end > totalItems ? totalItems : end} of {totalItems} {label}
			</span>
		);
	};

	return (
		<CardFooter>
			<CardFooterLeft>
				<span className='text-muted'>{getInfo()}</span>
			</CardFooterLeft>

			<CardFooterRight className='d-flex'>
				{totalPage > 1 && (
					<Pagination ariaLabel={label}>
						<PaginationItem
							isFirst
							isDisabled={!(currentPage - 1 > 0)}
							onClick={() => setCurrentPage(1)}
						/>
						<PaginationItem
							isPrev
							isDisabled={!(currentPage - 1 > 0)}
							onClick={() => setCurrentPage(currentPage - 1)}
						/>
						{currentPage - 1 > 1 && (
							<PaginationItem onClick={() => setCurrentPage(currentPage - 2)}>
								...
							</PaginationItem>
						)}
						{pagination()}
						{currentPage + 1 < totalPage && (
							<PaginationItem onClick={() => setCurrentPage(currentPage + 2)}>
								...
							</PaginationItem>
						)}
						<PaginationItem
							isNext
							isDisabled={!(currentPage + 1 <= totalPage)}
							onClick={() => setCurrentPage(currentPage + 1)}
						/>
						<PaginationItem
							isLast
							isDisabled={!(currentPage + 1 <= totalPage)}
							onClick={() => setCurrentPage(totalPage)}
						/>
					</Pagination>
				)}

				<Select
					size='sm'
					ariaLabel='Per'
					onChange={(e: { target: { value: string } }) => {
						setPerPage(parseInt(e.target.value, 10));
						setCurrentPage(1);
					}}
					value={perPage.toString()}>
					{Object.keys(PER_COUNT).map((i) => (
						<Option key={i} value={i}>
							{i}
						</Option>
					))}
				</Select>
			</CardFooterRight>
		</CardFooter>
	);
};
PaginationButtons.propTypes = {
	setCurrentPage: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
	perPage: PropTypes.number.isRequired,
	setPerPage: PropTypes.func.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	data: PropTypes.array.isRequired,
	label: PropTypes.string.isRequired,
};
PaginationButtons.defaultProps = {
	label: 'items',
};

export default PaginationButtons;
