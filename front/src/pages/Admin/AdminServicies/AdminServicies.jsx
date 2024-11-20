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
          src={BASE_URL+image}
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
    // Remove the "data:image/*;base64," prefix from the base64 string, if it exists
    let cleanImageBase64 = imageBase64;
    if (cleanImageBase64 && cleanImageBase64.startsWith("data:image")) {
      cleanImageBase64 = cleanImageBase64.split(',')[1];
    }
  
    const serviceData = {
      id: currentId, // Include ID for updating service
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      image: cleanImageBase64, // Use the cleaned base64 string
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      servicesCategoryId: values.servicesCategoryId || 0, // Default to 0 if not selected
    };
  
    // Function to add a new service
    const addService = async () => {
      try {
        const response = await axios.post(
          BASE_URL + endpoints.addservice,
          serviceData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response.data) {
          setServices([...services, { ...serviceData, id: services.length + 1 }]);
          message.success("Service added successfully!");
          closeModal();
        } else {
          message.error("Failed to add service.");
        }
      } catch (error) {
        handleError(error);
      }
    };
  
    // Function to edit an existing service
    const editService = async () => {
      try {
        const response = await axios.post(
          BASE_URL + endpoints.putservice+"/"+currentId,
          serviceData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.data) {
          setServices(
            services.map((service) =>
              service.id === currentId ? { ...serviceData, id: currentId } : service
            )
          );
          message.success("Service updated successfully!");
          closeModal();
        } else {
          message.error("Failed to update service.");
        }
      } catch (error) {
        handleError(error);
      }
    };
  
    // Handle the add or edit action based on `editMode`
    if (editMode) {
      editService(); // Edit an existing service
    } else {
      addService(); // Add a new service
    }
  };
  
  // Close modal and reset form
  const closeModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setCurrentId(null);
    setImageBase64(null);
  };
  
  // Error handler to display appropriate error message
  const handleError = (error) => {
    if (error.response) {
      message.error(`Server error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      message.error("No response from the server. Please check your network.");
    } else {
      message.error(`Error: ${error.message}`);
    }
    console.error("Error in Axios request:", error);
  };
  
  
  

  useEffect(() => {
    const fetchServices = async () => {
      const res = await controller.getAll(endpoints.service);
      setServices(res);
    };

    fetchServices();
  }, []);

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
                label: item.name_EN, 
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
