import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Header, Sider, Footer, Content } = Layout;

export default function MainLayout({children}) {
    
    function getItem(label, key, icon, children) {
        return {
          key,
          icon,
          children,
          label,
        };
      }
    
    const items = [
        getItem(<Link to='/summary'>Season Summary</Link>, '1', <PieChartOutlined />),
        getItem(<Link to='/detail'>Race Detail</Link>, '2', <DesktopOutlined />),
        getItem('Driver Information', '3', <UserOutlined /> ),
        getItem('Constructor Information', '4', <TeamOutlined /> )
    ];

    return (
        <Layout className="main-layout">
            <Header>header</Header>
            <Layout>
                <Sider collapsible theme='light' width={220}>
                    <div className="logo" />
                    <Menu defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Content className="content-layout">
                    {children}
                </Content>
            </Layout>
            <Footer className='main-footer'> Created by Irfan, using Ergast API and Ant Design </Footer>
        </Layout>
    )
}