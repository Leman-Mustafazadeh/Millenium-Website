import React, { useState } from "react";
import { Table, Button, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../../API/constant";
import controller from "../../../../API";

const HeroArea = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [heroItems, setHeroItems] = useState([]); // State for hero items
  const [editMode, setEditMode] = useState(false); // State to track if editing
  const [currentId, setCurrentId] = useState(null); // State to track the hero item ID being edited

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Hero"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
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
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Yes" : "No"),
    },
    {
      title: "Edit",
      key: "Edit",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </>
      ),
    },
    {
      title: "Delete",
      key: "Delete",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Handle Delete action
  const handleDelete = (id) => {
    setHeroItems(heroItems.filter((item) => item.id !== id));
    message.success("Hero item deleted successfully!");
  };

  // Handle Edit action
  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      image: record.image,
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      isActive: record.isActive,
    });
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const formData = {
      id: editMode ? currentId : heroItems.length + 1, 
      ...values,
    };

    console.log(formData);
    const response = await axios.post(
      BASE_URL + endpoints.addGallery,
      formData
    );
    console.log(response);

    try {
      const response = await axios.get(BASE_URL + endpoints.team); 
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        if (editMode) {
          setHeroItems(
            heroItems.map((item) => (item.id === currentId ? formData : item))
          );
          message.success("Hero item updated successfully!");
        } else {
          setHeroItems([...heroItems, formData]);
          message.success("Hero item added successfully!");
        }
        setIsModalVisible(false); // Close modal after success
        form.resetFields(); 
        setEditMode(false); // Reset edit mode
        setCurrentId(null); // Reset current ID
      } else {
        message.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      // Handle different types of errors
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

  // Show the modal
  const showModal = () => {
    setEditMode(false); // Reset edit mode
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset form
    setEditMode(false); // Reset edit mode
    setCurrentId(null); // Reset current ID
  };
  // controller.post()
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ float: "right", margin: "20px 0" }}
      >
        Add New Hero Item
      </Button>
      {/* Table to display hero items */}
      <Table columns={columns} dataSource={heroItems} rowKey="id" />

      {/* Modal with form inside */}
      <Modal
        title={editMode ? "Edit Hero Item" : "Add New Hero Item"}
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
              showUploadList={false} // Hide default upload list
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Name (AZ)"
            name="name_AZ"
            rules={[
              { required: true, message: "Please enter the name in AZ!" },
            ]}
          >
            <input />
          </Form.Item>

          <Form.Item
            label="Name (EN)"
            name="name_EN"
            rules={[
              { required: true, message: "Please enter the name in EN!" },
            ]}
          >
            <input />
          </Form.Item>

          <Form.Item
            label="Name (RU)"
            name="name_RU"
            rules={[
              { required: true, message: "Please enter the name in RU!" },
            ]}
          >
            <input />
          </Form.Item>

          <Form.Item label="Active" name="isActive" valuePropName="checked">
            <input type="checkbox" />
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

export default HeroArea;
