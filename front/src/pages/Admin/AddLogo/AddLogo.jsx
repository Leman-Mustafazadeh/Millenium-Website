import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result; // Keep the full data URL
      resolve(base64); // Return the full base64 URL
    };
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name (AZ)",
      dataIndex: "name_AZ",
      key: "name_AZ",
    },
    {
      title: "Name (EN)",
      dataIndex: "name_EN",
      key: "name_EN",
    },
    {
      title: "Name (RU)",
      dataIndex: "name_RU",
      key: "name_RU",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Blog"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
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

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    setImageFile(file);
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
    setImageFile(null); // Reset imageFile to avoid using previous image
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    message.success("Blog deleted successfully!");
  };

  const onFinish = async (values) => {
    if (!imageFile) {
      message.error("Please upload an image.");
      return;
    }

    const image = await getBase64(imageFile);
    const object = {
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      link: values.link,
      image: image, // Use base64 image
    };

    try {
      const response = await axios.post(BASE_URL + endpoints.addlogo, object, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        if (currentBlogId) {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) => (blog.id === currentBlogId ? object : blog))
          );
          message.success("Blog updated successfully!");
        } else {
          setBlogs([...blogs, object]);
          message.success("Blog added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setCurrentBlogId(null);
        setImageFile(null);
      } else {
        message.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      if (error.response) {
        message.error(
          `Server Error: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        message.error(
          "No response from the server. Please check your network."
        );
      } else {
        message.error(`Error: ${error.message}`);
      }
      console.error("Error in Axios request:", error);
    }
  };

  useEffect(() => {
    controller.getAll(endpoints.logo).then((res) => {
      console.log(res);

      const formattedBlogs = res.map((blog) => ({
        ...blog,
        image: blog.image.startsWith("data:")
          ? blog.image
          : `data:image/png;base64,${blog.image}`,
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
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ float: "right", margin: "20px 0" }}
      >
        Add New Blog
      </Button>
      <Table columns={columns} dataSource={blogs} rowKey="id" />

      <Modal
        title={currentBlogId ? "Edit Blog" : "Add New Blog"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name_AZ"
            label="Name (AZ)"
            rules={[
              {
                required: true,
                message: "Please enter the blog name in Azerbaijani",
              },
            ]}
          >
            <Input placeholder="Enter blog name in Azerbaijani" />
          </Form.Item>

          <Form.Item
            name="name_EN"
            label="Name (EN)"
            rules={[
              {
                required: true,
                message: "Please enter the blog name in English",
              },
            ]}
          >
            <Input placeholder="Enter blog name in English" />
          </Form.Item>

          <Form.Item
            name="name_RU"
            label="Name (RU)"
            rules={[
              {
                required: true,
                message: "Please enter the blog name in Russian",
              },
            ]}
          >
            <Input placeholder="Enter blog name in Russian" />
          </Form.Item>

          <Form.Item label="Upload Image">
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

export default AddLogo;
