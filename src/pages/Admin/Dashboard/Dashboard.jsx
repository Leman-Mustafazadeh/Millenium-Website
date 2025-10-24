import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Timeline } from 'antd';
import {
  UserOutlined,
  RocketOutlined,
  GlobalOutlined,
  TrophyOutlined,
  PictureOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import controller from '../../../API';
import { endpoints } from '../../../API/constant';
import './style.css';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [stats, setStats] = useState({
    activities: 0,
    incoming: 0,
    outgoing: 0,
    team: 0,
    awards: 0,
    services: 0,
    gallery: 0,
    popular: 0,
  });

  useEffect(() => {
    // Fetch all statistics
    const fetchStats = async () => {
      try {
        const [activities, incoming, outgoing, team, awards, services, gallery, popular] = await Promise.all([
          controller.getAll(endpoints.activity),
          controller.getAll(endpoints.incoming),
          controller.getAll(endpoints.outGoing),
          controller.getAll(endpoints.team),
          controller.getAll(endpoints.sertificate),
          controller.getAll(endpoints.services),
          controller.getAll(endpoints.gallery),
          controller.getAll(endpoints.popular),
        ]);

        setStats({
          activities: activities?.length || 0,
          incoming: incoming?.length || 0,
          outgoing: outgoing?.length || 0,
          team: team?.length || 0,
          awards: awards?.length || 0,
          services: services?.length || 0,
          gallery: gallery?.length || 0,
          popular: popular?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: 'Activities',
      value: stats.activities,
      icon: <RocketOutlined />,
      color: '#667eea',
      bgColor: 'rgba(102, 126, 234, 0.1)',
    },
    {
      title: 'Incoming Tours',
      value: stats.incoming,
      icon: <GlobalOutlined />,
      color: '#fa8c16',
      bgColor: 'rgba(250, 140, 22, 0.1)',
    },
    {
      title: 'Outgoing Tours',
      value: stats.outgoing,
      icon: <GlobalOutlined />,
      color: '#52c41a',
      bgColor: 'rgba(82, 196, 26, 0.1)',
    },
    {
      title: 'Team Members',
      value: stats.team,
      icon: <TeamOutlined />,
      color: '#13c2c2',
      bgColor: 'rgba(19, 194, 194, 0.1)',
    },
    {
      title: 'Awards',
      value: stats.awards,
      icon: <TrophyOutlined />,
      color: '#faad14',
      bgColor: 'rgba(250, 173, 20, 0.1)',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: <CustomerServiceOutlined />,
      color: '#eb2f96',
      bgColor: 'rgba(235, 47, 150, 0.1)',
    },
    {
      title: 'Gallery Images',
      value: stats.gallery,
      icon: <PictureOutlined />,
      color: '#722ed1',
      bgColor: 'rgba(114, 46, 209, 0.1)',
    },
    {
      title: 'Popular Tours',
      value: stats.popular,
      icon: <RiseOutlined />,
      color: '#f5222d',
      bgColor: 'rgba(245, 34, 45, 0.1)',
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div>
          <Title level={2} style={{ margin: 0, color: '#1f1f1f' }}>
            Welcome to Dashboard 👋
          </Title>
          <Text style={{ fontSize: '15px', color: '#8c8c8c' }}>
            Here's what's happening with your website today
          </Text>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
        {statsCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              className="stat-card"
              hoverable
              style={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                background: card.bgColor,
              }}
            >
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div 
                    className="stat-icon"
                    style={{ 
                      fontSize: '32px',
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </div>
                </div>
                <Statistic
                  value={card.value}
                  valueStyle={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: card.color,
                  }}
                />
                <Text style={{ fontSize: '14px', color: '#595959', fontWeight: 500 }}>
                  {card.title}
                </Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Overview */}
      <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
        {/* Total Content */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <RiseOutlined style={{ color: '#667eea', fontSize: '20px' }} />
                <Text strong style={{ fontSize: '16px' }}>Total Content Overview</Text>
              </Space>
            }
            className="overview-card"
            style={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="overview-content">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="overview-item">
                    <Text style={{ fontSize: '32px', fontWeight: 700, color: '#667eea' }}>
                      {stats.activities + stats.incoming + stats.outgoing}
                    </Text>
                    <Text style={{ color: '#8c8c8c', display: 'block' }}>Total Tours & Activities</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="overview-item">
                    <Text style={{ fontSize: '32px', fontWeight: 700, color: '#fa8c16' }}>
                      {stats.team}
                    </Text>
                    <Text style={{ color: '#8c8c8c', display: 'block' }}>Team Members</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="overview-item">
                    <Text style={{ fontSize: '32px', fontWeight: 700, color: '#52c41a' }}>
                      {stats.services}
                    </Text>
                    <Text style={{ color: '#8c8c8c', display: 'block' }}>Services</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="overview-item">
                    <Text style={{ fontSize: '32px', fontWeight: 700, color: '#722ed1' }}>
                      {stats.gallery}
                    </Text>
                    <Text style={{ color: '#8c8c8c', display: 'block' }}>Gallery Images</Text>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* Quick Info */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <TeamOutlined style={{ color: '#667eea', fontSize: '20px' }} />
                <Text strong style={{ fontSize: '16px' }}>Content Summary</Text>
              </Space>
            }
            className="info-card"
            style={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Timeline
              items={[
                {
                  color: '#667eea',
                  children: (
                    <div>
                      <Text strong>{stats.incoming}</Text> Incoming Tours available
                    </div>
                  ),
                },
                {
                  color: '#fa8c16',
                  children: (
                    <div>
                      <Text strong>{stats.outgoing}</Text> Outgoing Tours ready
                    </div>
                  ),
                },
                {
                  color: '#52c41a',
                  children: (
                    <div>
                      <Text strong>{stats.activities}</Text> Activities published
                    </div>
                  ),
                },
                {
                  color: '#722ed1',
                  children: (
                    <div>
                      <Text strong>{stats.awards}</Text> Awards & Certifications
                    </div>
                  ),
                },
                {
                  color: '#13c2c2',
                  children: (
                    <div>
                      <Text strong>{stats.popular}</Text> Popular destinations featured
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

