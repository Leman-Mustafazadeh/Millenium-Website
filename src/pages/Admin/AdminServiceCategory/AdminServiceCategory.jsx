import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, message, Tag, Input, Tabs, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, TagsOutlined, GlobalOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';
import Cookies from 'js-cookie';
import './style.css';

const AdminServiceCategory = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
      title: 'Category Name',
      dataIndex: 'name_AZ',
      key: 'name_AZ',
      width: 250,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f', marginBottom: '4px' }}>
            <TagsOutlined style={{ marginRight: '6px', color: '#667eea' }} />
            {text}
          </div>
          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.name_EN}</div>
        </div>
      ),
    },
    {
      title: 'Russian Name',
      dataIndex: 'name_RU',
      key: 'name_RU',
      width: 200,
      render: (text) => <span style={{ color: '#595959' }}>{text}</span>,
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
            onClick={() => handleDelete(record?.id)}
            style={{ borderRadius: '8px' }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.get(BASE_URL + endpoints.delservicecategory + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      });
      setCategories(categories.filter(category => category.id !== id));
      message.success("Category deleted successfully!");
    } catch (error) {
      message.error("Error deleting category.");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
    });
    setIsModalVisible(true);
  };


  const onFinish = async (values) => {
    const object = {
      id: currentId || 0, // New items will have an ID of 0
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      isDeleted: false, // Default to false
    };

    try {
      const token = Cookies.get("ftoken");
      if (!token) {
        message.error("Authentication token is missing. Please log in again.");
        return;
      }

      let response;

      if (editMode) {
        // PUT request for update - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        response = await axios.put(
          `${BASE_URL + endpoints.putservicecategory}/${currentId}`,
          cleanObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.data) {
          setCategories(categories.map((category) => (category.id === currentId ? object : category)));
          message.success("Category updated successfully!");
          setIsModalVisible(false);
          form.resetFields();
          setEditMode(false);
          setCurrentId(null);
        } else {
          message.error("Failed to update category.");
        }
      } else {
        // POST request for create
        response = await axios.post(BASE_URL + endpoints.addservicecategory, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.data) {
          setCategories([...categories, { ...object, id: categories.length + 1 }]);
          message.success("Category added successfully!");
          setIsModalVisible(false);
          form.resetFields();
          setEditMode(false);
          setCurrentId(null);
        } else {
          message.error("Failed to add category.");
        }
      }
    } catch (error) {
      message.error("Error occurred while saving data.");
      console.error("Error in Axios request:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await controller.getAll(endpoints.servicecategory);
      setCategories(res);
    };

    fetchCategories();
  }, []);

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <div className="admin-service-category-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <TagsOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Service Categories
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage service categories
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-category-btn"
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
          Add New Category
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={categories} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} categories`,
        }}
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
              <TagsOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {editMode ? 'Edit Category' : 'Add New Category'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {editMode ? 'Update category details' : 'Create a new service category'}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={650}
        className="custom-category-modal"
        style={{ top: 40 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
                      <Form.Item
                        name="name_AZ"
                        label="Category Name"
                        rules={[{ required: true, message: 'Please enter category name' }]}
                      >
                        <Input 
                          prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />}
                          placeholder="Kateqoriya adı" 
                          size="large"
                        />
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
                      <Form.Item
                        name="name_EN"
                        label="Category Name"
                        rules={[{ required: true, message: 'Please enter category name' }]}
                      >
                        <Input 
                          prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />}
                          placeholder="Category Name" 
                          size="large"
                        />
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
                      <Form.Item
                        name="name_RU"
                        label="Category Name"
                        rules={[{ required: true, message: 'Please enter category name' }]}
                      >
                        <Input 
                          prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />}
                          placeholder="Название категории" 
                          size="large"
                        />
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
              {editMode ? '✓ Update Category' : '+ Add Category'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminServiceCategory;
