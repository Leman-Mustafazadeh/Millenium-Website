import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Modal,
  Table,
  Space,
  Image,
  Tag,
  Tooltip,
  Tabs,
  Row,
  Col,
  Divider,
} from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, UserOutlined, MailOutlined, GlobalOutlined, CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";
import Cookies from "js-cookie";
import './style.css';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(",")[1]; // Extract base64 part
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
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      align: 'center',
      render: (id) => <Tag color="blue" style={{ fontWeight: 600 }}>#{id}</Tag>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      align: 'center',
      render: (image) => {
        const isBase64 = image && !image.startsWith("/uploads");
        const imageUrl = isBase64
          ? `data:image/jpeg;base64,${image}` 
          : `${BASE_URL}${image}`;

        return (
          <div className="team-image-wrapper">
            <Image
              src={imageUrl}
              alt="Profile"
              width={70}
              height={70}
              style={{ 
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '3px solid #f0f0f0',
              }}
              preview={{
                mask: <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <EyeOutlined /> View
                </div>
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName_AZ",
      key: "fullName_AZ",
      width: 200,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserOutlined style={{ color: '#667eea', fontSize: '16px' }} />
          <div>
            <div style={{ fontWeight: 500, color: '#1f1f1f' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.fullName_EN}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Position",
      dataIndex: "position_AZ",
      key: "position_AZ",
      width: 180,
      render: (text, record) => (
        <div>
          <Tag color="purple" style={{ marginBottom: '4px' }}>{text}</Tag>
          <div style={{ fontSize: '11px', color: '#8c8c8c' }}>{record.position_EN}</div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "eMail",
      key: "eMail",
      width: 200,
      render: (email) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MailOutlined style={{ color: '#667eea' }} />
          <span style={{ color: '#595959', fontSize: '13px' }}>{email}</span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
            }}
          >
            Edit
          </Button>
          <Button 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={{ borderRadius: '8px' }}
          >
            Delete
          </Button>
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
    getBase64(file).then((base64) => setImagePreview(base64)); // Set image preview
    return false; // Prevent automatic upload
  };

  const handleEdit = (record) => {
    // Set current member ID
    setCurrentMemberId(record.id);

    // Pre-fill the form with selected record values
    form.setFieldsValue({
      fullName_AZ: record.fullName_AZ,
      fullName_EN: record.fullName_EN,
      fullName_RU: record.fullName_RU,
      position_AZ: record.position_AZ,
      position_EN: record.position_EN,
      position_RU: record.position_RU,
      eMail: record.eMail,
    });

    // Set image preview if image exists
    if (record.image) {
      const isBase64 = record.image && !record.image.startsWith("/uploads");
      if (isBase64) {
        setImagePreview(record.image);
      } else {
        // For server images, we need to fetch and convert to base64
        // For now, just clear the preview on edit
        setImagePreview(null);
      }
    }

    // Open the modal for editing
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    try {
      axios.get(BASE_URL + endpoints.delteam + "/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      });
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
      message.success("Team member deleted successfully!");
    } catch (error) {
      message.error(`Error deleting team member: ${error.message}`);
    }
  };

  const onFinish = async (values) => {
    try {
      // Convert image to base64 if an image file exists
      const imageBase64 = imageFile ? await getBase64(imageFile) : null;
      const strippedBase64 = imageBase64
        ? imageBase64.replace(/^data:image\/[a-z]+;base64,/, "")
        : "";
      
      const object = {
        id: currentMemberId,
        fullName_AZ: values.fullName_AZ,
        fullName_EN: values.fullName_EN,
        fullName_RU: values.fullName_RU,
        position_AZ: values.position_AZ,
        position_EN: values.position_EN,
        position_RU: values.position_RU,
        eMail: values.eMail,
        isDeleted: false,
      };

      // Only add image if it exists
      if (strippedBase64) {
        object.image = strippedBase64;
      }

      const token = Cookies.get("ftoken");
      if (!token) {
        message.error("Authentication token is missing. Please log in again.");
        return;
      }

      if (currentMemberId) {
        // Update existing team member - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        await axios.put(
          `${BASE_URL}${endpoints.putteam}/${currentMemberId}`,
          cleanObject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeamMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === currentMemberId ? { ...member, ...object } : member
          )
        );
        message.success("Team member updated successfully!");
      } else {
        // Add new team member
        const response = await axios.post(BASE_URL + endpoints.addteam, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setTeamMembers([...teamMembers, { ...object, id: response.data.id }]);
        message.success("Team member added successfully!");
      }

      setIsModalVisible(false);
      form.resetFields();
      setCurrentMemberId(null);
      setImageFile(null);
      setImagePreview(null); // Reset image preview after submission
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
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentMemberId(null);
    setImageFile(null);
    setImagePreview(null);
    form.resetFields();
  };

  return (
    <div className="admin-team-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            Team Management
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage your team members here
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-team-btn"
          style={{ 
            borderRadius: '10px',
            height: '44px',
            fontSize: '15px',
            fontWeight: 500,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          }}
        >
          Add New Team Member
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={teamMembers} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} members`,
          style: { marginTop: '24px' }
        }}
        scroll={{ x: 1000 }}
      />
      <Modal
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '8px 0',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
            }}>
              <UserOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {currentMemberId ? "Edit Team Member" : "Add New Team Member"}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {currentMemberId ? "Update member information" : "Fill in the details below"}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={720}
        className="custom-team-modal"
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Image Upload Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            textAlign: 'center',
          }}>
            <Form.Item label="" name="image" style={{ marginBottom: 0 }}>
              <div className="image-upload-area">
                {imagePreview ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={`data:image/jpeg;base64,${imagePreview}`}
                      alt="Preview"
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid white',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                      }}
                    />
                    <Upload
                      name="image"
                      maxCount={1}
                      beforeUpload={beforeUpload}
                      showUploadList={false}
                    >
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<CameraOutlined />}
                        size="large"
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          right: '0',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                        }}
                      />
                    </Upload>
                  </div>
                ) : (
                  <Upload
                    name="image"
                    maxCount={1}
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                  >
                    <div style={{
                      width: '120px',
                      height: '120px',
                      margin: '0 auto',
                      borderRadius: '50%',
                      border: '3px dashed #667eea',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      background: 'white',
                      transition: 'all 0.3s ease',
                    }}
                    className="upload-placeholder"
                    >
                      <CameraOutlined style={{ fontSize: '32px', color: '#667eea', marginBottom: '8px' }} />
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Upload Photo</div>
                    </div>
                  </Upload>
                )}
              </div>
            </Form.Item>
          </div>

          {/* Multilingual Fields with Tabs */}
          <Tabs
            defaultActiveKey="1"
            className="custom-form-tabs"
            items={[
              {
                key: '1',
                label: (
                  <span>
                    <GlobalOutlined /> Azerbaijani
                  </span>
                ),
                children: (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="fullName_AZ"
                        label="Full Name"
                        rules={[{ required: true, message: "Please enter full name" }]}
                      >
                        <Input 
                          prefix={<UserOutlined style={{ color: '#8c8c8c' }} />}
                          placeholder="Ad Soyad" 
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="position_AZ"
                        label="Position"
                        rules={[{ required: true, message: "Please enter position" }]}
                      >
                        <Input 
                          placeholder="Vəzifə" 
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
              {
                key: '2',
                label: (
                  <span>
                    <GlobalOutlined /> English
                  </span>
                ),
                children: (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="fullName_EN"
                        label="Full Name"
                        rules={[{ required: true, message: "Please enter full name" }]}
                      >
                        <Input 
                          prefix={<UserOutlined style={{ color: '#8c8c8c' }} />}
                          placeholder="Full Name" 
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="position_EN"
                        label="Position"
                        rules={[{ required: true, message: "Please enter position" }]}
                      >
                        <Input 
                          placeholder="Position" 
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
              {
                key: '3',
                label: (
                  <span>
                    <GlobalOutlined /> Russian
                  </span>
                ),
                children: (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="fullName_RU"
                        label="Full Name"
                        rules={[{ required: true, message: "Please enter full name" }]}
                      >
                        <Input 
                          prefix={<UserOutlined style={{ color: '#8c8c8c' }} />}
                          placeholder="Полное имя" 
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="position_RU"
                        label="Position"
                        rules={[{ required: true, message: "Please enter position" }]}
                      >
                        <Input 
                          placeholder="Позиция" 
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
            ]}
          />

          <Divider style={{ margin: '24px 0' }} />

          {/* Email Field */}
          <Form.Item
            name="eMail"
            label="Email Address"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: '#8c8c8c' }} />}
              placeholder="email@example.com" 
              size="large"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              style={{
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              }}
              className="modal-submit-btn"
            >
              {currentMemberId ? "✓ Update Team Member" : "+ Add Team Member"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminTeam;
