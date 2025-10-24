import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Upload, message, Select, Image, Tag, Tooltip, Input, Tabs, Row, Col, Divider } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, CustomerServiceOutlined, GlobalOutlined, CameraOutlined, FileTextOutlined, TagsOutlined } from "@ant-design/icons";

const { TextArea } = Input;
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";
import Cookies from "js-cookie";
import './style.css';

const AdminServices = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
          <div className="service-image-wrapper">
            <Image
              src={imageUrl}
              alt="Service"
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
      title: "Name",
      dataIndex: "name_AZ",
      key: "name_AZ",
      width: 200,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>{record.name_EN}</div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "text_AZ",
      key: "text_AZ",
      width: 250,
      render: (text) => (
        <Tooltip title={text}>
          <div style={{ color: '#595959', fontSize: '13px' }}>
            {text && text.length > 80 ? `${text.substring(0, 80)}...` : text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
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
    reader.onload = () => setImageBase64(reader.result); // Set base64 image string
    return false;
  };

  const handleDelete = async (id) => {
    try {
      await axios.get(BASE_URL + endpoints.delservice + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      });
      setServices(services.filter((service) => service.id !== id));
      message.success("Service deleted successfully!");
    } catch (error) {
      message.error("Error deleting service.");
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
      text_AZ: record.text_AZ,
      text_EN: record.text_EN,
      text_RU: record.text_RU,
    });
    setImageBase64(record.image); // Set the existing image in the modal
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    let cleanImageBase64 = imageBase64;
    if (cleanImageBase64 && cleanImageBase64.startsWith("data:image")) {
      cleanImageBase64 = cleanImageBase64.split(",")[1];
    }

    const serviceData = {
      id: currentId,
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      servicesCategoryId: values.servicesCategoryId || 0,
    };

    // Only add image if it exists
    if (cleanImageBase64) {
      serviceData.image = cleanImageBase64;
    }

    const addService = async () => {
      try {
        const token = Cookies.get("ftoken");
        if (!token) {
          message.error("Authentication token is missing. Please log in again.");
          return;
        }

        const response = await axios.post(BASE_URL + endpoints.addservice, serviceData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setServices([...services, { ...serviceData, id: services.length + 1 }]);
          message.success("Service added successfully!");
          closeModal();
        } else {
          message.error("Failed to add service.");
        }
      } catch (error) {
        handleError(error);
      }
    };

    const editService = async () => {
      try {
        const token = Cookies.get("ftoken");
        if (!token) {
          message.error("Authentication token is missing. Please log in again.");
          return;
        }

        // Remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(serviceData).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        const response = await axios.put(
          BASE_URL + endpoints.putservice + "/" + currentId,
          cleanObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setServices(
            services.map((service) =>
              service.id === currentId ? { ...serviceData, id: currentId } : service
            )
          );
          message.success("Service updated successfully!");
          closeModal();
        } else {
          message.error("Failed to update service.");
        }
      } catch (error) {
        handleError(error);
      }
    };

    if (editMode) {
      editService();
    } else {
      addService();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setCurrentId(null);
    setImageBase64(null);
  };

  const handleError = (error) => {
    if (error.response) {
      message.error(`Server error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      message.error("No response from the server. Please check your network.");
    } else {
      message.error(`Error: ${error.message}`);
    }
    console.error("Error in Axios request:", error);
  };

  useEffect(() => {
    const fetchServices = async () => {
      const res = await controller.getAll(endpoints.service);
      setServices(res);
    };

    fetchServices();
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

  const [serviceCategory, setServiceCategory] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await controller.getAll(endpoints.servicecategory);
      setServiceCategory(res);
    };

    fetchCategories();
  }, []);

  return (
    <div className="admin-services-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <CustomerServiceOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Services Management
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage all your services here
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-service-btn"
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
          Add New Service
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={services} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} services`,
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
              <CustomerServiceOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {editMode ? 'Edit Service' : 'Add New Service'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {editMode ? 'Update service details' : 'Create a new service'}
              </div>
            </div>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={750}
        className="custom-service-modal"
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Service Category"
            name="servicesCategoryId"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select
              size="large"
              placeholder="Select a Service Category"
              suffixIcon={<TagsOutlined style={{ color: '#8c8c8c' }} />}
              style={{ borderRadius: '8px' }}
              options={serviceCategory.map((item) => ({
                value: item.id,
                label: item.name_EN,
              }))}
            />
          </Form.Item>

          <div style={{ 
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            padding: '24px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center',
          }}>
            <Form.Item label="" name="image" style={{ marginBottom: 0 }}>
              <div className="image-upload-area">
                {imageBase64 ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={imageBase64}
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
                      <Form.Item name="name_AZ" label="Service Name" rules={[{ required: true, message: 'Please enter name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Xidmət adı" size="large" />
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
                      <Form.Item name="name_EN" label="Service Name">
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Service Name" size="large" />
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
                      <Form.Item name="name_RU" label="Service Name">
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Название услуги" size="large" />
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
              {editMode ? '✓ Update Service' : '+ Add Service'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminServices;
