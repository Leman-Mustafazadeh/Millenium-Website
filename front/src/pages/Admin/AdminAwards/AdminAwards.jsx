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
        <img src={image} alt="Award" style={{ width: 50, height: 50, objectFit: "cover" }} />
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
    controller.delete(endpoints.delaward, id).then((res) => {
      console.log("deleted", res);
    });
    setAwards(awards.filter((award) => award.id !== id));
    message.success("Award deleted successfully!");
  };

  const onFinish = async (values) => {
    let image;

    // Only get Base64 if a new image is uploaded
    if (values.image && values.image.file) {
      image = await getBase64(values.image.file);
    } else if (currentAwardId) {
      // Use the existing image if editing and no new image uploaded
      image = imageBase64;
    }

    const object = {
      ...values,
      image,
      isDeleted: false,
    };

    try {
      const token = window !== undefined ? Cookies.get("ftoken") : null;
      if (!token || token === "null") {
        console.log("Token not found or is null");
      } else {
        console.log("Token:", token);
      }

      const response = await axios.post(BASE_URL + endpoints.addaward, object, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        if (editMode) {
          setAwards(
            awards.map((item) => (item.id === currentAwardId ? object : item))
          );
          message.success("Award updated successfully!");
        } else {
          setAwards([...awards, { ...object, id: awards.length + 1 }]);
          message.success("Award added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentAwardId(null);
      } else {
        message.error("Failed to add or update award.");
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
