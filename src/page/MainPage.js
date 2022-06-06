import React from 'react';
import { Layout, Typography, Menu } from 'antd';
import {PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons';

import '../style/index.css';

import RaceDetailContent from '../component/race-detail/RaceDetailContent';
import RaceDetailContextProvider from '../component/race-detail/context/RaceDetailContextProvider';

const { Title } = Typography;
const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];
export default function MainPage(){

    return(
      
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
                    
                    <RaceDetailContextProvider>
                        <RaceDetailContent/>
                    </RaceDetailContextProvider>
                </>
            </Layout>
        </Layout>
        
    )
}