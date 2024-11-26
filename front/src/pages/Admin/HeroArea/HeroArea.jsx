import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Table, Upload, message } from "antd";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import controller from "../../../API";
import { BASE_URL, endpoints } from "../../../API/constant";
import Cookies from "js-cookie";

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

const HeroArea = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [heroItems, setHeroItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
      render: (image) => {
        return (
          <img
            src={BASE_URL + image}
            alt="Hero"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        );
      },
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
    controller.getOne(endpoints.delhero,id).then((res)=>{
      console.log(res);
      
    })
    // axios.delete(endpoints.de)
    setHeroItems(heroItems.filter((item) => item.id !== id));
    message.success("Hero item deleted successfully!");
  };

  const { loginData } = useSelector((state) => state.auth);

  // const handleDelete = async (id) => {
  //     try {
  //         // Send delete request to backend
  //         await axios.delete(`${BASE_URL}${endpoints.puthero}/${id}`);

  //         // Update the local state to remove the item from the table
  //         setHeroItems((prevItems) => prevItems.filter((item) => item.id !== id));

  //         // Show success message
  //         message.success("Hero item deleted successfully!");
  //     } catch (error) {
  //         // Handle potential errors from the API
  //         if (error.response) {
  //             message.error(`Error: ${error.response.status} - ${error.response.data}`);
  //         } else if (error.request) {
  //             message.error("No response from the server. Please check your network.");
  //         } else {
  //             message.error(`Error: ${error.message}`);
  //         }
  //     }
  // };

  const handleEdit = (record) => {
    controller.post(endpoints.puthero,record.id).then((res) => {
        // setEditMode(res)
        console.log(res);
    })  

    setEditMode(true);
    setCurrentId(record.id);
    form.setFieldsValue({
      name_AZ: record.name_AZ,
      name_EN: record.name_EN,
      name_RU: record.name_RU,
    });
    setIsModalVisible(true);
  };

  console.log(editMode);
  
  const onFinish = async (values) => {
    try {
      // Şəkil base64 formatına çevrilir
      const base64Image = values.image?.file
        ? await getBase64(values.image.file)
        : null;
      const strippedBase64 = base64Image
        ? base64Image.replace(/^data:image\/[a-z]+;base64,/, "")
        : "";
  
      const object = {
        id: currentId,
        name_AZ: values.name_AZ,
        name_EN: values.name_EN,
        name_RU: values.name_RU,
        image: strippedBase64, // Yalnız base64 kodunu göndəririk
      };
  
      const token = Cookies.get("ftoken");
      if (!token) {
        message.error("Authentication token is missing. Please log in again.");
        return;
      }
  
      if (editMode) {
        // Mövcud Hero itemini yenilə
        const response = await axios.post(
          `${BASE_URL}${endpoints.puthero}/${currentId}`, // Yeni endpoint
          object,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data) {
          setHeroItems((prevItems) =>
            prevItems.map((item) =>
              item.id === currentId ? { ...item, ...object } : item
            )
          );
          message.success("Hero item updated successfully!");
        } else {
          message.error("Failed to update hero item.");
        }
      } else {
        // Yeni Hero itemi əlavə et
        const response = await axios.post(BASE_URL + endpoints.addhero, object, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data) {
          setHeroItems([...heroItems, { ...object, id: response.data.id }]);
          message.success("Hero item added successfully!");
        } else {
          message.error("Failed to add hero item.");
        }
      }
  
      // Modalı bağla və formu sıfırla
      setIsModalVisible(false);
      form.resetFields();
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      if (error.response) {
        message.error(
          `Server Error: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        message.error("No response from the server. Please check your network.");
      } else {
        message.error(`Error: ${error.message}`);
      }
      console.error("Error in Axios request:", error);
    }
  };
  

  // useEffect(() => {
  //   controller.getAll(endpoints.hero).then((res) => {
  //     const formattedItems = res.map((item) => {
  //       const isBase64 = item.image && item.image.startsWith("data:image/");
  //       return {
  //         ...item,
  //         image: isBase64 ? item.image : `data:image/png;base64,${item.image}`,
  //       };
  //     });
  //     setHeroItems(formattedItems);
  //   });
  // }, []);

  useEffect(() => {
    controller.getAll(endpoints.hero).then((res) => {
      console.log(res, "ress");
      setHeroItems(res)
    });

    // const response = async () => {
    //  return await axios.get().then((res)=>{
    //   console.log(res);
      
    //  })
    // };
    // response()
   

    // const url =
    //   'https://2112-82-194-25-132.ngrok-free.app/api/Gallery/get-slides';

    // const res = async () => {
    //   try {
    //     const r = await fetch(url, {
    //       method: 'GET',
    //       headers: {
    //         'Accept': 'application/json', 
    //       },
    //     });

    //     const res = await r;
    //     console.log(res);
    //     return res;
    //   } catch (error) {
    //     console.log(error);
    //     return error;
    //   }
    // };

    //  res();
    
  }, []);
  console.log(heroItems);

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

  const beforeUpload = async (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
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
            rules={[
              { required: true, message: "Please enter the name in AZ!" },
            ]}
          >
            <input />
          </Form.Item>

          <Form.Item
            label="Name (EN)"
            name="name_EN"
            rules={[
              { required: true, message: "Please enter the name in EN!" },
            ]}
          >
            <input />
          </Form.Item>

          <Form.Item
            label="Name (RU)"
            name="name_RU"
            rules={[
              { required: true, message: "Please enter the name in RU!" },
            ]}
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
    </>
  );
};

export default HeroArea;
