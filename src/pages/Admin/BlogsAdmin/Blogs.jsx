import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Upload, message, Image, Tag } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, FileTextOutlined, CameraOutlined, PictureOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import Cookies from "js-cookie";
import controller from "../../../API";
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

const Blogs = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tourImages, setTourImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
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
      title: "Gallery Image",
      dataIndex: "image",
      key: "image",
      width: 150,
      align: 'center',
      render: (image) => {
        const imageSrc = image.startsWith("http") ? image : `${image}`;
        return (
          <div className="gallery-image-wrapper">
            <Image
              src={BASE_URL + imageSrc}
              alt="Gallery"
              width={100}
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
    try {
      const base64 = await getBase64(file);
      setImagePreview(base64);
    } catch (error) {
      console.error("Error generating image preview:", error);
    }
    return false;
  };

  const handleDelete = async (id) => {
    try {
      await axios.get(BASE_URL + endpoints.delgallery + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      });
      setTourImages(tourImages.filter((image) => image.id !== id));
      message.success("Image deleted successfully!");
    } catch (error) {
      message.error(`Error deleting image: ${error.message}`);
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({ image: record.image });
    setImagePreview(BASE_URL + record.image);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const imageBase64 = imageFile ? await getBase64(imageFile) : null;
      const strippedBase64 = imageBase64
        ? imageBase64.replace(/^data:image\/[a-z]+;base64,/, "")
        : null;

      const object = {
        id: currentId,
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

      let response;

      if (editMode) {
        // PUT request for update - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        response = await axios.put(`${BASE_URL}${endpoints.putgallery}/${currentId}`, cleanObject, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // POST request for create
        response = await axios.post(BASE_URL + endpoints.addGallery, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        if (editMode) {
          setTourImages((prev) =>
            prev.map((img) =>
              img.id === currentId ? { ...img, image: object.image } : img
            )
          );
          message.success("Tour image updated successfully!");
        } else {
          setTourImages([
            ...tourImages,
            { ...object, id: response.data.id },
          ]);
          message.success("Tour image added successfully!");
        }
        handleCancel();
      } else {
        message.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchTourImages = async () => {
      try {
        const response = await axios.get(BASE_URL + endpoints.gallery);
        setTourImages(response.data);
      } catch (error) {
        message.error("Failed to fetch tour images.");
      }
    };
    fetchTourImages();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setCurrentId(null);
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="blogs-admin-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <FileTextOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Gallery
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage gallery images
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-image-btn"
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
          Add New Image
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={tourImages} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 12,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} images`,
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
              <PictureOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {editMode ? 'Edit Gallery Image' : 'Add New Image'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {editMode ? 'Update gallery image' : 'Upload a new gallery image'}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className="custom-gallery-modal"
        style={{ top: 40 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            padding: '32px', borderRadius: '12px', textAlign: 'center',
          }}>
            <Form.Item label="" name="image" rules={[{ required: true, message: 'Please upload an image' }]} style={{ marginBottom: 0 }}>
              <div className="image-upload-area">
                {imagePreview ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: '100%', height: 'auto', maxHeight: '250px',
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
                      width: '250px', height: '200px', margin: '0 auto',
                      borderRadius: '12px', border: '3px dashed #667eea',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', background: 'white',
                      transition: 'all 0.3s ease',
                    }} className="upload-placeholder">
                      <CameraOutlined style={{ fontSize: '48px', color: '#667eea', marginBottom: '12px' }} />
                      <div style={{ fontSize: '14px', color: '#8c8c8c', fontWeight: 500 }}>Upload Gallery Image</div>
                      <div style={{ fontSize: '12px', color: '#bfbfbf', marginTop: '4px' }}>Click to browse</div>
                    </div>
                  </Upload>
                )}
              </div>
            </Form.Item>
          </div>

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
              {editMode ? '✓ Update Image' : '+ Add Image'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Blogs;
