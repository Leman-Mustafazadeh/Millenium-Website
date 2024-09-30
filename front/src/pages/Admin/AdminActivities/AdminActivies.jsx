import React, { useState } from 'react';
import { Table, Button, Modal, Form, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant'; // Ensure these are correct

const AdminActivies = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activities, setActivities] = useState([]); // State for activities
  const [editMode, setEditMode] = useState(false); // State to track if editing
  const [currentId, setCurrentId] = useState(null); // State to track the activity ID being edited
  const [imageBase64, setImageBase64] = useState(null); // State for image

  // Define table columns
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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

  // Handle image upload to convert to Base64
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageBase64(reader.result);
    return false; // Prevent default upload behavior
  };

  // Handle Delete action
  const handleDelete = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
    message.success("Activity deleted successfully!");
  };

  // Handle Edit action
  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      image: record.image,
      title: record.title,
      description: record.description,
    });
    setImageBase64(record.image); // Set current image for edit
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const formData = {
      id: editMode ? currentId : activities.length + 1, // Use current ID if editing, else generate new
      image: imageBase64, // Append the Base64 string to form data
      title: values.title,
      description: values.description,
    };

    console.log(formData);

    try {
      // Mock API request to simulate saving
      const response = await axios.get(`${BASE_URL}${endpoints.team}`); // Adjust this URL as needed

      if (response.status === 200 || response.status === 201) {
        if (editMode) {
          // Update existing activity
          setActivities(activities.map(activity => (activity.id === currentId ? formData : activity)));
          message.success("Activity updated successfully!");
        } else {
          // Adding a new activity
          setActivities([...activities, formData]);
          message.success("Activity added successfully!");
        }
        setIsModalVisible(false); // Close modal after success
        form.resetFields(); // Reset form
        setImageBase64(null); // Clear image
        setEditMode(false); // Reset edit mode
        setCurrentId(null); // Reset current ID
      } else {
        message.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      // Handle different types of errors
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

  // Show the modal
  const showModal = () => {
    setEditMode(false); // Reset edit mode
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form
    setImageBase64(null); // Clear image
    setEditMode(false); // Reset edit mode
    setCurrentId(null); // Reset current ID
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: 'right', margin: '20px 0' }}>
        Add New Activity
      </Button>
      {/* Table to display activities */}
      <Table columns={columns} dataSource={activities} rowKey="id" />

      {/* Modal with form inside */}
      <Modal
        title={editMode ? 'Edit Activity' : 'Add New Activity'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Hide default footer buttons
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Upload Image" name="image">
            <Upload
              name="image"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload} // Convert file to Base64 before upload
              showUploadList={false} // Hide default upload list
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]}>
            <input />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the description!' }]}>
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

export default AdminActivies;
