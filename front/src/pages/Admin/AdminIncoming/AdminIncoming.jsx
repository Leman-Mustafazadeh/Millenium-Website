import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";
import Cookies from "js-cookie";

const AdminIncoming = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [incomingItems, setIncomingItems] = useState([]);
  const [incomingCategories, setIncomingCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);
  const [textAZ, setTextAZ] = useState("");
  const [textEN, setTextEN] = useState("");
  const [textRU, setTextRU] = useState("");

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
        <img
          src={BASE_URL + image}
          alt="Incoming"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
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

  const handleDelete = async (id) => {
    try {
      await axios.get(BASE_URL + endpoints.delincoming + "/" + id,{
        headers: {
          Authorization: `Bearer ${Cookies.get("ftoken")}`,
        },
      });
      setIncomingItems(incomingItems.filter((item) => item.id !== id));
      message.success("Item deleted successfully!");
    } catch (error) {
      message.error("Error deleting item.");
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
      title_AZ: record.title_AZ,
      title_EN: record.title_EN,
      title_RU: record.title_RU,
      serialNumber: record.serialNumber,
      category: record.categoryId,
      text_AZ: record.text_AZ || "",
      text_EN: record.text_EN || "",
      text_RU: record.text_RU || "",
    });
    setImage(record.image);
    setImages([record.image1, record.image2, record.image3, record.image4]);
    setTextAZ(record.text_AZ || "");
    setTextEN(record.text_EN || "");
    setTextRU(record.text_RU || "");
    setIsModalVisible(true);
  };

  const beforeUpload = (file, index) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      if (index === "main") {
        setImage(base64String);
      } else {
        const newImages = [...images];
        newImages[index] = base64String;
        setImages(newImages);
      }
    };
    return false;
  };

  const onFinish = async (values) => {
    const inComingImages = images
      .map((img, index) => (img ? { image: `image${index + 1}`, base64: img } : null))
      .filter((img) => img);

    const object = {
      id: currentId,
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      title_AZ: values.title_AZ,
      title_EN: values.title_EN,
      title_RU: values.title_RU,
      text_AZ: values.text_AZ,
      text_EN: values.text_EN,
      text_RU: values.text_RU,
      serialNumber: values.serialNumber,
      image,
      inComingImages,
    };

    try {
      const token = Cookies.get("ftoken");
      if (!token) {
        message.error("Authentication token is missing. Please log in again.");
        return;
      }

      const url = editMode
        ? `${BASE_URL + endpoints.putincoming}/${currentId}`
        : BASE_URL + endpoints.addincoming;

      const response = await axios.post(url, object, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

      });

      if (response) {
        if (editMode) {
          setIncomingItems(
            incomingItems.map((item) => (item.id === currentId ? object : item))
          );
          message.success("Incoming item updated successfully!");
        } else {
          setIncomingItems([
            ...incomingItems,
            { ...object, id: incomingItems.length + 1 },
          ]);
          message.success("Incoming item added successfully!");
        }
        handleCancel();
      } else {
        message.error("Failed to add or update incoming item.");
      }
    } catch (error) {
      message.error("Error occurred while saving data.");
    }
  };

  useEffect(() => {
    const fetchIncomingItems = async () => {
      const res = await controller.getAll(endpoints.incoming);
      setIncomingItems(res);
    };

    const fetchCategories = async () => {
      const res = await controller.getAll(endpoints.categoryincoming);
      setIncomingCategories(res);
    };

    fetchCategories();
    fetchIncomingItems();
  }, []);

  const categoryOptions = incomingCategories.map((category) => ({
    label: category.name_EN,
    value: category.id,
  }));

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImage(null);
    setImages([null, null, null, null]);
    setEditMode(false);
    setCurrentId(null);
    setTextAZ("");
    setTextEN("");
    setTextRU("");
  };

  return (
    <section>
      <div className="container">
        <Button
          type="primary"
          onClick={showModal}
          style={{ float: "right", margin: "20px 0" }}
        >
          Add New Incoming Item
        </Button>
        <Table columns={columns} dataSource={incomingItems} rowKey="id" />

        <Modal
          title={editMode ? "Edit Incoming Item" : "Add New Incoming Item"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name (AZ)"
              name="name_AZ"
              rules={[{ required: true, message: "Please enter the name in AZ!" }]}
            >
              <input />
            </Form.Item>

            <Form.Item label="Name (EN)" name="name_EN">
              <input />
            </Form.Item>

            <Form.Item label="Name (RU)" name="name_RU">
              <input />
            </Form.Item>

            <Form.Item
              label="Title (AZ)"
              name="title_AZ"
              rules={[{ required: true, message: "Please enter the title in AZ!" }]}
            >
              <input />
            </Form.Item>

            <Form.Item label="Title (EN)" name="title_EN">
              <input />
            </Form.Item>

            <Form.Item label="Title (RU)" name="title_RU">
              <input />
            </Form.Item>

            <Form.Item label="Category" name="serialNumber">
              <Select options={categoryOptions} placeholder="Select a category" />
            </Form.Item>

            <Form.Item label="Primary Image">
              <Upload
                name="main_image"
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => beforeUpload(file, "main")}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            {[...Array(4)].map((_, index) => (
              <Form.Item key={index} label={`Image ${index + 1}`}>
                <Upload
                  name={`image${index}`}
                  listType="picture"
                  maxCount={1}
                  beforeUpload={(file) => beforeUpload(file, index)}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            ))}

            <Form.Item label="Text (AZ)" name="text_AZ">
              <CKEditor
                editor={ClassicEditor}
                data={textAZ}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setTextAZ(data);
                  form.setFieldsValue({ text_AZ: data });
                }}
              />
            </Form.Item>

            <Form.Item label="Text (EN)" name="text_EN">
              <CKEditor
                editor={ClassicEditor}
                data={textEN}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setTextEN(data);
                  form.setFieldsValue({ text_EN: data });
                }}
              />
            </Form.Item>

            <Form.Item label="Text (RU)" name="text_RU">
              <CKEditor
                editor={ClassicEditor}
                data={textRU}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setTextRU(data);
                  form.setFieldsValue({ text_RU: data });
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editMode ? "Update Item" : "Add Item"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </section>
  );
};

export default AdminIncoming;
