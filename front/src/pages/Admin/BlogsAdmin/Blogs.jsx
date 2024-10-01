import React, { useState } from "react";
import { Table, Button, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";

const Blogs = () => {
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
      render: (image) => (
        <img src={image} alt="Tour" style={{ width: 100, height: 100, objectFit: "cover" }} />
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
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
      setImageBase64(reader.result);
      form.setFieldsValue({ image: reader.result }); 
    };
    return false; 
  };

  

  const handleDelete = (id) => {
    setTourImages(tourImages.filter(image => image.id !== id));
    message.success("Image deleted successfully!");
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    setImageBase64(record.image);
    form.setFieldsValue({ image: record.image });
    setIsModalVisible(true);
  };

  // const onFinish = async (values) => {
  //   const formData = {
  //     id: editMode ? currentId : tourImages.length + 1,
  //     image: imageBase64,
  //   };

  //   try {
  //     const response = await axios.post(BASE_URL + endpoints.addGallery, formData);

  //     if (response.status === 200 || response.status === 201) {
  //       if (editMode) {
  //         setTourImages(tourImages.map(img => (img.id === currentId ? formData : img)));
  //         message.success("Tour image updated successfully!");
  //       } else {
  //         setTourImages([...tourImages, formData]);
  //         message.success("Tour image added successfully!");
  //       }
  //       handleCancel(); // Reset modal state
  //     } else {
  //       message.error(`Error: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       message.error(`Server Error: ${error.response.status} - ${error.response.data}`);
  //     } else if (error.request) {
  //       message.error("No response from the server. Please check your network.");
  //     } else {
  //       message.error(`Error: ${error.message}`);
  //     }
  //     console.error("Error in Axios request:", error);
  //   }
  // };

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

export default Blogs;
