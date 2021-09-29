import { UserOutlined, DashboardOutlined } from '@ant-design/icons';

// core components/views for Admin layout
import DashboardPage from './views/Dashboard/Dashboard.js';
import UserProfile from './views/UserProfile/UserProfile.js';

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
];

export default dashboardRoutes;
