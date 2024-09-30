import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant"; // Ensure these are correct

const AdminBlog = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogs, setBlogs] = useState([]); // State for blog posts
  const [currentBlogId, setCurrentBlogId] = useState(null); // Track current blog for edit
  const [imageBase64, setImageBase64] = useState(null); // State for image

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Blog Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Blog" style={{ width: 50, height: 50, objectFit: "cover" }} />
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Edit",
      key: "Edit",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
        </Space>
      ),
    },
    {
        title: "Delete",
        key: "Delete",
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => handleDelete(record.id)}>Delete</a>
          </Space>
        ),
      },
  ];

  // Handle image before upload to convert to Base64
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

  // Handle Edit action
  const handleEdit = (record) => {
    setCurrentBlogId(record.id);
    form.setFieldsValue({
      name: record.name,
      link: record.link,
    });
    setImageBase64(record.image); // Set the current image to state
    setIsModalVisible(true); // Show the modal
  };

  // Handle Delete action
  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    message.success("Blog deleted successfully!");
  };

  const onFinish = async (values) => {
    const formData = {
      id: currentBlogId || blogs.length + 1, // Use current ID if editing
      ...values,
      image: imageBase64, // Append the Base64 string to form data
      translations: [
        {
          id: 0,
          name: values.name, // Assume the translation name is the same for simplicity
          language: "en", // Assuming English for the default language
          logoId: 0,
          logo: imageBase64, // If there's a logo, you can use this base64 as logo as well
        },
      ],
    };

    console.log(formData);

    try {
      // Mock API request to simulate saving
      const response = await axios.get(`${BASE_URL}${endpoints.team}`); // Adjust this URL as needed

      if (response.status === 200 || response.status === 201) {
        if (currentBlogId) {
          // Editing an existing blog
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog.id === currentBlogId ? formData : blog
            )
          );
          message.success("Blog updated successfully!");
        } else {
          // Adding a new blog
          setBlogs([...blogs, formData]);
          message.success("Blog added successfully!");
        }
        setIsModalVisible(false); // Close modal after success
        form.resetFields(); // Reset form
        setCurrentBlogId(null); // Reset current blog ID
        setImageBase64(null); // Clear image
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
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentBlogId(null); // Reset current blog ID
    form.resetFields(); // Reset form
    setImageBase64(null); // Clear image
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right", margin: "20px 0" }}>
        Add New Blog
      </Button>
      {/* Table to display blog posts */}
      <Table columns={columns} dataSource={blogs} rowKey="id" />

      {/* Modal with form inside */}
      <Modal
        title={currentBlogId ? "Edit Blog" : "Add New Blog"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Hide default footer buttons
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Blog Name"
            rules={[{ required: true, message: "Please enter the blog name" }]}
          >
            <Input placeholder="Enter blog name" />
          </Form.Item>

          <Form.Item
            name="link"
            label="Blog Link"
            rules={[{ required: true, message: "Please enter the blog link" }]}
          >
            <Input placeholder="Enter blog link" />
          </Form.Item>

          <Form.Item label="Upload Image">
            <Upload
              name="image"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload} // Convert file to Base64 before upload
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentBlogId ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminBlog;
