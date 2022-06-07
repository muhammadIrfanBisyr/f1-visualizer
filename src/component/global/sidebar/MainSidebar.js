import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Typography, Menu } from 'antd';
import {PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header, Sider, Footer, Content } = Layout;

export default function MainSidebar({children}) {
    
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
                <Sider collapsible>
                    <div className="logo" />
                    <Menu defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Content className="content-layout">
                    {children}
                </Content>
            </Layout>
            <Footer> ASDADASDADASDfe </Footer>
        </Layout>
    )
}