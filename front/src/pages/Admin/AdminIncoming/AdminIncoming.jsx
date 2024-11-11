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
console.log(incomingItems);

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
          src={image}
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

  const beforeUpload = (file, index) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (index === "main") {
        setImage(reader.result);
      } else {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      }
    };
    return false;
  };

  const handleDelete = async (id) => {
    try {
      await controller.getOne(endpoints.delincoming, id);
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
      serialNumber: record.serialNumber,
    });
    setImage(record.image);
    setImages([record.image1, record.image2, record.image3, record.image4]);
    setTextAZ(record.text_AZ || "");
    setTextEN(record.text_EN || "");
    setTextRU(record.text_RU || "");
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    console.log(values,'dgfhfj');
    
    const inComingImages = images
      .map((img, index) => ({
        image: img ? `Image ${index + 1}` : "",
        base64: img || "",
      }))
      .filter((img) => img.base64);

    const object = {
      name_AZ: values.name_AZ,
      name_EN: values.name_EN,
      name_RU: values.name_RU,
      text_AZ: textAZ,
      text_EN: textEN,
      text_RU: textRU,
      serialNumber: values.serialNumber,
      image: image,
      inComingImages: inComingImages,
    };
    console.log(object,"dhdhdhhd");
    

    try {
      // const token = JSON.parse(localStorage.getItem("token"));
      // if (!token || token === "null") {
      //   return;
      // }

      const response = await axios.post(
        BASE_URL + endpoints.addincoming,
        object,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log(response,'dhdhdh');
        
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
        setIsModalVisible(false);
        form.resetFields();
        setEditMode(false);
        setCurrentId(null);
        setImage(null);
        setImages([null, null, null, null]);
        setTextAZ("");
        setTextEN("");
        setTextRU("");
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
// console.log(incomingCategories);
const categoryOptions = incomingCategories.map((category) => ({
  label: category.name, // Replace with the actual category name key
  value: category.id, // Replace with the actual category ID key
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
            <Form.Item
              label="Serial Number"
              name="serialNumber"
              rules={[
                { required: true, message: "Please select a category!" },
              ]}
            >
              <Select options={categoryOptions} placeholder="Select a category" />
            </Form.Item>


            <Form.Item label="Primary Image" name="main_image">
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

            <Form.Item label="Image 1" name="image1">
              <Upload
                name="image1"
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => beforeUpload(file, 0)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Image 2" name="image2">
              <Upload
                name="image2"
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => beforeUpload(file, 1)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Image 3" name="image3">
              <Upload
                name="image3"
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => beforeUpload(file, 2)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Image 4" name="image4">
              <Upload
                name="image4"
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => beforeUpload(file, 3)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Text (AZ)"
              name="text_AZ"
              rules={[{ required: true, message: "Please enter the text!" }]}
            >
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
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                {editMode ? "Update" : "Submit"}
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </section>
  );
};

export default AdminIncoming;
