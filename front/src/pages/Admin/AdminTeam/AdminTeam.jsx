import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Modal, Table, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant"; // Ensure these are correct
import controller from "../../../API";

// Function to convert image file to Base64
const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = (error) => {
    console.error("Error reading file: ", error);
  };
};

const AdminTeam = () => {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      fullName: "John Doe",
      position: "Developer",
      eMail: "john.doe@example.com",
      image: "https://via.placeholder.com/50", // Placeholder image
    },
    {
      id: 2,
      fullName: "Jane Smith",
      position: "Designer",
      eMail: "jane.smith@example.com",
      image: "https://via.placeholder.com/50", // Placeholder image
    },
  ]);
  const [currentMemberId, setCurrentMemberId] = useState(null); // Track current member for edit

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Email",
      dataIndex: "eMail",
      key: "eMail",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Profile" style={{ width: 50, height: 50, objectFit: "cover" }} />
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
    }
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
    setCurrentMemberId(record.id);
    form.setFieldsValue({
      fullName: record.fullName,
      position: record.position,
      eMail: record.eMail,
    });
    setImageBase64(record.image); 
    setIsModalVisible(true); 
  };

  const handleDelete = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    message.success("Team member deleted successfully!");
  };

  const onFinish = async (values) => {
    const formData = {
      id: currentMemberId || teamMembers.length + 1, 
      image: imageBase64, 
    };

    console.log(formData);

    try {
      const response = await axios.getAll(`${BASE_URL}${endpoints.team}`); 
console.log(response);

      if (response.status === 200 || response.status === 201) {
        if (currentMemberId) {
          setTeamMembers((prevMembers) =>
            prevMembers.map((member) =>
              member.id === currentMemberId ? formData : member
            )
          );
          message.success("Team member updated successfully!");
        } else {
          setTeamMembers([...teamMembers, formData]);
          message.success("Team member added successfully!");
        }
        setIsModalVisible(false); 
        form.resetFields(); 
        setCurrentMemberId(null); 
      } else {
        message.error(`Error: ${response.statusText}`);
      }

      console.log("Response Data:", response.data);
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        message.error(`Server Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        message.error("No response from the server. Please check your network.");
      } else {
        message.error(`Error: ${error.message}`);
      }

      console.error("Error in Axios POST request:", error);
    }
  };

  
  const [myPl, setMyPl] = useState([]);
  useEffect(() => {
    controller.getAll(endpoints.gallery).then((res) => {
      setMyPl(res.data);
      console.log(res.data);
      
    });
  }, []);
  // Show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentMemberId(null); // Reset current member ID
    form.resetFields(); // Reset form
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right", margin: "20px 0" }}>
        Add New Team Member
      </Button>
      {/* Table to display team members */}
      <Table columns={columns} dataSource={teamMembers} rowKey="id" />

      {/* Modal with form inside */}
      <Modal
        title={currentMemberId ? "Edit Team Member" : "Add New Team Member"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Hide default footer buttons
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Please enter your position" }]}
          >
            <Input placeholder="Enter position" />
          </Form.Item>

          <Form.Item
            name="eMail"
            label="Email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input placeholder="Enter email" />
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
              {currentMemberId ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminTeam;
