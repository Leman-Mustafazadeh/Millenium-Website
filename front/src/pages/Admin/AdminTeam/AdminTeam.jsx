import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Modal, Table, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";

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
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentMemberId, setCurrentMemberId] = useState(null);

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

  useEffect(()=>{
     axios.get(BASE_URL + endpoints.team).then((res)=>{
      console.log(res)
     });
    // console.log(res);
  },[])
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    getBase64(file, (base64) => {
      setImageBase64(base64);
    });
    return false; 
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
    setImageBase64(record.image);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    message.success("Team member deleted successfully!");
  };

  const onFinish = async (values) => {
    const base64Image = imageBase64.replace(/^data:image\/[a-z]+;base64,/, ""); // Remove base64 prefix

    const formData = {
      fullName_AZ: values.fullName_AZ,
      fullName_EN: values.fullName_EN,
      fullName_RU: values.fullName_RU,
      position_AZ: values.position_AZ,
      position_EN: values.position_EN,
      position_RU: values.position_RU,
      eMail: values.eMail,
      image: base64Image,
    };



    try {
      const response = await axios.post(`${BASE_URL}${endpoints.addteam}`,formData); 
      console.log(response);

    } 
    catch (error) {
      if (error.response) {
        message.error(`Server Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        message.error("No response from the server. Please check your network.");
      } else {
        message.error(`Error: ${error.message}`);
      }

      console.error("Error in Axios request:", error);
    }

    try {
      const response = await axios.post(BASE_URL+ endpoints.addteam, formData);
      console.log(response);

      if (currentMemberId) {
        setTeamMembers((prevMembers) => 
          prevMembers.map((member) => (member.id === currentMemberId ? { ...member, ...formData } : member))
        );
        message.success("Team member updated successfully!");
      } else {
        setTeamMembers([...teamMembers, { ...formData, id: teamMembers.length + 1 }]);
        message.success("Team member added successfully!");
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setCurrentMemberId(null);
      setImageBase64(null);
    } catch (error) {
      message.error(`Error: ${error.message}`);
      console.error("Error in Axios POST request:", error);
    }
  };

  // useEffect(() => {
  //   controller.getAll(endpoints.team).then((res) => {
  //     setTeamMembers(res.data); 
  //     console.log(res.data);
  //   });
  // }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentMemberId(null);
    form.resetFields();
    setImageBase64(null); // Reset image when modal is canceled
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right", margin: "20px 0" }}>
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
          <Form.Item label="Upload Image">
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
              {currentMemberId ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  ); 
};

export default AdminTeam;
