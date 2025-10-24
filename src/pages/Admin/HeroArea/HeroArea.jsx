import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, PictureOutlined, GlobalOutlined, CameraOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Table, Upload, message, Image, Tag, Input, Tabs, Row, Col } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import controller from "../../../API";
import { BASE_URL, endpoints } from "../../../API/constant";
import Cookies from "js-cookie";
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

const HeroArea = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [heroItems, setHeroItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
      render: (image) => (
        <div className="hero-image-wrapper">
          <Image
            src={BASE_URL + image}
            alt="Hero"
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
      title: "Hero Title",
      dataIndex: "name_AZ",
      key: "name_AZ",
      width: 250,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>{record.name_EN}</div>
        </div>
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

  const handleDelete = (id) => {
    axios
      .get(BASE_URL + endpoints.delhero + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      })
      .then((res) => {
        console.log(res);
      });

    setHeroItems(heroItems.filter((item) => item.id !== id));
    message.success("Hero item deleted successfully!");
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
    });
    setImagePreview(BASE_URL + record.image);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const base64Image = values.image?.file
        ? await getBase64(values.image.file)
        : null;

      const strippedBase64 = base64Image
        ? base64Image.replace(/^data:image\/[a-z]+;base64,/, "")
        : "";

      const object = {
        id: currentId,
        name_AZ: values.name_AZ,
        name_EN: values.name_EN,
        name_RU: values.name_RU,
      };

      // Only add image if it exists
      if (strippedBase64) {
        object.image = strippedBase64;
      }

      const token = Cookies.get("ftoken");
      if (!token) {
        message.error("Authentication token is missing. Please log in again.");
        return;
      }

      if (editMode) {
        // PUT request for update - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        const response = await axios.put(
          `${BASE_URL}${endpoints.puthero}/${currentId}`,
          cleanObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setHeroItems((prevItems) =>
            prevItems.map((item) =>
              item.id === currentId ? { ...item, ...object } : item
            )
          );
          message.success("Hero item updated successfully!");
        } else {
          message.error("Failed to update hero item.");
        }
      } else {
        const response = await axios.post(BASE_URL + endpoints.addhero, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setHeroItems([...heroItems, { ...object, id: response.data.id }]);
          message.success("Hero item added successfully!");
        } else {
          message.error("Failed to add hero item.");
        }
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditMode(false);
      setCurrentId(null);
      setImagePreview(null);
    } catch (error) {
      if (error.response) {
        message.error(
          `Server Error: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        message.error("No response from the server. Please check your network.");
      } else {
        message.error(`Error: ${error.message}`);
      }
      console.error("Error in Axios request:", error);
    }
  };

  useEffect(() => {
    controller.getAll(endpoints.hero).then((res) => {
      setHeroItems(res);
    });
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
    setImagePreview(null);
  };

  const beforeUpload = async (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    try {
      const base64 = await getBase64(file);
      setImagePreview(base64);
    } catch (error) {
      console.error("Error generating image preview:", error);
    }
    return false;
  };

  return (
    <div className="hero-area-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <PictureOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Hero Area
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage hero section slides
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-hero-btn"
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
          Add New Hero Item
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={heroItems} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} slides`,
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
              <PictureOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {editMode ? 'Edit Hero Slide' : 'Add New Hero Slide'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {editMode ? 'Update slide details' : 'Create a new hero section slide'}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={650}
        className="custom-hero-modal"
        style={{ top: 40 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            padding: '24px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center',
          }}>
            <Form.Item label="" name="image" style={{ marginBottom: 0 }}>
              <div className="image-upload-area">
                {imagePreview ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: '100%', height: 'auto', maxHeight: '200px',
                        borderRadius: '12px', objectFit: 'contain',
                        border: '4px solid white',
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
                      width: '200px', height: '150px', margin: '0 auto',
                      borderRadius: '12px', border: '3px dashed #667eea',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', background: 'white',
                      transition: 'all 0.3s ease',
                    }} className="upload-placeholder">
                      <CameraOutlined style={{ fontSize: '40px', color: '#667eea', marginBottom: '12px' }} />
                      <div style={{ fontSize: '14px', color: '#8c8c8c', fontWeight: 500 }}>Upload Hero Image</div>
                      <div style={{ fontSize: '12px', color: '#bfbfbf', marginTop: '4px' }}>Click to browse</div>
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
                      <Form.Item name="name_AZ" label="Slide Title" rules={[{ required: true, message: 'Please enter slide title' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Başlıq" size="large" />
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
                      <Form.Item name="name_EN" label="Slide Title" rules={[{ required: true, message: 'Please enter slide title' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Title" size="large" />
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
                      <Form.Item name="name_RU" label="Slide Title" rules={[{ required: true, message: 'Please enter slide title' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Заголовок" size="large" />
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
              {editMode ? '✓ Update Slide' : '+ Add Slide'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HeroArea;
