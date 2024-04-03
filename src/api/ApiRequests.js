import axios from "axios";

async function getByIdCommon(endpoint) {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_auth')}`;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const url = baseUrl + endpoint;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
}

async function getCommon(endpoint){
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_auth')}`;
    const baseUrl=import.meta.env.VITE_BASE_URL;
    const url = baseUrl + endpoint;
    const response = await axios.get(url);
    return response.data
  } catch (error) {
    return error
  }
 
}

async function postCommon(endpoint,values){

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_auth')}`;
  try {
    await axios.post(
      import.meta.env.VITE_BASE_URL+endpoint,
      values
    );
  } catch (error) {
    return error ;
  }
}
async function postCommonHC(endpoint,values){

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_auth')}`;
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL+endpoint,
      values
    );
    return response.data;
  } catch (error) {
    return error ;
  }
}

async function putCommon(endpoint,values){
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_auth')}`;
  try {
    await axios.put(
      import.meta.env.VITE_BASE_URL+endpoint,
      values
    );
  } catch (error) {
    alert(error)
  }
}

async function deleteCommon(endpoint){
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('_auth')}`;
  try {
    await axios.delete(
      import.meta.env.VITE_BASE_URL+endpoint
    );
  } catch (error) {
    alert(error)
  }
}


export const ApiRequests={
  getByIdCommon, 
  getCommon,
  postCommon,
  putCommon,
  deleteCommon,
  postCommonHC
}