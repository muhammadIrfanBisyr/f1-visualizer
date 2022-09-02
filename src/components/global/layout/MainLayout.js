import React from 'react'
import { Link } from 'react-router-dom'

import { Layout, Menu } from 'antd'
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons'

const { Header, Sider, Footer, Content } = Layout

export default function MainLayout ({ children }) {
  const getItem = (label, key, icon, _children) => {
    return {
      key,
      icon,
      _children,
      label
    }
  }

  const items = [
    getItem(<Link to='/summary'>Season Summary</Link>, '1', <PieChartOutlined />),
    getItem(<Link to='/detail'>Race Detail</Link>, '2', <DesktopOutlined />),
    getItem(<Link to='/driver'>Driver Information</Link>, '3', <UserOutlined />),
    getItem('Constructor Information', '4', <TeamOutlined />)
  ]

  return (
        <Layout className="main-layout">
            <Header className='main-header'> F1 Visualizer </Header>
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
