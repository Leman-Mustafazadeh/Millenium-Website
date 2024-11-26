import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';
import Cookies from 'js-cookie'

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
        <img src={BASE_URL+image} alt="Activity" style={{ width: 100, height: 100, objectFit: 'cover' }} />
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
    reader.onload = () => {
      // Get the base64 image data without the "data:image/xxx;base64," prefix
      const base64Data = reader.result.split(',')[1];
      console.log("Base64 image data:", base64Data); // Log to confirm extraction
      setImageBase64(base64Data);
    };
    return false;
  };

  const handleDelete = (id) => {
    axios.get(BASE_URL+ endpoints.delactivity +"/"+ id, {
      headers: {
        Authorization: `Bearer ${Cookies.get("ftoken")}`,
      },
    }).then((res) => {
      console.log("Deleted activity:", res);
      setActivities(activities.filter(activity => activity.id !== id));
      message.success("Activity deleted successfully!");
    });
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      id: record.id,
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
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
    const token = Cookies.get("ftoken"); // Retrieve token from cookies
    if (!token) {
      message.error("Authentication token is missing. Please log in again.");
      return;
    }
  
    const object = {
      id: currentId, // Include the id if it's edit mode
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      image: imageBase64, // Only send the base64 data
      title_AZ: values.title_AZ,
      title_EN: values.title_EN,
      title_RU: values.title_RU,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      isDeleted: false, // Ensure you handle the deletion flag correctly
    };
  
    try {
      let response;
  
      if (editMode) {
        // If editing, send a PUT request to update the activity
        response = await axios.post(
          `${BASE_URL}${endpoints.putactivity}/${currentId}`, // Updated API endpoint
          object,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );
  
        if (response.data) {
          // Update activities locally after a successful edit
          setActivities(
            activities.map((item) => (item.id === currentId ? object : item))
          );
          message.success("Activity updated successfully!");
        }
      } else {
        // If not editing, send a POST request to create a new activity
        response = await axios.post(BASE_URL + endpoints.addactivity, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
  
        if (response.data) {
          // Add the new activity to the list
          setActivities([...activities, { ...object, id: activities.length + 1 }]);
          message.success("Activity added successfully!");
        }
      }
  
      // Close modal and reset form
      setIsModalVisible(false);
      form.resetFields();
      setEditMode(false);
      setCurrentId(null);
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
