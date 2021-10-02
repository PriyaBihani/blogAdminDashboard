import React from 'react';

import {
	PlusOutlined,
	RightCircleFilled,
	MailFilled,
	RedoOutlined,
	EyeFilled,
} from '@ant-design/icons';
import { Typography, Form, Input, Upload, Button, Select, Space } from 'antd';

import isValidMainImage from '../../helpers/isValidMainImage';

const CreatePost = () => {
	const [form] = Form.useForm();
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
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
				onFinish={onFinish}
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
							message: 'Please upload a file in this dimensions',
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
									new Error('The two passwords that you entered do not match!')
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
					label='Post Main Image Alt Text'
					name={'mainImageAltText'}
					rules={[{ required: true }]}>
					<Input size={'large'} placeholder='Eg: Web dev, HTML, CSS' />
				</Form.Item>
				<Form.Item
					label='Post Unique Title for URL'
					name={'uniqueTitle'}
					rules={[{ required: true }]}>
					<Input size={'large'} placeholder='Eg: how-to-start-web-dev' />
				</Form.Item>
				<Form.Item
					label='Post Keywords (Comma Separated)'
					name={'keywords'}
					rules={[{ required: true }]}>
					<Input size={'large'} placeholder='Eg: Web,HTML,CSS' />
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
					name={'desc'}
					rules={[{ required: true }]}>
					<Input.TextArea
						showCount
						maxLength={160}
						placeholder='Around 160 characters'
					/>
				</Form.Item>
				<Form.Item>
					<Space>
						<Button size='large' type='primary' htmlType='submit'>
							Publish <RightCircleFilled />
						</Button>
						<Button size='large' type='primary'>
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
