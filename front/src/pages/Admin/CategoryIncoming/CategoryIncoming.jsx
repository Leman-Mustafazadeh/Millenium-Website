import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Upload, message, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';

const CategoryIncoming = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Category" style={{ width: 100, height: 100, objectFit: 'cover' }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
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
    reader.onload = () => setImage(reader.result);
    return false;
  };

  const handleDelete = async (id) => {
    try {
      await controller.delete(endpoints.delCategory, id);
      setCategories(categories?.filter(item => item.id !== id));
      message.success("Category deleted successfully!");
    } catch (error) {
      message.error("Error deleting category.");
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      name: record.name,
    });
    setImage(record.image);
    setText(record.text);
    setIsDeleted(record.isDeleted);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    console.log(values,"dhdhdh");
    
    const categoryData = {
      name: values.name,
      image: image,
      text: text,
      isDeleted: false,
    };
console.log(categoryData);

    try {
    //   const token = JSON.parse(localStorage.getItem("token"));
    //   if (!token || token === "null") {
    //     return;
    //   }
    //   console.log(token,'dddd');
      

      const response = await axios.post(BASE_URL + endpoints.addcategoryincoming, categoryData,
         {
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        },
      }
    );

      if (response.data) {
        if (editMode) {
          setCategories(categories?.map((item) => (item.id === currentId ? { ...item, ...categoryData } : item)));
          message.success("Category updated successfully!");
        } else {
          setCategories([...categories, { ...categoryData, id: categories?.length + 1 }]);
          message.success("Category added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
        setImage(null);
        setText('');
        setIsDeleted(false);
      } else {
        message.error("Failed to add or update category.");
      }
    } catch (error) {
      message.error("Error occurred while saving data.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await controller.getAll(endpoints.categoryincoming);
      setCategories(res);
    };

    fetchCategories();
  }, []);

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage(null);
    setText('');
    setIsDeleted(false);
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <section>
      <div className="container">
        <Button type="primary" onClick={showModal} style={{ float: 'right', margin: '20px 0' }}>
          Add New Category
        </Button>
        <Table columns={columns} dataSource={categories} rowKey="id" />

        <Modal
          title={editMode ? 'Edit Category' : 'Add New Category'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the category name!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Text" name="text" rules={[{ required: true, message: 'Please enter the category description!' }]}>
              <Input.TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
              />
            </Form.Item>

            <Form.Item label="Image" name="image">
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
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                {editMode ? 'Update' : 'Submit'}
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </section>
  );
};

export default CategoryIncoming;
