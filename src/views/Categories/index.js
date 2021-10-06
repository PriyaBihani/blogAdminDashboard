import React, { useEffect, useState } from 'react';
import { List, Card, Typography, Form, Input, Button, Modal } from 'antd';
import {
	EditFilled,
	SaveFilled,
	DeleteFilled,
	RightCircleFilled,
} from '@ant-design/icons';
import toast from 'react-hot-toast';
import {
	fetchAllCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} from '../../API/Categories';
import { Category } from '../../variables/initialSchemas';
import setLoader from '../../helpers/setLoader';

const Categories = () => {
	let [categories, setCategories] = useState([]);
	let [editMode, setEditMode] = useState(false);
	let [editCategory, setEditCategory] = useState({});
	let [svgPreview, setsvgPreview] = useState('');
	let [editModal, seteditModal] = useState(false);

	const onCreate = (categoryDetails) => {
		setLoader('Creating Categories..');
		categoryDetails = Category(categoryDetails);
		createCategory(categoryDetails, (err, data) => {
			setLoader(false);
			if (err) return toast.error(err);
			setCategories((prevValue) => [...prevValue, data]);
			toast.success(`${data.name} Category Created`);
		});
	};

	const handleEdit = (category) => {
		setLoader('Editing Category..');
		updateCategory(category, (err, updatedCategory) => {
			setLoader(false);
			if (err) return toast.error(err);
			let newCategories = [];
			newCategories = categories.filter((item) => item.id !== category.id);
			newCategories.push(updatedCategory);
			setCategories(newCategories);
			toast.success(`${updatedCategory.name} Category Updated`);
		});
	};

	const handleDelete = (category) => {
		if (
			window &&
			window.confirm('Are you sure you want to delete this category?')
		) {
			setLoader('Deleting Category..');
			deleteCategory(category, (err, deletedCategory) => {
				setLoader(false);
				if (err) return toast.error(err);
				setCategories(
					categories.filter((item) => item.id !== deletedCategory.id)
				);
				toast.success(`${deletedCategory.name} Category Deleted`);
			});
		}
	};

	useEffect(() => {
		setLoader('Fetching Categories...');
		fetchAllCategories((err, data) => {
			setLoader(false);
			if (err) return toast.error(err);
			setCategories(data);
			toast.success(`${data.length} Categories Fetched`);
		});
	}, []);

	return (
		<>
			<Typography.Title level={2}>Categories</Typography.Title>
			<div className={'categoriesContainer'}>
				<List
					size='large'
					className='categoryList'
					itemLayout='horizontal'
					dataSource={categories}
					renderItem={(item) => (
						<List.Item
							key={item.id}
							className={'categoryItem'}
							actions={[
								<>
									{editMode ? (
										<SaveFilled
											key={item.id}
											onClick={() => {
												setEditMode(false);
												handleEdit(editCategory);
											}}
											style={{ cursor: 'pointer', color: 'blue' }}
										/>
									) : (
										<EditFilled
											key={item.id}
											onClick={() => {
												setEditMode(true);
												setEditCategory(item);
											}}
											style={{ cursor: 'pointer', color: 'blue' }}
										/>
									)}
								</>,
								<DeleteFilled
									key={item.id}
									onClick={() => handleDelete(item)}
									style={{ cursor: 'pointer', color: 'red' }}
								/>,
							]}>
							<div className={'values'}>
								{editMode && item.id === editCategory.id ? (
									<>
										<Input
											value={editCategory.name}
											bordered={false}
											autoFocus
											onChange={(e) =>
												setEditCategory((prevVal) => ({
													...prevVal,
													name: e.target.value,
												}))
											}
										/>
										<Input
											type='color'
											colorpick-eyedropper-active='false'
											className={'colorPicker'}
											onChange={(e) => {
												setEditCategory((prevVal) => ({
													...prevVal,
													color: e.target.value,
												}));
											}}
										/>
										<div onClick={() => {
											seteditModal(!editModal)
										}} style={{ margin: '0px 20px' }} className='svg-preview' dangerouslySetInnerHTML={{ __html: item.icon }}></div>

										<Modal title="Edit Icon" visible={editModal} onOk={() => {

											setEditCategory((prevVal) => ({
												...prevVal,
												icon: svgPreview,
											}));
											setsvgPreview('')
											seteditModal(!editModal)
										}} onCancel={() => { seteditModal(!editModal) }}>

											<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }} >
												<Form.Item  >
													<div style={{ margin: '0px 20px' }} className='svg-preview' dangerouslySetInnerHTML={{ __html: svgPreview }}></div>
												</Form.Item>
												<Form.Item label='SVG icon code' name={'svg'}>
													<Input.TextArea
														label='Icon Vector'
														placeholder={` <svg className="h-6" xmlns="http://www.w3.org/2000/svg"><title>HTML5 icon</title><path d="M1.5 -2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" /></svg>`} onChange={e => { setsvgPreview(e.target.value.trim()) }}
														type='text'
														className={'svg'}
													/>
												</Form.Item>
											</div>

										</Modal>
									</>
								) : (
									<>
										{item.name} {'  '}{' '}
										<span
											style={{
												backgroundColor: item.color ?? '#000',
												width: '10px',
												height: '10px',
												marginLeft: '15px',
											}}></span>
										<span style={{ margin: '0px 20px' }} className='svg-preview' dangerouslySetInnerHTML={{ __html: item.icon }}></span>

									</>
								)}
							</div>
						</List.Item>
					)}
				/>
				<Card
					title='Create a new category'
					className={'createCategoryCard'}
					bordered={true}>
					<Form layout={'vertical'} onFinish={onCreate} requiredMark={false}>
						<Form.Item
							label='Category Name'
							name={'name'}
							rules={[{ required: true }]}>
							<Input size={'large'} placeholder='Eg: Web Development' />
						</Form.Item>

						<Form.Item label='SVG icon code' name={'svg'}>
							<Input.TextArea
								label='Icon Vector'
								placeholder={` <svg className="h-6" xmlns="http://www.w3.org/2000/svg"><title>HTML5 icon</title><path d="M1.5 -2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" /></svg>`} onChange={e => { setsvgPreview(e.target.value.trim()) }}
								type='text'
								className={'svg'}
							/>
						</Form.Item>
						<div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }} >
							<Form.Item name={'color'}>
								<Input
									type='color'
									className={'colorPicker'}
									colorpick-eyedropper-active='false'
								/>
							</Form.Item>

							<Form.Item  >
								<div style={{ margin: '0px 20px' }} className='svg-preview' dangerouslySetInnerHTML={{ __html: svgPreview }}></div>
							</Form.Item>
						</div>
						<Form.Item>
							<Button size='large' type='primary' htmlType='submit'>
								Create <RightCircleFilled />
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	);
};

export default Categories;
