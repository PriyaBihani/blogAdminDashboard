import {
	UserOutlined,
	UnorderedListOutlined,
	DashboardOutlined,
	FileAddFilled,
	QrcodeOutlined,
	HourglassOutlined,
} from '@ant-design/icons';

// core components/views for Admin layout
import DashboardPage from './views/Dashboard';
import CreatePost from './views/CreatePost';
import Categories from './views/Categories';
import Drafts from './views/Drafts';
import Posts from './views/Posts';
import UserProfile from './views/UserProfile';

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: <DashboardOutlined />,
		component: DashboardPage,
		layout: '/admin',
	},
	{
		path: '/user',
		name: 'User Profile',
		icon: <UserOutlined />,
		component: UserProfile,
		layout: '/admin',
	},
	{
		path: '/createpost',
		name: 'Create Post',
		icon: <FileAddFilled />,
		component: CreatePost,
		layout: '/admin',
	},
	{
		path: '/categories',
		name: 'Categories',
		icon: <QrcodeOutlined />,
		component: Categories,
		layout: '/admin',
	},
	{
		path: '/drafts',
		name: 'Drafts',
		icon: <HourglassOutlined />,
		component: Drafts,
		layout: '/admin',
	},
	{
		path: '/viewposts',
		name: 'View Posts',
		icon: <UnorderedListOutlined />,
		component: Posts,
		layout: '/admin',
	},
];

export default dashboardRoutes;
