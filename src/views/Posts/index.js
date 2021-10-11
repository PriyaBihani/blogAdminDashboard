import React, { useState, useEffect } from 'react';
import {
	Table,
	Tag,
	Space,
	Typography,
	Form,
	Input,
	Upload,
	Button,
	Select,
	Switch,
} from 'antd';
import {
	EditFilled,
	SaveFilled,
	DeleteFilled,
	EyeFilled,
	PlusOutlined,
} from '@ant-design/icons';
import toast from 'react-hot-toast';

import setLoader from '../../helpers/setLoader';
import { fetchAllPosts, updatePost, deletePost } from '../../API/Post';
import { Post } from '../../variables/initialSchemas';
import { fetchAllCategories } from '../../API/Categories';
import isValidMainImage from '../../helpers/isValidMainImage';
import Editor from '../../components/Editor';

const Posts = () => {
	const [form] = Form.useForm();

	const [allPosts, setAllPosts] = useState([]);
	const [categories, setCategories] = useState([]);

	const [editView, setEditView] = useState(false);
	const [postToEdit, setPostToEdit] = useState({});

	useEffect(() => {
		setLoader('Fetching Posts...');
		fetchAllPosts((err, posts) => {
			setLoader(false);
			if (err) return toast.error(err);
			setAllPosts(posts);

			setLoader('Fetching Categories...');
			fetchAllCategories((err, categories) => {
				setLoader(false);
				if (err) return toast.error(err);
				setCategories(categories);
				toast.success(
					` ${posts.length} Posts and ${categories.length} Categories Fetched`
				);
			});
		});
	}, []);

	const handleDelete = (post) => {
		if (
			window &&
			window.confirm('Are you sure you want to delete this post?')
		) {
			setLoader('Deleting Post');
			deletePost(post, (err, deletedPost) => {
				setLoader(false);
				if (err) return toast.error(err);
				setAllPosts((prevVal) => prevVal.filter(prevVal.id !== deletedPost.id));
				toast.success('Post deleted successfully.');
			});
		}
	};

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			render: (text) => <div>{text}</div>,
		},
		{
			title: 'Draft',
			dataIndex: 'isDraft',
			key: 'isDraft',
			render: (isDraft) => <div>{String(isDraft)}</div>,
		},
		{
			title: 'Categories',
			dataIndex: 'categories',
			key: 'categories',
			render: (postCategories) => (
				<>
					{postCategories.map((postCategory) => {
						return (
							<Tag color='#2db7f5' key={postCategory}>
								{categories &&
									categories.find((category) => category.id === postCategory)
										?.name}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			render: (tags) => (
				<>
					{tags.map((tag) => {
						return (
							<Tag color='#2db7f5' key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (record) => (
				<Space size='middle'>
					<EditFilled
						onClick={() => {
							setEditView(true);
							form.setFieldsValue({ ...record });
							setPostToEdit(record);
						}}
						style={{ color: 'blue', cursor: 'pointer' }}
					/>
					<DeleteFilled
						onClick={() => handleDelete(record)}
						style={{ color: 'red', cursor: 'pointer' }}
					/>
					<EyeFilled style={{ color: '#2db7f5', cursor: 'pointer' }} />
				</Space>
			),
		},
	];

	const onUpdate = (postDetails) => {
		setLoader('Updating Post');
		postDetails = Post({ ...postToEdit, ...postDetails });
		updatePost(postDetails, postToEdit, (err, post) => {
			setLoader(false);
			if (err) return toast.error(err);
			let posts = [];
			posts = allPosts.filter((val) => val.id != post.id);
			posts.push(post);
			setAllPosts(posts);
			setEditView(false);
			return toast.success('Post Updated Successfully.');
		});
	};

	return (
		<>
			{!editView ? (
				<>
					<Typography.Title level={2}>View Posts</Typography.Title>
					<Table columns={columns} dataSource={allPosts} />
				</>
			) : (
				<div className={'createPostContainer'}>
					<Typography.Title level={2}>Edit Post</Typography.Title>
					<Form
						form={form}
						layout={'vertical'}
						onFinish={onUpdate}
						requiredMark={false}>
						<Form.Item
							label='Post Title'
							name={'title'}
							rules={[{ required: true }]}>
							<Input size={'large'} placeholder='Eg: How to start web dev' />
						</Form.Item>
						<Form.Item label='Featured Post' name={'isFeatured'}>
							<Switch size={'large'} />
						</Form.Item>
						<Form.Item
							label='Main Image'
							name={'mainImage'}
							rules={[
								{},
								() => ({
									validator(_, value) {
										if (
											typeof value === 'string' ||
											(value &&
												isValidMainImage(value.fileList[0]?.originFileObj))
										) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('File dimensions are wrong.')
										);
									},
								}),
							]}>
							<Upload
								accept={'image/*'}
								listType='picture-card'
								maxCount={1}
								showUploadList={true}
								beforeUpload={() => false}>
								<div style={{ marginTop: 8 }}>
									<PlusOutlined />
									Upload
								</div>
							</Upload>
						</Form.Item>

						<Form.Item
							label='Post Main Image Alt Text'
							name={'mainImageAlt'}
							rules={[{ required: true }]}>
							<Input size={'large'} placeholder='Eg: Web dev, HTML, CSS' />
						</Form.Item>
						<Form.Item
							label='Card Image'
							name={'cardImage'}
							rules={[
								{
									required: true,
									message: 'Please upload a file.',
								},
								() => ({
									validator(_, value) {
										if (
											value &&
											isValidMainImage(value.fileList[0].originFileObj)
										) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('File dimensions are wrong.')
										);
									},
								}),
							]}>
							<Upload
								accept={'image/*'}
								name='fileList'
								listType='picture-card'
								maxCount={1}
								showUploadList={true}
								beforeUpload={() => false}>
								<div style={{ marginTop: 8 }}>
									<PlusOutlined />
									Upload
								</div>
							</Upload>
						</Form.Item>
						<Form.Item
							label='Post Card Image Alt Text'
							name={'cardImageAlt'}
							rules={[{ required: true }]}>
							<Input size={'large'} placeholder='Eg: Web dev, HTML, CSS' />
						</Form.Item>
						<Form.Item
							label='Add Keywords for SEO'
							name={'keywords'}
							rules={[{ required: true }]}>
							<Input size={'large'} placeholder='Eg: Web, HTML, CSS' />
						</Form.Item>
						<Form.Item label='Tags' name={'tags'} rules={[{ required: true }]}>
							<Input size={'large'} placeholder='Eg: #Web #HTML #CSS' />
						</Form.Item>
						<Form.Item
							label='Select categories'
							name='categories'
							rules={[{ required: true }]}>
							<Select
								mode='multiple'
								placeholder='Please select categories'
								size={'large'}>
								{categories.map((category) => (
									<Select.Option key={category.id} value={category.id}>
										{category.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							label='Small Description Snippet for SEO'
							name={'metaDesc'}
							rules={[{ required: true }]}>
							<Input.TextArea
								showCount
								maxLength={160}
								placeholder='Around 160 characters'
							/>
						</Form.Item>
						<Form.Item
							label='Description for blog card'
							name={'descSnippet'}
							rules={[{ required: true }]}>
							<Input.TextArea
								showCount
								maxLength={100}
								placeholder='Around 100 characters'
							/>
						</Form.Item>
						{/* <Form.Item label='Start Writing' name={'content'}>
							<Editor handleEditor={setcontent} />
						</Form.Item> */}
						<Form.Item>
							<Space>
								<Button size='large' type='primary' htmlType='submit'>
									Update <SaveFilled />
								</Button>
							</Space>
						</Form.Item>
					</Form>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button size='large' type='primary'>
							Preview Post <EyeFilled />
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default Posts;
