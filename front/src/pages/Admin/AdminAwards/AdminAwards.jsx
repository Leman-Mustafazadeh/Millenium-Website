import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Modal, Table, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";
import Cookies from 'js-cookie';

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

const AdminAwards = () => {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [awards, setAwards] = useState([]);
  const [currentAwardId, setCurrentAwardId] = useState(null);
  const [editMode, setEditMode] = useState(false);

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
        <img src={BASE_URL+image} alt="Award" style={{ width: 50, height: 50, objectFit: "cover" }} />
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
        </Space>
      ),
    },
    {
      title: "Delete",
      key: "delete",
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
    getBase64(file).then((base64) => {
      setImageBase64(base64);
    });
    return false;
  };

  const handleEdit = (record) => {
    setCurrentAwardId(record.id);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
    });
    setImageBase64(record.image);
    setIsModalVisible(true);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    controller.getOne(endpoints.delaward, id).then((res) => {
      console.log("deleted", res);
    });
    setAwards(awards.filter((award) => award.id !== id));
    message.success("Award deleted successfully!");
  };

  const onFinish = async (values) => {
    let image;
    if (values.image && values.image.file) {
      image = await getBase64(values.image.file);
      image = image.split(",")[1]; // Remove the base64 prefix
    } else if (currentAwardId && imageBase64) {
      image = imageBase64.split(",")[1]; // Use existing Base64 data for edits
    }
  
    const object = {
      ...values, 
      id: currentAwardId,
      image, // Base64-encoded image without the prefix
      isDeleted: false,
    };
  
    try {
      // Determine the appropriate endpoint based on edit mode
      const url = editMode
        ? `${BASE_URL + endpoints.putaward}/${currentAwardId}` // Update endpoint
        : BASE_URL + endpoints.addaward; // Add endpoint
  
      // Send the POST request
      const response = await axios.post(url, object, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response) {
        if (editMode) {
          // Update the awards list with the edited item
          setAwards(
            awards.map((item) => (item.id === currentAwardId ? { ...item, ...object } : item))
          );
          message.success("Award updated successfully!");
        } else {
          // Add the new award to the awards list
          setAwards([...awards, { ...object, id: awards.length + 1 }]);
          message.success("Award added successfully!");
        }
  
        // Reset the modal and form states
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentAwardId(null);
        setImageBase64(null);
      } else {
        message.error("Failed to add or update the award.");
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
    controller.getAll(endpoints.award).then((res) => {
      setAwards(res);
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentAwardId(null);
    form.resetFields();
    setImageBase64(null);
    setEditMode(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right", margin: "20px 0" }}>
        Add New Award
      </Button>
      <Table columns={columns} dataSource={awards} rowKey="id" />

      <Modal
        title={currentAwardId ? "Edit Award" : "Add New Award"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="image" label="Upload Image">
            <Upload
              name="image"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentAwardId ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminAwards;
