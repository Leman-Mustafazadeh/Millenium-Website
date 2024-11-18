import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';

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
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={BASE_URL+image} alt="Outgoing" style={{ width: 100, height: 100, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Name (AZ)',
      dataIndex: 'name_AZ',
      key: 'name_AZ',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  
  const handleDelete = async (id) => {
    try {
      await controller.getOne(endpoints.deloutgoing, id); // API call for deletion
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
      // Stripping off the "data:image/*;base64," part and storing only the base64 image data
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
        base64: img || '',  // Only include the base64 string if it exists
      }))
      .filter(img => img.base64);  // Filter out empty base64 values (i.e., images that weren't uploaded)
  
    const object = {
      id: currentId,
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      image: image,  // This now contains the base64 image data for the primary image
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      outGoingImages: outgoingImageObjects,  // List of additional images with base64 data
    };
  
    try {
      const response = await axios.post(BASE_URL + endpoints.addoutgoing, object, {
        headers: {
          "Content-Type": "application/json",
          // Uncomment and use authorization header if needed
          // Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data) {
        if (editMode) {
          setOutgoingItems(
            outgoingItems.map((item) => (item.id === currentId ? object : item))
          );
          message.success("Outgoing item updated successfully!");
        } else {
          setOutgoingItems([...outgoingItems, { ...object, id: outgoingItems.length + 1 }]);
          message.success("Outgoing item added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
        setImage(null);
        setOutGoingImages([null, null, null, null]);
      } else {
        message.error("Failed to add or update outgoing item.");
      }
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

  console.log(outgoingItems);
  
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
    <div>
      <Button type="primary" onClick={showModal} style={{ float: 'right', margin: '20px 0' }}>
        Add New Outgoing Item
      </Button>
      <Table columns={columns} dataSource={outgoingItems} rowKey="id" />

      <Modal
        title={editMode ? 'Edit Outgoing Item' : 'Add New Outgoing Item'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name (AZ)" name="name_AZ" rules={[{ required: true, message: 'Please enter the name in AZ!' }]}>
            <input />
          </Form.Item>

          <Form.Item label="Name (EN)" name="name_EN">
            <input />
          </Form.Item>

          <Form.Item label="Name (RU)" name="name_RU">
            <input />
          </Form.Item>

          <Form.Item label="Primary Image" name="main_image">
            <Upload
              name="main_image"
              listType="picture"
              maxCount={1}
              beforeUpload={(file) => beforeUpload(file, "main")}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {Array.from({ length: 4 }).map((_, index) => (
            <Form.Item label={`Additional Image ${index + 1}`} key={index}>
              <Upload
                name={`outGoingImage${index + 1}`}
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => beforeUpload(file, index)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          ))}

          <Form.Item label="Text (AZ)" name="text_AZ" rules={[{ required: true, message: 'Please enter the text in AZ!' }]}>
            <input />
          </Form.Item>

          <Form.Item label="Text (EN)" name="text_EN">
            <input />
          </Form.Item>

          <Form.Item label="Text (RU)" name="text_RU">
            <input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminOutgoing;
