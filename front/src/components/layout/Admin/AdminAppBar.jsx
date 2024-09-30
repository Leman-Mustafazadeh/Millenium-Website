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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <Link style={{padding:0}} to="/admin">Dashboard</Link>,
              /* label: 'User', */
            },
            {
              key: '2',
              icon: <Link style={{padding:0}} to="hero">Hero Area</Link> ,
            },
            {
              key: '3',
              icon: <Link style={{padding:0}} to="blogadmin">Blogs</Link> ,
            },
            
            {
              key: '4',
              icon: <Link style={{padding:0}} to="adminpopular">Admin Popular Team</Link> ,
            },
            {
              key: '5',
              icon: <Link style={{padding:0}} to="adminblog">AdminBlog</Link> ,
            },
            {
              key: '6',
              icon: <Link style={{padding:0}} to="admintourm">AdminTourm</Link> ,
            },
            {
              key: '7',
              icon: <Link style={{padding:0}} to="teamadmin">Admin Team</Link> ,
            },
            {
              key: '8',
              icon: <Link style={{padding:0}} to="awardsadmin">Admin Awards</Link> ,
            },
            {
              key: '9',
              icon: <Link style={{padding:0}} to="adminactivities">Admin Activities</Link> ,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
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
