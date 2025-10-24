import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Modal, Table, Space, Image, Tag } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, TrophyOutlined, CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";
import Cookies from 'js-cookie';
import './style.css';

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
      width: 60,
      align: 'center',
      render: (id) => <Tag color="blue" style={{ fontWeight: 600 }}>#{id}</Tag>,
    },
    {
       title: "Image",
       dataIndex: "image",
       key: "image",
       width: 120,
       align: 'center',
       render: (image) => {
         const isBase64 = image && !image.startsWith("/uploads");
         const imageUrl = isBase64
           ? `data:image/jpeg;base64,${image}` 
           : `${BASE_URL}${image}`;
 
         return (
           <div className="award-image-wrapper">
             <Image 
               src={imageUrl}
               alt="Award"
               width={80}
               height={80}
               style={{ 
                 borderRadius: '12px',
                 objectFit: 'cover',
                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                 border: '2px solid #f0f0f0',
               }}
               preview={{
                 mask: <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <EyeOutlined /> Preview
                 </div>
               }}
             />
           </div>
         );
       },
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
    axios.get(BASE_URL + endpoints.delaward + "/" + id, {
      headers: {
        Authorization: `Bearer ${Cookies.get("ftoken")}`,
      },
    }).then((res) => {
      console.log("deleted", res);
    });
    setAwards(awards.filter((award) => award.id !== id));
    message.success("Award deleted successfully!");
  };

  const onFinish = async (values) => {
    
    let image;
    if (values.image && values.image.file) {
      image = await getBase64(values.image.file);
      image = image.split(",")[1]; // Remove the base64 prefix
    } else if (currentAwardId && imageBase64) {
      image = imageBase64.split(",")[1]; // Use existing Base64 data for edits
    }
  
    const object = {
      ...values, 
      id: currentAwardId,
      isDeleted: false,
    };

    // Only add image if it exists
    if (image) {
      object.image = image;
    }
    
  
    try {

      const token = Cookies.get("ftoken");
      if (!token) {
        message.error("Authentication token is missing. Please log in again.");
        return;
      }
  
      let response;

      if (editMode) {
        // PUT request for update - remove null/undefined fields
        const cleanObject = Object.fromEntries(
          Object.entries(object).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        response = await axios.put(`${BASE_URL + endpoints.putaward}/${currentAwardId}`, cleanObject, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
      } else {
        // POST request for create
        response = await axios.post(BASE_URL + endpoints.addaward, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
      }
  
      if (response) {
        if (editMode) {
          // Update the awards list with the edited item
          setAwards(
            awards.map((item) => (item.id === currentAwardId ? { ...item, ...object } : item))
          );
          message.success("Award updated successfully!");
        } else {
          // Add the new award to the awards list
          setAwards([...awards, { ...object, id: awards.length + 1 }]);
          message.success("Award added successfully!");
        }
  
        // Reset the modal and form states
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentAwardId(null);
        setImageBase64(null);
      } else {
        message.error("Failed to add or update the award.");
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
    <div className="admin-awards-container">
      <div className="page-header">
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1f1f1f' }}>
            <TrophyOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Awards & Licenses
          </h2>
          <p style={{ margin: '8px 0 0', color: '#8c8c8c', fontSize: '14px' }}>
            Manage your awards and licenses here
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          size="large"
          className="add-award-btn"
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
          Add New Award
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={awards} 
        rowKey="id"
        className="custom-table"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} awards`,
          style: { marginTop: '24px' }
        }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '20px',
            }}>
              <TrophyOutlined />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f1f1f' }}>
                {currentAwardId ? 'Edit Award' : 'Add New Award'}
              </div>
              <div style={{ fontSize: '13px', color: '#8c8c8c', marginTop: '2px' }}>
                {currentAwardId ? 'Update award image' : 'Upload new award certificate'}
              </div>
            </div>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className="custom-award-modal"
        style={{ top: 40 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            padding: '32px', borderRadius: '12px', textAlign: 'center',
          }}>
            <Form.Item name="image" label="" style={{ marginBottom: 0 }}>
              <div className="image-upload-area">
                {imageBase64 ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={imageBase64}
                      alt="Preview"
                      style={{
                        maxWidth: '100%', height: 'auto', maxHeight: '300px',
                        borderRadius: '12px', objectFit: 'contain',
                        border: '4px solid white',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                      }}
                    />
                    <Upload name="image" maxCount={1} beforeUpload={beforeUpload} showUploadList={false}>
                      <Button
                        type="primary" shape="circle" icon={<CameraOutlined />} size="large"
                        style={{
                          position: 'absolute', bottom: '-10px', right: '-10px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                        }}
                      />
                    </Upload>
                  </div>
                ) : (
                  <Upload name="image" maxCount={1} beforeUpload={beforeUpload} showUploadList={false}>
                    <div style={{
                      width: '200px', height: '200px', margin: '0 auto',
                      borderRadius: '12px', border: '3px dashed #667eea',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', background: 'white',
                      transition: 'all 0.3s ease',
                    }} className="upload-placeholder">
                      <CameraOutlined style={{ fontSize: '48px', color: '#667eea', marginBottom: '12px' }} />
                      <div style={{ fontSize: '14px', color: '#8c8c8c', fontWeight: 500 }}>Upload Certificate</div>
                      <div style={{ fontSize: '12px', color: '#bfbfbf', marginTop: '4px' }}>Click to browse</div>
                    </div>
                  </Upload>
                )}
              </div>
            </Form.Item>
          </div>

          <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
            <Button 
              type="primary" htmlType="submit" block size="large"
              style={{
                height: '48px', fontSize: '16px', fontWeight: 600, borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              }}
              className="modal-submit-btn"
            >
              {currentAwardId ? '✓ Update Award' : '+ Add Award'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminAwards;
