// import React from "react";
// import { Link } from "react-router-dom";
// import "./style.css";
// const AdminAppBar = () => {
//   return (
//     <>
//       <nav className="nav">
//         <div className="logo">
//           <Link>
//             <h1 style={{color:"gray"}}>Admin Panel</h1>
//           </Link>
//         </div>
//         <ul>
//           <li>
//             <Link to="add-songs">
//               <i class="fa-solid fa-music"></i>
//               <span>Songs</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="">
//               <i class="fa-solid fa-user"></i>
//               <span>Users</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default AdminAppBar;



import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PictureOutlined,
  FileTextOutlined,
  TeamOutlined,
  AppstoreOutlined,
  TrophyOutlined,
  RocketOutlined,
  GlobalOutlined,
  SendOutlined,
  CustomerServiceOutlined,
  TagsOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import "./style.css"
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const AdminAppBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className='layout'>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        className="custom-sidebar"
        width={220}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="sidebar-logo">
          <div className="logo-icon">M</div>
          {!collapsed && <span className="logo-text">Millennium Tour</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className="custom-menu"
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <PictureOutlined />,
              label: <Link to="hero">Hero Area</Link>,
            },
            {
              key: '3',
              icon: <FileTextOutlined />,
              label: <Link to="blogadmin">Blogs</Link>,
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: <Link to="adminpopular">Popular Team</Link>,
            },
            {
              key: '5',
              icon: <AppstoreOutlined />,
              label: <Link to="addlogo">Logos</Link>,
            },
            {
              key: '7',
              icon: <TeamOutlined />,
              label: <Link to="teamadmin">Team</Link>,
            },
            {
              key: '8',
              icon: <TrophyOutlined />,
              label: <Link to="awardsadmin">Awards</Link>,
            },
            {
              key: '9',
              icon: <RocketOutlined />,
              label: <Link to="adminactivities">Activities</Link>,
            },
            {
              key: '10',
              icon: <GlobalOutlined />,
              label: <Link to="adminincoming">Incoming Tours</Link>,
            },
            {
              key: '11',
              icon: <SendOutlined />,
              label: <Link to="adminoutgoing">Outgoing Tours</Link>,
            },
            {
              key: '12',
              icon: <CustomerServiceOutlined />,
              label: <Link to="adminservicies">Services</Link>,
            },
            {
              key: '13',
              icon: <TagsOutlined />,
              label: <Link to="adminserviciescategory">Service Category</Link>,
            },
            {
              key: '14',
              icon: <FolderOpenOutlined />,
              label: <Link to="categoryincoming">Incoming Category</Link>,
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: 'margin-left 0.2s' }}>
        <Header className="custom-header"
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '24px',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="menu-toggle-btn"
            style={{
              fontSize: '18px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ fontSize: '16px', fontWeight: 500, color: '#1f1f1f' }}>
            Admin Panel
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminAppBar;
