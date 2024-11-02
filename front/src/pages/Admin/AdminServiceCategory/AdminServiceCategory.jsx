import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, message } from 'antd';
import axios from 'axios';
import { BASE_URL, endpoints } from '../../../API/constant';
import controller from '../../../API';

const AdminServiceCategory = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record?.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await controller.getOne(endpoints.delservicecategory,id).then((res)=>{
        console.log(res);
      })
      setCategories(categories.filter(category => category.id !== id));
      message.success("Category deleted successfully!");
    } catch (error) {
      message.error("Error deleting category.");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      name: record.name,
    });
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const object = {
      id: currentId || 0, // New items will have an ID of 0
      name: values.name,
      isDeleted: false, // Default to false
    };

    try {
      // const token = JSON.parse(localStorage.getItem("token"));
      // if (!token || token === "null") {
      //   console.log("Token not found or is null");
      //   return;
      // }

      const response = await axios.post(BASE_URL + endpoints.addservicecategory, object, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        if (editMode) {
          setCategories(
            categories.map((category) => (category.id === currentId ? object : category))
          );
          message.success("Category updated successfully!");
        } else {
          setCategories([...categories, { ...object, id: categories.length + 1 }]);
          message.success("Category added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
      } else {
        message.error("Failed to add or update category.");
      }
    } catch (error) {
      message.error("Error occurred while saving data.");
      console.error("Error in Axios request:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await controller.getAll(endpoints.servicecategory);
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
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <section>
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
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the category name!' }]}
          >
            <input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default AdminServiceCategory;
