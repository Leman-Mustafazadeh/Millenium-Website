import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Upload, message, Image, Tag, Tooltip, Input, Tabs, Row, Col, Divider } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, SendOutlined, GlobalOutlined, CameraOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';
import Cookies from 'js-cookie';
import './style.css';

const AdminOutgoing = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [outgoingItems, setOutgoingItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [image, setImage] = useState(null);
  const [outGoingImages, setOutGoingImages] = useState([null, null, null, null]);

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
      render: (image) => {
        if (!image) return null;
        const isFromServer = image.includes("uploads");
        const src = isFromServer ? BASE_URL + image : `data:image/jpeg;base64,${image}`;

        return (
          <div className="outgoing-image-wrapper">
            <Image
            src={src}
            alt="Outgoing"
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
      title: 'Name',
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
      await axios.delete(BASE_URL + endpoints.deloutgoing + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      }); // API call for deletion
      setOutgoingItems(outgoingItems.filter(item => item.id !== id));
      message.success("Item deleted successfully!");
    } catch (error) {
      message.error("Error deleting item.");
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
    setOutGoingImages(record.outGoingImages?.map(imgObj => imgObj.base64) || [null, null, null, null]);
    setIsModalVisible(true);
  };

  const beforeUpload = (file, index) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result.split(',')[1];  // The part after the comma is the actual base64 string
      if (index === "main") {
        setImage(base64Image);
      } else {
        const newImages = [...outGoingImages];
        newImages[index] = base64Image;
        setOutGoingImages(newImages);
      }
    };
    return false;  // Prevent auto-upload of the image to the server
  };

  const onFinish = async (values) => {
    const outgoingImageObjects = outGoingImages
      .map((img, index) => ({
        image: `Image ${index + 1}`,
        base64: img || '', // Only include the base64 string if it exists
      }))
      .filter(img => img.base64); // Filter out empty base64 values (i.e., images that weren't uploaded)

    const object = {
      id: currentId,
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
    };

    // Only add image if it exists
    if (image) {
      object.image = image;
    }

    // Only add outGoingImages if array is not empty
    if (outgoingImageObjects && outgoingImageObjects.length > 0) {
      object.outGoingImages = outgoingImageObjects;
    }

    try {
      const token = Cookies.get("ftoken");
      console.log(token, "tokenleman");
      if (!token) {
        message.error("Authentication token is missing. Please log in again.");
        return;
      }

      if (editMode) {
        // PUT request to update-outgoing endpoint - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        const response = await axios.put(
          `${BASE_URL}${endpoints.putoutgoing}/${currentId}`,
          cleanObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }
        );
        if (response) {
          setOutgoingItems(
            outgoingItems.map((item) => (item.id === currentId ? { ...object, id: currentId } : item))
          );
          message.success("Outgoing item updated successfully!");
        } else {
          message.error("Failed to update outgoing item.");
        }
      } else {
        // POST request to addoutgoing endpoint (create mode)
        const response = await axios.post(BASE_URL + endpoints.addoutgoing, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (response.data) {
          setOutgoingItems([...outgoingItems, { ...object, id: outgoingItems.length + 1 }]);
          message.success("Outgoing item added successfully!");
        } else {
          message.error("Failed to add outgoing item.");
        }
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditMode(false);
      setCurrentId(null);
      setImage(null);
      setOutGoingImages([null, null, null, null]);
    } catch (error) {
      message.error("Error occurred while saving data.");
    }
  };

  useEffect(() => {
    const fetchOutgoingItems = async () => {
      const res = await controller.getAll(endpoints.outgoing);
      setOutgoingItems(res);
    };

    fetchOutgoingItems();
  }, []);

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage(null);
    setOutGoingImages([null, null, null, null]);
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <div className="admin-outgoing-container">
      <div className="page-header">
    <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <SendOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Outgoing Tours
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage outgoing tour packages
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-outgoing-btn"
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
        Add New Outgoing Item
      </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={outgoingItems} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
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
              <SendOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {editMode ? 'Edit Outgoing Tour' : 'Add New Outgoing Tour'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {editMode ? 'Update tour details' : 'Create a new outgoing tour package'}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={850}
        className="custom-outgoing-modal"
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea08 0%, #764ba208 100%)',
            padding: '24px', borderRadius: '12px', marginBottom: '24px',
            border: '1px solid #f0f0f0',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f0f0f0'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
              }}>
                <CameraOutlined />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#1f1f1f', fontSize: '15px' }}>Tour Images</div>
                <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Main cover + 4 gallery photos</div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: 600, 
                color: '#595959', 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#667eea'
                }}></div>
                Main Cover Image
              </div>
              <Form.Item label="" name="main_image" style={{ marginBottom: 0 }}>
                {image ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={(image && !image.startsWith("/uploads")) ? `data:image/jpeg;base64,${image}` : `${BASE_URL}${image}`}
                      alt="Main"
                  style={{
                        width: '100%', 
                        maxWidth: '350px', 
                        height: 'auto', 
                        borderRadius: '12px',
                        border: '3px solid white',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)',
                      }}
                    />
                    <Upload name="main_image" maxCount={1} beforeUpload={(file) => beforeUpload(file, "main")} showUploadList={false}>
                      <Button
                        type="primary" 
                        icon={<CameraOutlined />} 
                        size="large"
                        style={{
                          position: 'absolute', 
                          bottom: '12px', 
                          right: '12px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.5)',
                          borderRadius: '8px',
                          height: '40px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                        }}
                      >
                        Change
                      </Button>
                    </Upload>
                  </div>
                ) : (
                  <Upload name="main_image" maxCount={1} beforeUpload={(file) => beforeUpload(file, "main")} showUploadList={false}>
                    <div style={{
                      width: '100%',
                      maxWidth: '350px',
                      height: '220px', 
                      borderRadius: '12px',
                      border: '2px dashed #667eea', 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      cursor: 'pointer',
                      background: 'white', 
                      transition: 'all 0.3s ease',
                    }} 
                    className="upload-placeholder"
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#764ba2';
                      e.currentTarget.style.background = '#fafbff';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    >
                      <CameraOutlined style={{ fontSize: '42px', color: '#667eea', marginBottom: '12px' }} />
                      <div style={{ fontSize: '14px', color: '#1f1f1f', fontWeight: 500, marginBottom: '4px' }}>Upload Main Cover</div>
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Click or drag image here</div>
              </div>
                  </Upload>
            )}
          </Form.Item>
            </div>

            <div>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: 600, 
                color: '#595959', 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#667eea'
                }}></div>
                Gallery Photos (Optional)
              </div>
              <Row gutter={[16, 16]}>
          {Array.from({ length: 4 }).map((_, index) => (
                  <Col span={6} key={index}>
                    <Form.Item style={{ marginBottom: 0 }}>
                      {outGoingImages[index] ? (
                        <div style={{ position: 'relative' }}>
                          <img
                            src={`data:image/jpeg;base64,${outGoingImages[index]}`}
                            alt={`Gallery ${index + 1}`}
                            style={{
                              width: '100%', 
                              height: '130px', 
                              borderRadius: '10px',
                              objectFit: 'cover', 
                              border: '2px solid white',
                              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                            }}
                          />
                          <Upload name={`outGoingImage${index + 1}`} maxCount={1} beforeUpload={(file) => beforeUpload(file, index)} showUploadList={false}>
                            <Button
                              type="primary" 
                              shape="circle" 
                              icon={<CameraOutlined />}
                              style={{
                                position: 'absolute', 
                                bottom: '8px', 
                                right: '8px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none', 
                                width: '36px', 
                                height: '36px',
                                fontSize: '15px', 
                                boxShadow: '0 3px 10px rgba(102, 126, 234, 0.4)',
                              }}
                            />
                          </Upload>
                        </div>
                      ) : (
                        <Upload name={`outGoingImage${index + 1}`} maxCount={1} beforeUpload={(file) => beforeUpload(file, index)} showUploadList={false}>
                          <div style={{
                            width: '100%', 
                            height: '130px', 
                            borderRadius: '10px',
                            border: '2px dashed #d9d9d9', 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            cursor: 'pointer',
                            background: '#fafafa', 
                            transition: 'all 0.3s ease',
                          }} 
                          className="upload-placeholder-small"
                          onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = '#667eea';
                            e.currentTarget.style.background = 'white';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = '#d9d9d9';
                            e.currentTarget.style.background = '#fafafa';
                          }}
                          >
                            <CameraOutlined style={{ fontSize: '28px', color: '#bfbfbf', marginBottom: '6px' }} />
                            <div style={{ 
                              fontSize: '11px', 
                              color: '#8c8c8c',
                              background: '#f0f0f0',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: 500
                            }}>Photo {index + 1}</div>
                          </div>
              </Upload>
              )}
            </Form.Item>
                  </Col>
                ))}
              </Row>
            </div>
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
                      <Form.Item name="name_AZ" label="Tour Name" rules={[{ required: true, message: 'Please enter name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Tur adı" size="large" />
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
                      <Form.Item name="name_EN" label="Tour Name">
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Tour Name" size="large" />
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
                      <Form.Item name="name_RU" label="Tour Name">
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Название тура" size="large" />
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
              {editMode ? '✓ Update Tour' : '+ Add Tour'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminOutgoing;
