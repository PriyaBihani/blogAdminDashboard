import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routes from '../routes';

const { Header, Content, Footer, Sider } = Layout;

const switchRoutes = (
	<Switch>
		{routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			}
			return null;
		})}
		<Redirect from='/admin' to='/admin/dashboard' />
	</Switch>
);

const Admin = ({ ...rest }) => {
	return (
		<Layout>
			<Sider
				style={{
					minHeight: '100vh',
				}}>
				<div className='logo' />
				<Menu theme='dark' mode='inline' defaultSelectedKeys={['0']}>
					{routes.map((route, index) => (
						<Menu.Item key={index} icon={route.icon}>
							<NavLink to={`${route.layout}${route.path}`}>
								{route.name}
							</NavLink>
						</Menu.Item>
					))}
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				<Header style={{ padding: 0 }} />
				<Content
					className='site-layout-background'
					style={{ margin: '24px 16px 0', padding: 24 }}>
					{switchRoutes}
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					&copy; {new Date().getFullYear()} Codersgala Blog Admin
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Admin;
