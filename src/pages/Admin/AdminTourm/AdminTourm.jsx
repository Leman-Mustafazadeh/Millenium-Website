import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";

const AdminTourm = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tourImages, setTourImages] = useState([]);
  const [imageBase64, setImageBase64] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
      render: (image) => {
        // Check if the image starts with 'data:image/' (base64 string)
        const isBase64 = image && !image.startsWith("/uploads");

        // If it's a base64 string, use it directly; if it's a URL, concatenate with BASE_URL
        const imageUrl = isBase64
          ? `data:image/jpeg;base64,${image}` 
          : `${BASE_URL}${image}`;

        return (
          <img
            src={imageUrl}
            alt="Profile"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Edit",
      key: "Edit",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
    {
      title: "Delete",
      key: "Delete",
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
      ),
    },
  ];

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => {
        console.error("Error reading file: ", error);
        reject(error);
      };
    });
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageBase64(reader.result); // Set image preview as base64 string
    };
    return false; // Prevent automatic upload
  };

  const handleDelete = (id) => {
    setTourImages(tourImages.filter(image => image.id !== id));
    message.success("Image deleted successfully!");
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    setImageBase64(record.image); // Set the current image in base64 for preview
    form.setFieldsValue({
      image: record.image,
    });
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const image = await getBase64(values.image.file);
    const object = {
      image,
      isDeleted: false,
    };

    try {
      const response = await axios.post(BASE_URL + endpoints.addtour, object, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        if (editMode) {
          message.success("Tour image updated successfully!");
        } else {
          message.success("Tour image added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setImageBase64(null);
        setEditMode(false);
        setCurrentId(null);
      } else {
        message.error(`Error: ${response.statusText}`);
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
    controller.getAll(endpoints.tour).then((res) => {
      setTourImages(res);
    });
  }, []);

  const showModal = () => {
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
      <Button type="primary" onClick={showModal} style={{ float: "right", margin: "20px 0" }}>
        Add New Image
      </Button>
      <Table columns={columns} dataSource={tourImages} rowKey="id" />

      <Modal
        title={editMode ? "Edit Tour Image" : "Add New Tour Image"}
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

          {/* Display image preview below the upload button */}
          {imageBase64 && (
            <div style={{ marginTop: 10 }}>
              <img
                src={imageBase64}
                alt="Uploaded Preview"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            </div>
          )}

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

export default AdminTourm;
