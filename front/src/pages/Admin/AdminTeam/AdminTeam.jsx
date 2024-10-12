import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Modal, Table, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";

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

const AdminTeam = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [imageFile, setImageFile] = useState(null); 

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name (AZ)",
      dataIndex: "fullName_AZ",
      key: "fullName_AZ",
    },
    {
      title: "Full Name (EN)",
      dataIndex: "fullName_EN",
      key: "fullName_EN",
    },
    {
      title: "Full Name (RU)",
      dataIndex: "fullName_RU",
      key: "fullName_RU",
    },
    {
      title: "Position (AZ)",
      dataIndex: "position_AZ",
      key: "position_AZ",
    },
    {
      title: "Position (EN)",
      dataIndex: "position_EN",
      key: "position_EN",
    },
    {
      title: "Position (RU)",
      dataIndex: "position_RU",
      key: "position_RU",
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
        <img
          src={`data:image/jpeg;base64,${image}`} // Ensure the correct MIME type
          alt="Profile"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
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
    setImageFile(file); // Store the image file for later use
    return false; // Prevent automatic upload
  };

  const handleEdit = (record) => {
    setCurrentMemberId(record.id);
    form.setFieldsValue({
      fullName_AZ: record.fullName_AZ,
      fullName_EN: record.fullName_EN,
      fullName_RU: record.fullName_RU,
      position_AZ: record.position_AZ,
      position_EN: record.position_EN,
      position_RU: record.position_RU,
      eMail: record.eMail,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}${endpoints.deleteteam}/${id}`);
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
      message.success("Team member deleted successfully!");
    } catch (error) {
      message.error(`Error deleting team member: ${error.message}`);
    }
  };

  const onFinish = async (values) => {
    try {
      // Convert image to base64 if there's an uploaded file
      const imageBase64 = imageFile ? await getBase64(imageFile) : null;

      const object = {
        fullName_AZ: values.fullName_AZ,
        fullName_EN: values.fullName_EN,
        fullName_RU: values.fullName_RU,
        position_AZ: values.position_AZ,
        position_EN: values.position_EN,
        position_RU: values.position_RU,
        eMail: values.eMail,
        image: imageBase64 || "", 
      };

      if (currentMemberId) {
        // Update existing team member
        await axios.post(BASE_URL + endpoints.addGallery, object, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTeamMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === currentMemberId ? { ...member, ...object } : member
          )
        );
        message.success("Team member updated successfully!");
      } else {
        // Add new team member
        const response = await axios.post(BASE_URL + endpoints.addteam, object);
        setTeamMembers([...teamMembers, { ...object, id: response.data.id }]);
        message.success("Team member added successfully!");
      }

      setIsModalVisible(false);
      form.resetFields();
      setCurrentMemberId(null);
      setImageFile(null); // Reset image file after submission
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(BASE_URL + endpoints.team);
        setTeamMembers(response.data);
      } catch (error) {
        message.error("Failed to fetch team members.");
      }
    };
    fetchTeamMembers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
    setCurrentMemberId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentMemberId(null);
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ float: "right", margin: "20px 0" }}
      >
        Add New Team Member
      </Button>
      <Table columns={columns} dataSource={teamMembers} rowKey="id" />
      <Modal
        title={currentMemberId ? "Edit Team Member" : "Add New Team Member"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="fullName_AZ"
            label="Full Name (AZ)"
            rules={[{ required: true, message: "Please enter your full name (AZ)" }]}
          >
            <Input placeholder="Enter full name (AZ)" />
          </Form.Item>
          <Form.Item
            name="fullName_EN"
            label="Full Name (EN)"
            rules={[{ required: true, message: "Please enter your full name (EN)" }]}
          >
            <Input placeholder="Enter full name (EN)" />
          </Form.Item>
          <Form.Item
            name="fullName_RU"
            label="Full Name (RU)"
            rules={[{ required: true, message: "Please enter your full name (RU)" }]}
          >
            <Input placeholder="Enter full name (RU)" />
          </Form.Item>
          <Form.Item
            name="position_AZ"
            label="Position (AZ)"
            rules={[{ required: true, message: "Please enter your position (AZ)" }]}
          >
            <Input placeholder="Enter position (AZ)" />
          </Form.Item>
          <Form.Item
            name="position_EN"
            label="Position (EN)"
            rules={[{ required: true, message: "Please enter your position (EN)" }]}
          >
            <Input placeholder="Enter position (EN)" />
          </Form.Item>
          <Form.Item
            name="position_RU"
            label="Position (RU)"
            rules={[{ required: true, message: "Please enter your position (RU)" }]}
          >
            <Input placeholder="Enter position (RU)" />
          </Form.Item>
          <Form.Item
            name="eMail"
            label="Email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
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
            <Button type="primary" htmlType="submit" block>
              {currentMemberId ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminTeam;
