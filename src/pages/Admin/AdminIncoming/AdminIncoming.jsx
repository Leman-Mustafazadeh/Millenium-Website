import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Upload, message, Select, Image, Tag, Tooltip, Input, Tabs, Row, Col, Divider } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, GlobalOutlined, CameraOutlined, FileTextOutlined, TagsOutlined } from "@ant-design/icons";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";
import Cookies from "js-cookie";
import './style.css';

const AdminIncoming = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [incomingItems, setIncomingItems] = useState([]);
  const [incomingCategories, setIncomingCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);
  const [textAZ, setTextAZ] = useState("");
  const [textEN, setTextEN] = useState("");
  const [textRU, setTextRU] = useState("");

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
          <div className="incoming-image-wrapper">
            <Image
              src={imageUrl}
              alt="Incoming"
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
      title: "Title",
      dataIndex: "title_AZ",
      key: "title_AZ",
      width: 200,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>{record.name_AZ}</div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "serialNumber",
      key: "serialNumber",
      width: 120,
      align: 'center',
      render: (num) => <Tag color="green">#{num}</Tag>,
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + endpoints.delincoming + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      });
      setIncomingItems(incomingItems.filter((item) => item.id !== id));
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
      title_AZ: record.title_AZ,
      title_EN: record.title_EN,
      title_RU: record.title_RU,
      serialNumber: record.serialNumber,
      category: record.categoryId,
      text_AZ: record.text_AZ || "",
      text_EN: record.text_EN || "",
      text_RU: record.text_RU || "",
    });
    setImage(record.image);
    setImages([record.image1, record.image2, record.image3, record.image4]);
    setTextAZ(record.text_AZ || "");
    setTextEN(record.text_EN || "");
    setTextRU(record.text_RU || "");
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
      const base64String = reader.result.split(",")[1];
      if (index === "main") {
        setImage(base64String);
      } else {
        const newImages = [...images];
        newImages[index] = base64String;
        setImages(newImages);
      }
    };
    return false;
  };

  const onFinish = async (values) => {
    const inComingImages = images
      .map((img, index) => (img ? { image: `image${index + 1}`, base64: img } : null))
      .filter((img) => img);

    const object = {
      id: currentId,
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      title_AZ: values.title_AZ,
      title_EN: values.title_EN,
      title_RU: values.title_RU,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      serialNumber: values.serialNumber,
    };

    // Only add image if it exists
    if (image) {
      object.image = image;
    }

    // Only add inComingImages if array is not empty
    if (inComingImages && inComingImages.length > 0) {
      object.inComingImages = inComingImages;
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
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );
        
        response = await axios.put(`${BASE_URL + endpoints.putincoming}/${currentId}`, cleanObject, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
      } else {
        // POST request for create
        response = await axios.post(BASE_URL + endpoints.addincoming, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
      }

      if (response) {
        if (editMode) {
          setIncomingItems(
            incomingItems.map((item) => (item.id === currentId ? object : item))
          );
          message.success("Incoming item updated successfully!");
        } else {
          setIncomingItems([
            ...incomingItems,
            { ...object, id: incomingItems.length + 1 },
          ]);
          message.success("Incoming item added successfully!");
        }
        handleCancel();
      } else {
        message.error("Failed to add or update incoming item.");
      }
    } catch (error) {
      message.error("Error occurred while saving data.");
    }
  };

  useEffect(() => {
    const fetchIncomingItems = async () => {
      const res = await controller.getAll(endpoints.incoming);
      setIncomingItems(res);
    };

    const fetchCategories = async () => {
      const res = await controller.getAll(endpoints.categoryincoming);
      setIncomingCategories(res);
    };

    fetchCategories();
    fetchIncomingItems();
  }, []);

  const categoryOptions = incomingCategories.map((category) => ({
    label: category.name_EN,
    value: category.id,
  }));

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage(null);
    setImages([null, null, null, null]);
    setEditMode(false);
    setCurrentId(null);
    setTextAZ("");
    setTextEN("");
    setTextRU("");
  };

  return (
    <div className="admin-incoming-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <GlobalOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Incoming Tours
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage incoming tour packages
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-incoming-btn"
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
          Add New Incoming Item
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={incomingItems} 
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
                <GlobalOutlined />
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                  {editMode ? 'Edit Incoming Tour' : 'Add New Incoming Tour'}
                </div>
                <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                  {editMode ? 'Update tour details' : 'Create a new incoming tour package'}
                </div>
              </div>
            </div>
          }
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={900}
          className="custom-incoming-modal"
          style={{ top: 20 }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Category" name="serialNumber" rules={[{ required: true, message: 'Please select a category' }]}>
              <Select 
                size="large"
                options={categoryOptions} 
                placeholder="Select a category"
                suffixIcon={<TagsOutlined style={{ color: '#8c8c8c' }} />}
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

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
                        {images[index] ? (
                          <div style={{ position: 'relative' }}>
                            <img
                              src={`data:image/jpeg;base64,${images[index]}`}
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
                            <Upload name={`image${index}`} maxCount={1} beforeUpload={(file) => beforeUpload(file, index)} showUploadList={false}>
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
                          <Upload name={`image${index}`} maxCount={1} beforeUpload={(file) => beforeUpload(file, index)} showUploadList={false}>
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
                    <div>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="name_AZ" label="Tour Name" rules={[{ required: true, message: 'Please enter name' }]}>
                            <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Tur adı" size="large" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="title_AZ" label="Tour Title" rules={[{ required: true, message: 'Please enter title' }]}>
                            <Input placeholder="Başlıq" size="large" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label="Description" name="text_AZ">
                        <CKEditor
                          editor={ClassicEditor}
                          data={textAZ}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setTextAZ(data);
                            form.setFieldsValue({ text_AZ: data });
                          }}
                        />
                      </Form.Item>
                    </div>
                  ),
                },
                {
                  key: '2',
                  label: <span><GlobalOutlined /> English</span>,
                  children: (
                    <div>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="name_EN" label="Tour Name">
                            <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Tour Name" size="large" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="title_EN" label="Tour Title">
                            <Input placeholder="Title" size="large" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label="Description" name="text_EN">
                        <CKEditor
                          editor={ClassicEditor}
                          data={textEN}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setTextEN(data);
                            form.setFieldsValue({ text_EN: data });
                          }}
                        />
                      </Form.Item>
                    </div>
                  ),
                },
                {
                  key: '3',
                  label: <span><GlobalOutlined /> Russian</span>,
                  children: (
                    <div>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="name_RU" label="Tour Name">
                            <Input prefix={<FileTextOutlined style={{ color: '#8c8c8c' }} />} placeholder="Название тура" size="large" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="title_RU" label="Tour Title">
                            <Input placeholder="Заголовок" size="large" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label="Description" name="text_RU">
                        <CKEditor
                          editor={ClassicEditor}
                          data={textRU}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setTextRU(data);
                            form.setFieldsValue({ text_RU: data });
                          }}
                        />
                      </Form.Item>
                    </div>
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

export default AdminIncoming;
