import React, { useState } from "react";
import { Table, Button, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL, endpoints } from "../../../API/constant";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
      reject(error);
    };
  });
};

const HeroArea = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [heroItems, setHeroItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageBase64, setImageBase64] = useState(null); // State for base64 image

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Hero" style={{ width: 100, height: 100, objectFit: "cover" }} />
      ),
    },
    {
      title: "Name (AZ)",
      dataIndex: "name_AZ",
      key: "name_AZ",
    },
    {
      title: "Name (EN)",
      dataIndex: "name_EN",
      key: "name_EN",
    },
    {
      title: "Name (RU)",
      dataIndex: "name_RU",
      key: "name_RU",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Yes" : "No"),
    },
    {
      title: "Edit",
      key: "Edit",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "Delete",
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = (id) => {
    setHeroItems(heroItems.filter((item) => item.id !== id));
    message.success("Hero item deleted successfully!");
  };

  const handleEdit = (record) => {

    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      // isActive: record.isActive,
    });
    setImageBase64(record.image); 
    setIsModalVisible(true);
  };

//   const onFinish = async (values) => {
//     const base64Image = imageBase64.replace(/^data:image\/[a-z]+;base64,/, ""); // Remove base64 prefix

//     const formData = {
//       id: editMode ? currentId : heroItems.length + 1,
//       ...values,
//       image: base64Image,
//     };
// console.log(formData,"formdata");

//     try {
//       const response = await axios.post(BASE_URL + endpoints.addhero, formData);
//       console.log(response);

//       if (editMode) {
//         setHeroItems(
//           heroItems.map((item) => (item.id === currentId ? formData : item))
//         );
//         message.success("Hero item updated successfully!");
//       } else {
//         setHeroItems([...heroItems, formData]);
//         message.success("Hero item added successfully!");
//       }
//       setIsModalVisible(false);
//       form.resetFields();
//       setEditMode(false);
//       setCurrentId(null);
//       setImageBase64(null); 
//     } catch (error) {
//       if (error.response) {
//         message.error(`Server Error: ${error.response.status} - ${error.response.data}`);
//       } else if (error.request) {
//         message.error("No response from the server. Please check your network.");
//       } else {
//         message.error(`Error: ${error.message}`);
//       }
//       console.error("Error in Axios request:", error);
//     }
//   };

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
    setImageBase64(null); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditMode(false);
    setCurrentId(null);
    setImageBase64(null); 
  };

  const beforeUpload = async (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    
    try {
      const base64 = await getBase64(file);
      setImageBase64(base64);
    } catch (error) {
      message.error("Error uploading image");
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ float: "right", margin: "20px 0" }}
      >
        Add New Hero Item
      </Button>
      <Table columns={columns} dataSource={heroItems} rowKey="id" />

      <Modal
        title={editMode ? "Edit Hero Item" : "Add New Hero Item"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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

          <Form.Item
            label="Name (AZ)"
            name="name_AZ"
            rules={[{ required: true, message: "Please enter the name in AZ!" }]}
          >
            <input />
          </Form.Item>

          <Form.Item
            label="Name (EN)"
            name="name_EN"
            rules={[{ required: true, message: "Please enter the name in EN!" }]}
          >
            <input />
          </Form.Item>

          <Form.Item
            label="Name (RU)"
            name="name_RU"
            rules={[{ required: true, message: "Please enter the name in RU!" }]}
          >
            <input />
          </Form.Item>

          {/* <Form.Item label="Active" name="isActive" valuePropName="checked">
            <input type="checkbox" />
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

export default HeroArea;
