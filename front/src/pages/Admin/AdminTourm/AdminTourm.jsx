import React, { useState } from "react";
import { Table, Button, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant"; // Ensure these are correct

const AdminTourm = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tourImages, setTourImages] = useState([]); // State for tour images
  const [imageBase64, setImageBase64] = useState(null); // State for image
  const [editMode, setEditMode] = useState(false); // State to track if editing
  const [currentId, setCurrentId] = useState(null); // State to track the image ID being edited

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
        <img src={image} alt="Tour" style={{ width: 100, height: 100, objectFit: "cover" }} />
      ),
    },
    {
      title: "Edit",
      key: "Edit",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
        </>
      ),
    },
    {
        title: "Delete",
        key: "Delete",
        render: (_, record) => (
          <>
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
    setTourImages(tourImages.filter(image => image.id !== id));
    message.success("Image deleted successfully!");
  };

  // Handle Edit action
  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    setImageBase64(record.image); // Set the current image for editing
    form.setFieldsValue({
      image: record.image,
    });
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const formData = {
      id: editMode ? currentId : tourImages.length + 1, // Use current ID if editing, else generate new
      image: imageBase64, // Append the Base64 string to form data
    };

    console.log(formData);

    const response = await axios.post(BASE_URL + endpoints.addteam, formData);
    console.log(response);
   
    try {
      const response = await axios.get(`${BASE_URL}${endpoints.team}`); 

      if (response.status === 200 || response.status === 201) {
        if (editMode) {
          setTourImages(tourImages.map(img => (img.id === currentId ? formData : img)));
          message.success("Tour image updated successfully!");
        } else {
          setTourImages([...tourImages, formData]);
          message.success("Tour image added successfully!");
        }
        setIsModalVisible(false); // Close modal after success
        form.resetFields(); // Reset form
        setImageBase64(null); // Clear image
        setEditMode(false); // Reset edit mode
        setCurrentId(null); 
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
    form.resetFields(); // Reset form
    setImageBase64(null); // Clear image
    setEditMode(false); // Reset edit mode
    setCurrentId(null); // Reset current ID
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right", margin: "20px 0" }}>
        Add New Image
      </Button>
      {/* Table to display tour images */}
      <Table columns={columns} dataSource={tourImages} rowKey="id" />

      {/* Modal with form inside */}
      <Modal
        title={editMode ? "Edit Tour Image" : "Add New Tour Image"}
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
