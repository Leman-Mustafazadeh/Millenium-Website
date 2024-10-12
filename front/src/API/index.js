
import axios from "axios";
import { BASE_URL } from "./constant";
import { useSelector } from "react-redux";
const token = useSelector((state) => state.auth.token);
//get all
 export async function getAll(endpoint) {
  try {
    const response = await axios.get(BASE_URL + endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

//get one
export async function getOne(endpoint, id, token) {
  try {
    const response = await axios.get(BASE_URL + endpoint + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

//post

export async function post(endpoint, payload) {
  try {
    const response = await axios.post(BASE_URL + endpoint, payload);
    return response.data;

  } catch (error) {
    console.error('Error in Axios POST request:', error);

    throw new Error(error.response ? error.response.data : 'Network Error');
  }
}
// export async function post(endpoint, payload) {
//   try {
//     const response = await axios.post(BASE_URL + endpoint, payload);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// }


//delete
 export async function deleteOne(endpoint, id, token) {
  try {
    const response = await axios.delete(BASE_URL + endpoint + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 
    return response.data;
  } catch (error) {
    return error;
  }
}

//put
 export async function put(endpoint, id, payload) {
  try {
    const response = await axios.put(BASE_URL + endpoint + `/${id}`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
}

//patch
export async function patch(endpoint, id, payload, token) {
  try {
    const response = await axios.patch(
      BASE_URL + endpoint + `/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

// login

const controller = {
  post: post,
  getAll: getAll,
  getOne: getOne,
  delete: deleteOne,
  put: put,
  patch: patch,
};

export default controller;
