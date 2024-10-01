import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Modal, Table, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant"; // Ensure these are correct

// Function to convert image file to Base64
const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = (error) => {
    console.error("Error reading file: ", error);
  };
};

const AdminAwards = () => {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [awards, setAwards] = useState([]); // State for awards
  const [currentAwardId, setCurrentAwardId] = useState(null); // Track current award for edit

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

  // Handle image before upload to convert to Base64
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    getBase64(file, (base64) => {
      setImageBase64(base64);
    });
    return false; // Prevent default upload behavior
  };

  // Handle Edit action
  const handleEdit = (record) => {
    setCurrentAwardId(record.id);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
    });
    setImageBase64(record.image); // Set the current image to state
    setIsModalVisible(true); // Show the modal
  };

  // Handle Delete action
  const handleDelete = (id) => {
    setAwards(awards.filter(award => award.id !== id));
    message.success("Award deleted successfully!");
  };

  // const onFinish = async (values) => {
  //   const formData = {
  //     id: currentAwardId || awards.length + 1, // Use current ID if editing
  //     ...values,
  //     image: imageBase64, // Append the Base64 string to form data
  //   };

  //   console.log(formData);

  //   try {
  //     // Mock API request to simulate saving
  //     const response = await axios.get(`${BASE_URL}${endpoints.team}`); // Adjust this URL as needed

  //     if (response.status === 200 || response.status === 201) {
  //       if (currentAwardId) {
  //         // Editing an existing award
  //         setAwards((prevAwards) =>
  //           prevAwards.map((award) =>
  //             award.id === currentAwardId ? formData : award
  //           )
  //         );
  //         message.success("Award updated successfully!");
  //       } else {
  //         // Adding a new award
  //         setAwards([...awards, formData]);
  //         message.success("Award added successfully!");
  //       }
  //       setIsModalVisible(false); // Close modal after success
  //       form.resetFields(); // Reset form
  //       setCurrentAwardId(null); // Reset current award ID
  //     } else {
  //       message.error(`Error: ${response.statusText}`);
  //     }

  //     console.log("Response Data:", response.data);
  //   } catch (error) {
  //     // Handle different types of errors
  //     if (error.response) {
  //       message.error(`Server Error: ${error.response.status} - ${error.response.data}`);
  //     } else if (error.request) {
  //       message.error("No response from the server. Please check your network.");
  //     } else {
  //       message.error(`Error: ${error.message}`);
  //     }

  //     console.error("Error in Axios POST request:", error);
  //   }
  // };

  // Show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentAwardId(null); // Reset current award ID
    form.resetFields(); // Reset form
    setImageBase64(null); // Clear image
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right", margin: "20px 0" }}>
        Add New Award
      </Button>
      {/* Table to display awards */}
      <Table columns={columns} dataSource={awards} rowKey="id" />

      {/* Modal with form inside */}
      <Modal
        title={currentAwardId ? "Edit Award" : "Add New Award"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Hide default footer buttons
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>

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
              {currentAwardId ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminAwards;
