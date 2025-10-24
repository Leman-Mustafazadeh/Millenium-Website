import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Upload, message, Table, Image, Tag, Tooltip, Tabs, Row, Col } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, FolderOpenOutlined, GlobalOutlined, CameraOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';
import Cookies from 'js-cookie';
import './style.css';

const CategoryIncoming = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [image, setImage] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

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
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 120,
      align: 'center',
      render: (image) => {
        const isBase64 = image && !image.startsWith("/uploads");
        const imageUrl = isBase64
          ? `data:image/jpeg;base64,${image}` 
          : `${BASE_URL}${image}`;

        return (
          <div className="category-image-wrapper">
            <Image
              src={imageUrl}
              alt="Category"
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
        );
      },
    },
    {
      title: 'Category Name',
      dataIndex: 'name_AZ',
      key: 'name_AZ',
      width: 200,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>{record.name_EN}</div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'text_AZ',
      key: 'text_AZ',
      width: 250,
      render: (text) => (
        <Tooltip title={text}>
          <div style={{ color: '#595959', fontSize: '13px' }}>
            {text && text.length > 60 ? `${text.substring(0, 60)}...` : text}
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + endpoints.delcategoryincoming + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      });
      setCategories(categories?.filter(item => item.id !== id));
      message.success("Category deleted successfully!");
    } catch (error) {
      message.error("Error deleting category.");
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      text_AZ: record.text_AZ,
      text_EN: record.text_EN,
      text_RU: record.text_RU,
    });
    setImage(record.image);
    setIsDeleted(record.isDeleted);
    setIsModalVisible(true);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result); // Store the image base64 string
    };
    return false; // Prevent auto-upload
  };

  const onFinish = async (values) => {
    const categoryData = {
      id: currentId,
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      isDeleted: false,
    };

    // Only add image if it exists
    if (image) {
      categoryData.image = image.split(',')[1]; // Send the base64 string without the data:image/*;base64, prefix
    }

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
          Object.entries(categoryData).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        response = await axios.put(
          `${BASE_URL + endpoints.putcategoryincoming}/${currentId}`,
          cleanObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // POST request for create
        response = await axios.post(
          BASE_URL + endpoints.addcategoryincoming,
          categoryData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.data) {
        if (editMode) {
          setCategories(categories?.map((item) => (item.id === currentId ? { ...item, ...categoryData } : item)));
          message.success("Category updated successfully!");
        } else {
          setCategories([...categories, { ...categoryData, id: response.data.id }]);
          message.success("Category added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
        setImage(null);
      } else {
        message.error("Failed to add or update category.");
      }
    } catch (error) {
      message.error("Error occurred while saving data.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await controller.getAll(endpoints.categoryincoming);
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
    setImage(null);
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <div className="category-incoming-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <FolderOpenOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Incoming Categories
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage incoming tour categories
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
                <FolderOpenOutlined />
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                  {editMode ? 'Edit Category' : 'Add New Category'}
                </div>
                <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                  {editMode ? 'Update category information' : 'Create a new incoming category'}
                </div>
              </div>
            </div>
          }
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={720}
          className="custom-category-modal"
          style={{ top: 20 }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
              padding: '24px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center',
            }}>
              <Form.Item label="" name="image" style={{ marginBottom: 0 }}>
                <div className="image-upload-area">
                  {image ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={image}
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
                        <Form.Item name="name_AZ" label="Category Name" rules={[{ required: true, message: 'Please enter name' }]}>
                          <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Ad" size="large" />
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
                        <Form.Item name="name_EN" label="Category Name" rules={[{ required: true, message: 'Please enter name' }]}>
                          <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Name" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="text_EN" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
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
                        <Form.Item name="name_RU" label="Category Name" rules={[{ required: true, message: 'Please enter name' }]}>
                          <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Название" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="text_RU" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
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
                {editMode ? '✓ Update Category' : '+ Add Category'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    </div>
  );
};

export default CategoryIncoming;
