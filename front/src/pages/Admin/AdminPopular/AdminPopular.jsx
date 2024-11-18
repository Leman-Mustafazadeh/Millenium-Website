import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Upload, message, Checkbox, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';
import Cookies from 'js-cookie'


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

const AdminPopular = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popularItems, setPopularItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={BASE_URL+image} alt="Popular" style={{ width: 100, height: 100, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Name (AZ)',
      dataIndex: 'name_AZ',
      key: 'name_AZ',
    },
    {
      title: 'Name (EN)',
      dataIndex: 'name_EN',
      key: 'name_EN',
    },
    {
      title: 'Name (RU)',
      dataIndex: 'name_RU',
      key: 'name_RU',
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
        </>
      ),
    },
    {
      title: 'Delete',
      key: 'Delete',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
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
      const base64String = reader.result.split(",")[1]; // Remove the prefix
      setImageBase64(base64String);
    };
    return false; // Prevent auto-upload by the Upload component
  };
  

  const handleDelete = async (id) => {
    try {
      await controller.getOne(endpoints.deltour,id).then((res)=>{
        console.log(res);
      })
      message.success("Popular item deleted successfully!");
      
      setPopularItems(popularItems.filter(item => item.id !== id));
    } catch (error) {
      message.error("Failed to delete popular item.");
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      id: record.id,
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      isDeleted: record.isDeleted,
    });
    setImageBase64(record.image);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const object = {
        name_AZ: values.name_AZ,
        name_EN: values.name_EN,
        name_RU: values.name_RU,
        image: imageBase64, // Base64 without the prefix
        isDeleted: false,
      };
  
      const token = Cookies.get("ftoken");
      const response = await axios.post(BASE_URL + endpoints.addtour, object, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        if (editMode) {
          setPopularItems(
            popularItems.map((item) => (item.id === currentId ? { ...item, ...object } : item))
          );
          message.success("Popular item updated successfully!");
        } else {
          setPopularItems((prevItems) => [
            ...prevItems,
            { ...object, id: prevItems.length + 1 },
          ]);
          message.success("Popular item added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
      } else {
        message.error("Failed to add or update popular item.");
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
  
  

useEffect(()=>{
  controller.getAll(endpoints.tour).then((res)=>{
    setPopularItems(res)
    console.log(res);
  })
},[])
console.log(popularItems);


  const showModal = () => {
    setEditMode(false);
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
      <Button type="primary" onClick={showModal} style={{ float: 'right', margin: '20px 0' }}>
        Add New Popular Item
      </Button>
      <Table columns={columns} dataSource={popularItems} rowKey="id" />

      <Modal
        title={editMode ? 'Edit Popular Item' : 'Add New Popular Item'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ isDeleted: false }}
        >
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

          <Form.Item label="Name (AZ)" name="name_AZ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Name (EN)" name="name_EN" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Name (RU)" name="name_RU" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          {/* <Form.Item name="isDeleted" valuePropName="checked">
            <Checkbox>Mark as deleted</Checkbox>
          </Form.Item> */}

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

export default AdminPopular;
