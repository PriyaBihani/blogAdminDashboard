import React, { useEffect, useState } from 'react';
import { List, Card, Typography, Form, Input, Button } from 'antd';
import { EditFilled, DeleteFilled, RightCircleFilled } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { fetchAllCategories, createCategory } from '../../API/Categories';
import { Category } from '../../variables/initialSchemas';
import setLoader from '../../helpers/setLoader';

const Categories = () => {
	let [categories, setCategories] = useState([]);

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
							className={'categoryItem'}
							actions={[
								<EditFilled style={{ cursor: 'pointer', color: 'blue' }} />,
								<DeleteFilled style={{ cursor: 'pointer', color: 'red' }} />,
							]}>
							<div className={'name'}>{item.name}</div>
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
