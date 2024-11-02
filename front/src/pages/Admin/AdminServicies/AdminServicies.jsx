import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";
import { Select, Space } from "antd";

const AdminServices = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name (AZ)",
      dataIndex: "name_AZ",
      key: "name_AZ",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Service"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageBase64(reader.result);
    return false;
  };

  const handleDelete = async (id) => {
    try {
      await controller.getOne(endpoints.delservice, id).then((res)=>{
        console.log(res);
      }) 
      setServices(services.filter((service) => service.id !== id));
      message.success("Service deleted successfully!");
    } catch (error) {
      message.error("Error deleting service.");
      console.error("Delete error:", error);
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
    setImageBase64(record.image);
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const object = {
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      image: imageBase64,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      servicesCategoryId: values.servicesCategoryId || 0,
     
    };

    try {
      // const token = JSON.parse(localStorage.getItem("token"));
      // if (!token || token === "null") {
      //   console.log("Token not found or is null");
      //   return;
      // }

      const response = await axios.post(
        BASE_URL + endpoints.addservice,
        object,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        if (editMode) {
          setServices(
            services.map((service) =>
              service.id === currentId ? object : service
            )
          );
          message.success("Service updated successfully!");
        } else {
          setServices([...services, { ...object, id: services.length + 1 }]);
          message.success("Service added successfully!");
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
        setImageBase64(null);
      } else {
        message.error("Failed to add or update service.");
      }
    } catch (error) {
      message.error("Error occurred while saving data.");
      console.error("Error in Axios request:", error);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const res = await controller.getAll(endpoints.service);
      setServices(res);
    };

    fetchServices();
  }, []);
  console.log();

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

  const [serviceCategory, setServiceCategory] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await controller.getAll(endpoints.servicecategory);
      setServiceCategory(res);
    };

    fetchCategories();
  }, []);
  console.log(serviceCategory);

  return (
    <section>
      <Button
        type="primary"
        onClick={showModal}
        style={{ float: "right", margin: "20px 0" }}
      >
        Add New Service
      </Button>
      <Table columns={columns} dataSource={services} rowKey="id" />

      <Modal
        title={editMode ? "Edit Service" : "Add New Service"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Service Category" name="servicesCategoryId" rules={[{ required: true }]}>
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
              }}
              placeholder="Select a Service Category"
              onChange={handleChange} 
              options={serviceCategory.map((item) => ({
                value: item.id, 
                label: item.name, 
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Name (AZ)"
            name="name_AZ"
            rules={[
              { required: true, message: "Please enter the name in AZ!" },
            ]}
          >
            <input />
          </Form.Item>

          <Form.Item label="Name (EN)" name="name_EN">
            <input />
          </Form.Item>

          <Form.Item label="Name (RU)" name="name_RU">
            <input />
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

          <Form.Item
            label="Description (AZ)"
            name="text_AZ"
            rules={[
              {
                required: true,
                message: "Please enter the description in AZ!",
              },
            ]}
          >
            <input />
          </Form.Item>

          <Form.Item label="Description (EN)" name="text_EN">
            <input />
          </Form.Item>

          <Form.Item label="Description (RU)" name="text_RU">
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

export default AdminServices;
