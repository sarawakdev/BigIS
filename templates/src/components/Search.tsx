import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Icon from './icon/Icon';
import Input from './bootstrap/forms/Input';
import Modal, { ModalBody, ModalHeader } from './bootstrap/Modal';
import { componentPagesMenu } from '../menu';

const Search = () => {
	const refSearchInput = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const [searchModalStatus, setSearchModalStatus] = useState(false);
	const formik = useFormik({
		initialValues: {
			searchInput: '',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setSearchModalStatus(true);
		},
	});

	useEffect(() => {
		if (formik.values.searchInput) {
			setSearchModalStatus(true);
			refSearchInput?.current?.focus();
		}
		return () => {
			setSearchModalStatus(false);
		};
	}, [formik.values.searchInput]);

	const searchPages: {
		[key: string]: {
			id: string;
			text: string;
			path: string;
			icon: string;
		};
	} = {
		...componentPagesMenu,
	};
	const filterResult = Object.keys(searchPages)
		.filter(
			(key) =>
				searchPages[key].text
					.toString()
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()) ||
				searchPages[key].path
					.toString()
					.toLowerCase()
					.includes(formik.values.searchInput.toLowerCase()),
		)
		.map((i) => searchPages[i]);
	return (
		<>
			<div className='d-flex' data-tour='search'>
				<label className='border-0 bg-transparent cursor-pointer' htmlFor='searchInput'>
					<Icon icon='Search' size='2x' color='primary' />
				</label>
				<Input
					id='searchInput'
					type='search'
					className='border-0 shadow-none bg-transparent'
					placeholder='Search...'
					onChange={formik.handleChange}
					value={formik.values.searchInput}
					autoComplete='off'
				/>
			</div>
			<Modal
				setIsOpen={setSearchModalStatus}
				isOpen={searchModalStatus}
				isStaticBackdrop
				isScrollable
				data-tour='search-modal'>
				<ModalHeader setIsOpen={setSearchModalStatus}>
					<label className='border-0 bg-transparent cursor-pointer' htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						ref={refSearchInput}
						name='searchInput'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search...'
						onChange={formik.handleChange}
						value={formik.values.searchInput}
					/>
				</ModalHeader>
				<ModalBody>
					<table className='table table-hover table-modern caption-top mb-0'>
						<caption>Results: {filterResult.length}</caption>
						<thead className='position-sticky' style={{ top: -13 }}>
							<tr>
								<th scope='col'>Pages</th>
							</tr>
						</thead>
						<tbody>
							{filterResult.length ? (
								filterResult.map((item) => (
									<tr
										key={item.id}
										className='cursor-pointer'
										onClick={() => {
											navigate(`../${item.path}`);
										}}>
										<td>
											{item.icon && (
												<Icon
													icon={item.icon}
													size='lg'
													className='me-2'
													color='primary'
												/>
											)}
											{item.text}
										</td>
									</tr>
								))
							) : (
								<tr className='table-active'>
									<td>No result found for query "{formik.values.searchInput}"</td>
								</tr>
							)}
						</tbody>
					</table>
				</ModalBody>
			</Modal>
		</>
	);
};

export default Search;
