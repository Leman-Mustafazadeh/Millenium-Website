import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BASE_URL, endpoints } from "../../../API/constant";
import controller from "../../../API";

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

  // Fetch data on component mount
  useEffect(() => {
    const fetchIncomingItems = async () => {
      try {
        const res = await controller.getAll(endpoints.incoming);
        setIncomingItems(res);
      } catch {
        message.error("Failed to fetch incoming items.");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await controller.getAll(endpoints.categoryincoming);
        setIncomingCategories(res);
      } catch {
        message.error("Failed to fetch categories.");
      }
    };

    fetchCategories();
    fetchIncomingItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await controller.getOne(endpoints.delincoming, id);
      setIncomingItems(incomingItems.filter((item) => item.id !== id));
      message.success("Item deleted successfully!");
    } catch {
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
      serialNumber: record.serialNumber,
      category: record.categoryId,
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
    reader.readAsDataURL(file); // Convert the image to Base64
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
      .map((img, index) => ({ image: img ? `Image ${index + 1}` : "", base64: img }))
      .filter((img) => img.base64);

    const payload = {
      id: currentId,
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      text_AZ: textAZ,
      text_EN: textEN,
      text_RU: textRU,
      serialNumber: values.serialNumber,
      categoryId: values.category,
      image,
      inComingImages,
    };

    console.log("Payload:", payload); // Debugging the payload

    try {
      const endpoint = editMode ? endpoints.putincoming : endpoints.addincoming;
      await axios.post(`${BASE_URL}${endpoint}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (editMode) {
        setIncomingItems(
          incomingItems.map((item) => (item.id === currentId ? payload : item))
        );
        message.success("Incoming item updated successfully!");
      } else {
        setIncomingItems([...incomingItems, { ...payload, id: incomingItems.length + 1 }]);
        message.success("Incoming item added successfully!");
      }
      handleCancel();
    } catch (error) {
      message.error("Error occurred while saving data.");
    }
  };

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
              label="Serial Number"
              name="serialNumber"
              rules={[{ required: true, message: "Serial Number is required!" }]}
            >
              <input type="number" />
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select options={categoryOptions} placeholder="Select a category" />
            </Form.Item>
            <Form.Item label="Primary Image">
              <Upload
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
                onChange={(event, editor) => setTextAZ(editor.getData())}
              />
            </Form.Item>
            <Form.Item label="Text (EN)" name="text_EN">
              <CKEditor
                editor={ClassicEditor}
                data={textEN}
                onChange={(event, editor) => setTextEN(editor.getData())}
              />
            </Form.Item>
            <Form.Item label="Text (RU)" name="text_RU">
              <CKEditor
                editor={ClassicEditor}
                data={textRU}
                onChange={(event, editor) => setTextRU(editor.getData())}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editMode ? "Update" : "Submit"}
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </section>
  );
};

export default AdminIncoming;
