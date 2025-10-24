import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Upload, message, Input, Image, Tag, Tabs, Row, Col } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, StarOutlined, GlobalOutlined, CameraOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';
import Cookies from 'js-cookie';
import './style.css';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
      reject(error);
    };
  });
};

const AdminPopular = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popularItems, setPopularItems] = useState([]);
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
      render: (id) => <Tag color="gold" style={{ fontWeight: 600 }}>#{id}</Tag>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      align: 'center',
      render: (image) => (
        <div className="popular-image-wrapper">
          <Image
            src={BASE_URL + image}
            alt="Popular"
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
      title: 'Tour Name',
      dataIndex: 'name_AZ',
      key: 'name_AZ',
      width: 250,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f', marginBottom: '4px' }}>
            <StarOutlined style={{ color: '#faad14', marginRight: '6px' }} />
            {text}
          </div>
          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.name_EN}</div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
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
        </div>
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
      const base64String = reader.result.split(",")[1]; // Remove the prefix
      setImageBase64(base64String);
    };
    return false; // Prevent auto-upload by the Upload component
  };

  const handleDelete = async (id) => {
    try {
      await axios.get(BASE_URL + endpoints.deltour + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      });
      message.success("Popular item deleted successfully!");
      setPopularItems(popularItems.filter(item => item.id !== id));
    } catch (error) {
      message.error("Failed to delete popular item.");
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      id: record.id,
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      isDeleted: record.isDeleted,
    });
    setImageBase64(record.image);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const object = {
        id: currentId,
        name_AZ: values.name_AZ,
        name_EN: values.name_EN,
        name_RU: values.name_RU,
        isDeleted: false,
      };

      // Only add image if it exists
      if (imageBase64) {
        object.image = imageBase64;
      }

      const token = Cookies.get("ftoken");

      if (editMode) {
        // PUT request to update the item - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        const response = await axios.put(BASE_URL + endpoints.puttour + `/${currentId}`, cleanObject, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 || response.status === 201) {
          setPopularItems(
            popularItems.map((item) => (item.id === currentId ? { ...item, ...object } : item))
          );
          message.success("Popular item updated successfully!");
        } else {
          message.error("Failed to update popular item.");
        }
      } else {
        // Send POST request to add a new item
        const response = await axios.post(BASE_URL + endpoints.addtour, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 || response.status === 201) {
          setPopularItems((prevItems) => [
            ...prevItems,
            { ...object, id: response.data.id }, // Use the ID returned by the server
          ]);
          message.success("Popular item added successfully!");
        } else {
          message.error("Failed to add popular item.");
        }
      }

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
    controller.getAll(endpoints.tour).then((res) => {
      setPopularItems(res);
      console.log(res);
    });
  }, []);

  console.log(popularItems);

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
    <div className="admin-popular-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <StarOutlined style={{ marginRight: '8px', color: '#faad14' }} />
            Popular Tours
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage popular tour destinations
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-popular-btn"
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
          Add New Popular Item
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={popularItems} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} tours`,
        }}
        scroll={{ x: 900 }}
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
              <StarOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {editMode ? 'Edit Popular Tour' : 'Add New Popular Tour'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {editMode ? 'Update tour details' : 'Create a new popular destination'}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={650}
        className="custom-popular-modal"
        style={{ top: 40 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ isDeleted: false }}>
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
                      <Form.Item name="name_AZ" label="Tour Name" rules={[{ required: true, message: 'Please enter tour name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Tur adı" size="large" />
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
                      <Form.Item name="name_EN" label="Tour Name" rules={[{ required: true, message: 'Please enter tour name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Tour Name" size="large" />
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
                      <Form.Item name="name_RU" label="Tour Name" rules={[{ required: true, message: 'Please enter tour name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Название тура" size="large" />
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
              {editMode ? '✓ Update Tour' : '+ Add Tour'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPopular;
