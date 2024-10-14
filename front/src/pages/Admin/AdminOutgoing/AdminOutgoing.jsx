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
  const [imageBase64, setImageBase64] = useState(null);

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
        <img src={image} alt="Outgoing" style={{ width: 100, height: 100, objectFit: 'cover' }} />
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

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageBase64(reader.result);
    return false;
  };

  const handleDelete = async (id) => {
    try {
      await controller.delete(endpoints.delOutgoing, id); // API call for deletion
      setOutgoingItems(outgoingItems.filter(item => item.id !== id));
      message.success("Item deleted successfully!");
    } catch (error) {
      message.error("Error deleting item.");
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
    setImageBase64(record.image);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const object = {
      id: currentId || 0, // Assuming new items have an ID of 0
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      image: imageBase64, // Use the uploaded image
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      createDate: new Date().toISOString(), // Current date
      isDeleted: false, // Default to false
    };

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token || token === "null") {
        console.log("Token not found or is null");
        return;
      }

      const response = await axios.post(BASE_URL + endpoints.addoutgoing, object, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        setImageBase64(null); // Reset image
      } else {
        message.error("Failed to add or update outgoing item.");
      }
    } catch (error) {
      message.error("Error occurred while saving data.");
      console.error("Error in Axios request:", error);
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
    setImageBase64(null); // Reset image
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

          <Form.Item label="Image" name="image">
            <Upload
              name="image"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Description (AZ)" name="text_AZ" rules={[{ required: true, message: 'Please enter the description!' }]}>
            <input />
          </Form.Item>

          <Form.Item label="Description (EN)" name="text_EN">
            <input />
          </Form.Item>

          <Form.Item label="Description (RU)" name="text_RU">
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
