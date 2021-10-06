import React from 'react';
import { Table, Tag, Space, Typography } from 'antd';
import {
	EditFilled,
	SaveFilled,
	DeleteFilled,
	EyeFilled,
} from '@ant-design/icons';

const data = [
	{
		key: '1',
		title: 'How to start web dev',
		isDraft: 'false',
		address: 'New York No. 1 Lake Park',
		tags: ['#WEBDEV', '#NEWBIE'],
	},
	{
		key: '2',
		title: 'Is Hookstate the end of redux/context?',
		isDraft: 'true',
		address: 'London No. 1 Lake Park',
		tags: ['#REDUX', '#REACT'],
	},
	{
		key: '3',
		title: 'Well Fuck u kartik',
		isDraft: 'false',
		address: 'Sidney No. 1 Lake Park',
		tags: ['#KARTIK', '#FUCKOFF'],
	},
];
const Posts = () => {
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
			render: (isDraft) => <div>{isDraft}</div>,
		},
		{
			title: 'Categories',
			dataIndex: 'address',
			key: 'address',
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
			render: () => (
				<Space size='middle'>
					<EditFilled style={{ color: 'blue', cursor: 'pointer' }} />
					<DeleteFilled style={{ color: 'red', cursor: 'pointer' }} />
					<EyeFilled style={{ color: '#2db7f5', cursor: 'pointer' }} />
				</Space>
			),
		},
	];

	return (
		<div>
			<Typography.Title level={2}>View Posts</Typography.Title>
			<Table columns={columns} dataSource={data} />
		</div>
	);
};

export default Posts;
