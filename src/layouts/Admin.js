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
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
				}}>
				<div className='logo' />
				<Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
					{routes.map((route, index) => (
						<Menu.Item key={index} icon={route.icon}>
							<NavLink
								to={`${route.layout}${route.path}`}
								activeStyle={{
									fontWeight: 'bold',
									color: 'red',
								}}>
								{route.name}
							</NavLink>
						</Menu.Item>
					))}
				</Menu>
			</Sider>
			<Layout className='site-layout' style={{ marginLeft: 200 }}>
				<Header className='site-layout-background' style={{ padding: 0 }} />
				<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
					<div
						className='site-layout-background'
						style={{ padding: 24, textAlign: 'center' }}>
						{switchRoutes}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Codersgala Blog Admin</Footer>
			</Layout>
		</Layout>
	);
};

export default Admin;
