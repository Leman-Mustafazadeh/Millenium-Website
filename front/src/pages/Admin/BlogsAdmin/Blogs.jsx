import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(",");  // Extract base64 string
      resolve(base64);
    };
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
      reject(error);
    };
  });
};

const Blogs = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tourImages, setTourImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
        // Prepend "data:image/png;base64," if the image is base64 encoded
        const imageSrc = image.startsWith("http") ? image : `data:image/png;base64,${image}`;
        return (
          <img
            src={imageSrc}
            alt="Tour"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}${endpoints.deleteGallery}/${id}`);
      setTourImages(tourImages.filter((image) => image.id !== id));
      message.success("Image deleted successfully!");
    } catch (error) {
      message.error(`Error deleting image: ${error.message}`);
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({ image: record.image });
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const imageBase64 = imageFile ? await getBase64(imageFile) : null;
      const object = {
        image: imageBase64,
      };

      const response = await axios.post(
        BASE_URL + endpoints.addGallery,
        object,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        if (editMode) {
          setTourImages(
            tourImages.map((img) =>
              img.id === currentId ? { ...img, image: imageBase64 } : img
            )
          );
          message.success("Tour image updated successfully!");
        } else {
          setTourImages([...tourImages, { ...object, id: tourImages.length + 1 }]);
          message.success("Tour image added successfully!");
        }
        handleCancel();
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
    const fetchTourImages = async () => {
      try {
        const response = await axios.get(BASE_URL + endpoints.gallery);
        setTourImages(response.data);
      } catch (error) {
        message.error("Failed to fetch tour images.");
      }
    };
    fetchTourImages();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setCurrentId(null);
    setImageFile(null); // Reset image file after submission
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ float: "right", margin: "20px 0" }}
      >
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
          <Form.Item
            label="Upload Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
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
              {editMode ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Blogs;
