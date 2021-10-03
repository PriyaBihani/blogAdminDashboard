import React, { useState } from 'react';

import {
	PlusOutlined,
	RightCircleFilled,
	MailFilled,
	RedoOutlined,
	EyeFilled,
} from '@ant-design/icons';
import toast from 'react-hot-toast';
import { Typography, Form, Input, Upload, Button, Select, Space } from 'antd';

import isValidMainImage from '../../helpers/isValidMainImage';
import setLoader from '../../helpers/setLoader';
import { Post } from '../../variables/initialSchemas';
import { createPost } from '../../API/Post';
import Editor from '../../components/Editor';

const CreatePost = () => {
	const [form] = Form.useForm();

	const [content, setcontent] = useState(null)

	const onPublish = (postDetails) => {
		setLoader('Creating Post.');
		postDetails.mainImage = postDetails.mainImage.fileList[0].originFileObj;
		postDetails = Post(postDetails);
		createPost(postDetails, (err, data) => {
			setLoader(false);
			if (err) return toast.error(err);
			onReset();
			return toast.success('Post Created Successfully.');
		});
	};

	const onSaveAsDraft = (postDetails) => {
		postDetails.isDraft = true;
		onPublish(postDetails);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<div className={'createPostContainer'}>
			<Typography.Title level={2}>Create Post</Typography.Title>
			<Form
				form={form}
				layout={'vertical'}
				onFinish={onPublish}
				requiredMark={false}>
				<Form.Item
					label='Post Title'
					name={'title'}
					rules={[{ required: true }]}>
					<Input size={'large'} placeholder='Eg: How to start web dev' />
				</Form.Item>
				<Form.Item
					label='Main Image'
					name={'mainImage'}
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
								return Promise.reject(new Error('File dimensions are wrong.'));
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
					label='Post Main Image Alt Text'
					name={'mainImageAlt'}
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
						<Select.Option value='HTML'>HTML</Select.Option>
						<Select.Option value='Dynamic'>Dynamic</Select.Option>
						<Select.Option value='Whatver'>Whatver</Select.Option>
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
				<Form.Item
					label='Start Writing'
					name={'content'}
					rules={[{ required: true }]}>
					<Editor handleEditor={setcontent} />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button size='large' type='primary' htmlType='submit'>
							Publish <RightCircleFilled />
						</Button>
						<Button size='large' type='primary' onClick={onSaveAsDraft}>
							Save As Draft <MailFilled />
						</Button>
						<Button size='large' type='primary' onClick={onReset}>
							Reset <RedoOutlined />
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
	);
};

export default CreatePost;
