import React from 'react';
import { Layout, Typography, Menu } from 'antd';

import '../style/index.css';

import RaceDetailContent from '../component/race-detail/RaceDetailContent';
import RaceDetailContextProvider from '../component/race-detail/context/RaceDetailContextProvider';

const { Title } = Typography;
const { Sider } = Layout;

export default function MainPage(){

    return(
      
        <Layout className="main-layout">
            <Sider collapsible>
                <div className="logo" />
                <Menu defaultSelectedKeys={['1']} mode="inline" />
            </Sider>
            <Layout className="content-layout">
                <>
                    <Title style={{'textAlign': 'center'}}>
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