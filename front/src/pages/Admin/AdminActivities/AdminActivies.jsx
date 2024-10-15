import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';

const AdminActivities = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);
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
        <img src={image} alt="Activity" style={{ width: 100, height: 100, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Title (AZ)',
      dataIndex: 'title_AZ',
      key: 'title_AZ',
    },
    {
      title: 'Description (AZ)',
      dataIndex: 'text_AZ',
      key: 'text_AZ',
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

  const handleDelete = (id) => {
    controller.getOne(`${endpoints.delactivity}/${id}`).then((res) => {
      console.log("Deleted activity:", res);
      setActivities(activities.filter(activity => activity.id !== id));
      message.success("Activity deleted successfully!");
    });
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      image: record.image,
      title_AZ: record.title_AZ,
      title_EN: record.title_EN,
      title_RU: record.title_RU,
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
      image: imageBase64, // Use existing image or the new one from the Upload
      title_AZ: values.title_AZ,
      title_EN: values.title_EN,
      title_RU: values.title_RU,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      isDeleted: false, // Default to false
    };

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token || token === "null") {
        console.log("Token not found or is null");
      } else {
        console.log("Token:", token);
      }

      const response = await axios.post(BASE_URL + endpoints.addactivity, object, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        if (editMode) {
          setActivities(
            activities.map((item) => (item.id === currentId ? object : item))
          );
          message.success("Activity updated successfully!");
        } else {
          setActivities([...activities, { ...object, id: activities.length + 1 }]);
          message.success("Activity added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
      } else {
        message.error("Failed to add or update activity.");
      }
    } catch (error) {
      if (error.response) {
        message.error(`Server Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        message.error("No response from the server. Please check your network.");
      } else {
        message.error(`Error: ${error.message}`);
      }
      console.error("Error in Axios request:", error);
    }
  };

  useEffect(() => {
    controller.getAll(endpoints.activity).then((res) => {
      setActivities(res);
    });
  }, []);
  console.log(activities);
  

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

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: 'right', margin: '20px 0' }}>
        Add New Activity
      </Button>
      <Table columns={columns} dataSource={activities} rowKey="id" />

      <Modal
        title={editMode ? 'Edit Activity' : 'Add New Activity'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Upload Image" name="image">
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

          <Form.Item label="Name (AZ)" name="name_AZ" rules={[{ required: true, message: 'Please enter the name in AZ!' }]}>
            <input />
          </Form.Item>

          <Form.Item label="Name (EN)" name="name_EN">
            <input />
          </Form.Item>

          <Form.Item label="Name (RU)" name="name_RU">
            <input />
          </Form.Item>

          <Form.Item label="Title (AZ)" name="title_AZ" rules={[{ required: true, message: 'Please enter the title!' }]}>
            <input />
          </Form.Item>

          <Form.Item label="Title (EN)" name="title_EN">
            <input />
          </Form.Item>

          <Form.Item label="Title (RU)" name="title_RU">
            <input />
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
    </>
  );
};

export default AdminActivities;
