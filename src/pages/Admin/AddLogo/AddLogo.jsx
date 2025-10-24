import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Image,
  Tag,
  Tabs,
  Row,
  Col,
  Divider,
} from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, AppstoreOutlined, GlobalOutlined, CameraOutlined, FileTextOutlined, LinkOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";
import Cookies from 'js-cookie';
import './style.css';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64 = reader.result;
      if (base64) {
        base64 = base64.split(",")[1];
      }
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const AddLogo = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
      title: "Logo",
      dataIndex: "image",
      key: "image",
      width: 120,
      align: 'center',
      render: (image) => {
        if (!image) return null;
        const isFromServer = image.includes("uploads");
        const src = isFromServer ? BASE_URL + image : `data:image/jpeg;base64,${image}`;

        return (
          <div className="logo-image-wrapper">
            <Image
              src={src}
              alt="Logo"
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
      }
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
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 200,
      render: (link) => (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', fontSize: '13px' }}>
          {link?.length > 30 ? `${link.substring(0, 30)}...` : link}
        </a>
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

  const beforeUpload = async (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    setImageFile(file);

    // Generate preview
    const preview = await getBase64(file);
    setPreviewImage(`data:image/jpeg;base64,${preview}`);

    return false;
  };

  const handleEdit = (record) => {
    setCurrentBlogId(record.id);
    form.setFieldsValue({
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      link: record.link,
    });
    setPreviewImage(BASE_URL + record.image);
    setImageFile(null);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    axios.get(BASE_URL + endpoints.dellogo + "/" + id,
      { headers: { Authorization: `Bearer ${Cookies.get("ftoken")}` } }).then((res) => {
        console.log(res);
      });
    setBlogs(blogs.filter((blog) => blog.id !== id));
    message.success("Blog deleted successfully!");
  };

  const onFinish = async (values) => {
    try {
      const token = Cookies.get("ftoken");
      if (!token) {
        message.error("Token not found. Please log in again.");
        return;
      }

      if (!imageFile && !currentBlogId) {
        message.error("Please upload an image.");
        return;
      }

      const image = imageFile ? await getBase64(imageFile) : null;

      const object = {
        name_AZ: values.name_AZ,
        name_EN: values.name_EN,
        name_RU: values.name_RU,
        link: values.link,
        isDeleted: false,
      };

      // Only add image if it exists
      if (image) {
        object.image = image;
      }

      let response;
      console.log(currentBlogId);

      if (currentBlogId) {
        // PUT request for update - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        response = await axios.put(
          `${BASE_URL}${endpoints.putlogo.replace("{id}", currentBlogId)}`,
          cleanObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(BASE_URL + endpoints.addlogo, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        if (currentBlogId) {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog.id === currentBlogId ? { ...blog, ...object } : blog
            )
          );
          message.success("Blog updated successfully!");
        } else {
          setBlogs([...blogs, { id: response.data.id, ...object }]);
          message.success("Blog added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setCurrentBlogId(null);
        setImageFile(null);
        setPreviewImage(null);
      } else {
        message.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        message.error(
          `Server Error: ${error.response.status} - ${error.response.data}`
        );
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    controller.getAll(endpoints.logo).then((res) => {
      console.log(res);
      const formattedBlogs = res
        .filter((blog) => !blog.isDeleted)
        .map((blog) => ({
          ...blog,
          image: blog.image.startsWith("data:")
            ? blog.image
            : `${blog.image}`,
        }));
      setBlogs(formattedBlogs);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentBlogId(null);
    form.resetFields();
    setImageFile(null);
    setPreviewImage(null);
  };

  return (
    <div className="add-logo-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <AppstoreOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Logos & Partners
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage partner logos and links
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-logo-btn"
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
          Add New Logo
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={blogs} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} logos`,
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
              <AppstoreOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {currentBlogId ? 'Edit Logo' : 'Add New Logo'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {currentBlogId ? 'Update partner logo details' : 'Add a new partner logo'}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={720}
        className="custom-logo-modal"
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            padding: '24px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center',
          }}>
            <Form.Item label="" name="image" style={{ marginBottom: 0 }}>
              <div className="image-upload-area">
                {previewImage ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        width: '140px', height: '140px', borderRadius: '12px',
                        objectFit: 'contain', border: '4px solid white',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                        background: 'white',
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
                      width: '140px', height: '140px', margin: '0 auto', borderRadius: '12px',
                      border: '3px dashed #667eea', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      background: 'white', transition: 'all 0.3s ease',
                    }} className="upload-placeholder">
                      <CameraOutlined style={{ fontSize: '32px', color: '#667eea', marginBottom: '8px' }} />
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Upload Logo</div>
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
                      <Form.Item name="name_AZ" label="Partner Name" rules={[{ required: true, message: 'Please enter name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Tərəfdaş adı" size="large" />
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
                      <Form.Item name="name_EN" label="Partner Name" rules={[{ required: true, message: 'Please enter name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Partner Name" size="large" />
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
                      <Form.Item name="name_RU" label="Partner Name" rules={[{ required: true, message: 'Please enter name' }]}>
                        <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Имя партнера" size="large" />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
            ]}
          />

          <Divider style={{ margin: '24px 0' }} />

          <Form.Item name="link" label="Website Link" rules={[{ required: true, message: 'Please enter website link' }]}>
            <Input prefix={<LinkOutlined style={{ color: '#8c8c8c' }} />} placeholder="https://example.com" size="large" />
          </Form.Item>

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
              {currentBlogId ? '✓ Update Logo' : '+ Add Logo'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddLogo;
