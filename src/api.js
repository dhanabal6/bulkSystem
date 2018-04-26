import axios from "axios";

const register = data =>
  axios.post(`/api/register`, data.payload).then(res => res.data);

const login = data =>
  axios.post(`/api/login`, data.payload).then(res => res.data);

const userInfo = () => 
  axios.get(`/api`).then(res => res.data);

const logout = () => 
  axios.get(`/api/logout`).then(res => res.data);

const sendMail = data => 
  axios.post(`/api/sendemail`, data.payload).then(res => res.data);

export default {
  register,
  login,
  userInfo,
  logout,
  sendMail
};
