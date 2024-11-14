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
  const [isDeleted, setIsDeleted] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
      await controller.getOne(endpoints.delcategoryincoming, id);
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
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      text_AZ: record.text_AZ,
      text_EN: record.text_EN,
      text_RU: record.text_RU,
    });
    setImage(record.image);
    setIsDeleted(record.isDeleted);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const categoryData = {
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      image: image,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      isDeleted: false,
    };

    try {
      const response = await axios.post(
        BASE_URL + endpoints.addcategoryincoming,
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        if (editMode) {
          setCategories(categories?.map((item) => (item.id === currentId ? { ...item, ...categoryData } : item)));
          message.success("Category updated successfully!");
        } else {
          setCategories([...categories, { ...categoryData, id: response.data.id }]);
          message.success("Category added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
        setImage(null);
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
            <Form.Item label="Name (AZ)" name="name_AZ" rules={[{ required: true, message: 'Please enter the category name in AZ!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Name (EN)" name="name_EN" rules={[{ required: true, message: 'Please enter the category name in EN!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Name (RU)" name="name_RU" rules={[{ required: true, message: 'Please enter the category name in RU!' }]}>
              <Input />
            </Form.Item>
            
            <Form.Item label="Text (AZ)" name="text_AZ" rules={[{ required: true, message: 'Please enter the category description in AZ!' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Text (EN)" name="text_EN" rules={[{ required: true, message: 'Please enter the category description in EN!' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Text (RU)" name="text_RU" rules={[{ required: true, message: 'Please enter the category description in RU!' }]}>
              <Input.TextArea rows={4} />
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
