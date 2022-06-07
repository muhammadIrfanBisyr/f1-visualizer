import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Typography, Menu } from 'antd';
import {PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Sider } = Layout;

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
            <Sider collapsible>
                <div className="logo" />
                <Menu defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="content-layout">
                <>
                    <Title level={3}>
                        F1 Visualizer
                    </Title>
                    {children}
                </>
            </Layout>
        </Layout>

    )
}