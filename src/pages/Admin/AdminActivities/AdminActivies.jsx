import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Upload, message, Image, Tag, Space, Tooltip, Tabs, Row, Col, Divider, Input } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, RocketOutlined, GlobalOutlined, CameraOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';
import Cookies from 'js-cookie'
import './style.css';

const AdminActivities = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center',
      render: (id) => <Tag color="blue" style={{ fontWeight: 600 }}>#{id}</Tag>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      align: 'center',
      render: (image) => (
        <div className="activity-image-wrapper">
          <Image 
            src={BASE_URL+image} 
            alt="Activity" 
            width={80}
            height={80}
            style={{ 
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '2px solid #f0f0f0',
            }} 
            preview={{
              mask: <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <EyeOutlined /> Preview
              </div>
            }}
          />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title_AZ',
      key: 'title_AZ',
      width: 200,
      render: (text) => (
        <div style={{ fontWeight: 500, color: '#1f1f1f' }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'text_AZ',
      key: 'text_AZ',
      width: 300,
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          <div className="description-text">
            {text && text.length > 100 ? `${text.substring(0, 100)}...` : text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
            }}
          >
            Edit
          </Button>
          <Button 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={{ borderRadius: '8px' }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Get the base64 image data without the "data:image/xxx;base64," prefix
      const base64Data = reader.result.split(',')[1];
      setImageBase64(base64Data);
    };
    return false;
  };

  const handleDelete = (id) => {
    axios.get(BASE_URL+ endpoints.delactivity +"/"+ id, {
      headers: {
        Authorization: `Bearer ${Cookies.get("ftoken")}`,
      },
    }).then((res) => {
      setActivities(activities.filter(activity => activity.id !== id));
      message.success("Activity deleted successfully!");
    });
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      id: record.id,
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      title_AZ: record.title_AZ,
      title_EN: record.title_EN,
      title_RU: record.title_RU,
      text_AZ: record.text_AZ,
      text_EN: record.text_EN,
      text_RU: record.text_RU,
    });
    setImageBase64(record.image);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const token = Cookies.get("ftoken"); // Retrieve token from cookies
    if (!token) {
      message.error("Authentication token is missing. Please log in again.");
      return;
    }
  
    const object = {
      id: currentId, // Include the id if it's edit mode
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      title_AZ: values.title_AZ,
      title_EN: values.title_EN,
      title_RU: values.title_RU,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      isDeleted: false, // Ensure you handle the deletion flag correctly
    };

    // Only add image if it exists
    if (imageBase64) {
      object.image = imageBase64;
    }
  
    try {
      let response;
  
      if (editMode) {
        // If editing, send a PUT request to update the activity - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        response = await axios.put(
          `${BASE_URL}${endpoints.putactivity}/${currentId}`, // Updated API endpoint
          cleanObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
  
        if (response.data) {
          // Update activities locally after a successful edit
          setActivities(
            activities.map((item) => (item.id === currentId ? object : item))
          );
          message.success("Activity updated successfully!");
        }
      } else {
        // If not editing, send a POST request to create a new activity
        response = await axios.post(BASE_URL + endpoints.addactivity, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
  
        if (response.data) {
          // Add the new activity to the list
          setActivities([...activities, { ...object, id: activities.length + 1 }]);
          message.success("Activity added successfully!");
        }
      }
  
      // Close modal and reset form
      setIsModalVisible(false);
      form.resetFields();
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      if (error.response) {
        message.error(`Server Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        message.error("No response from the server. Please check your network.");
      } else {
        message.error(`Error: ${error.message}`);
      }
      console.error("Error in Axios request:", error);
    }
  };
  

  useEffect(() => {
    controller.getAll(endpoints.activity).then((res) => {
      setActivities(res);
    });
  }, []);

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImageBase64(null);
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <div className="admin-activities-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            Activities Management
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage all your activities content here
          </p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={showModal} 
          size="large"
          className="add-activity-btn"
          style={{ 
            borderRadius: '10px',
            height: '44px',
            fontSize: '15px',
            fontWeight: 500,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          }}
        >
          Add New Activity
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={activities} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} activities`,
          style: { marginTop: '24px' }
        }}
        scroll={{ x: 1000 }}
      />

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '20px',
            }}>
              <RocketOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {editMode ? 'Edit Activity' : 'Add New Activity'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {editMode ? 'Update activity details' : 'Create a new activity'}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={780}
        className="custom-activity-modal"
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Image Upload */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            padding: '24px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center',
          }}>
            <Form.Item label="" name="image" style={{ marginBottom: 0 }}>
              <div className="image-upload-area">
                {imageBase64 ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={`data:image/png;base64,${imageBase64}`}
                      alt="Preview"
                      style={{
                        width: '160px', height: '120px', borderRadius: '12px',
                        objectFit: 'cover', border: '4px solid white',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                      }}
                    />
                    <Upload name="image" maxCount={1} beforeUpload={beforeUpload} showUploadList={false}>
                      <Button
                        type="primary" shape="circle" icon={<CameraOutlined />} size="large"
                        style={{
                          position: 'absolute', bottom: '-10px', right: '-10px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                        }}
                      />
                    </Upload>
                  </div>
                ) : (
                  <Upload name="image" maxCount={1} beforeUpload={beforeUpload} showUploadList={false}>
                    <div style={{
                      width: '160px', height: '120px', margin: '0 auto', borderRadius: '12px',
                      border: '3px dashed #667eea', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      background: 'white', transition: 'all 0.3s ease',
                    }} className="upload-placeholder">
                      <CameraOutlined style={{ fontSize: '32px', color: '#667eea', marginBottom: '8px' }} />
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Upload Image</div>
                    </div>
                  </Upload>
                )}
              </div>
            </Form.Item>
          </div>

          {/* Multilingual Tabs */}
          <Tabs
            defaultActiveKey="1"
            className="custom-form-tabs"
            items={[
              {
                key: '1',
                label: <span><GlobalOutlined /> Azerbaijani</span>,
                children: (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item name="name_AZ" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Ad" size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="title_AZ" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
                        <Input placeholder="Başlıq" size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="text_AZ" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
                        <TextArea placeholder="Təsvir" rows={4} />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
              {
                key: '2',
                label: <span><GlobalOutlined /> English</span>,
                children: (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item name="name_EN" label="Name">
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Name" size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="title_EN" label="Title">
                        <Input placeholder="Title" size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="text_EN" label="Description">
                        <TextArea placeholder="Description" rows={4} />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
              {
                key: '3',
                label: <span><GlobalOutlined /> Russian</span>,
                children: (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item name="name_RU" label="Name">
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Название" size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="title_RU" label="Title">
                        <Input placeholder="Заголовок" size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="text_RU" label="Description">
                        <TextArea placeholder="Описание" rows={4} />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
            ]}
          />

          <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
            <Button 
              type="primary" htmlType="submit" block size="large"
              style={{
                height: '48px', fontSize: '16px', fontWeight: 600, borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              }}
              className="modal-submit-btn"
            >
              {editMode ? '✓ Update Activity' : '+ Add Activity'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminActivities;
