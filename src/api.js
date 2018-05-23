import axios from "axios";

const register = data =>
  axios.post(`/api/register`, data.payload).then(res => res.data);

const forgotPassword = data =>
  axios.post(`/api/forgotPassword`, data.payload).then(res => res.data);

const resetPassword = (token, data) =>
  axios.post(`/api/resetPassword/${token}`, data).then(res => res.data);

const login = data =>
  axios.post(`/api/login`, data.payload).then(res => res.data);
  
const userInfo = () => 
  axios.get(`/api`).then(res => res.data);

const logout = () => 
  axios.get(`/api/logout`).then(res => res.data);

const editProfile = (userId,data) => 
  axios.post(`/api/edit/${userId}`, data).then(res => res.data);

const sendMail = data => 
  axios.post(`/api/sendemail`, data.payload).then(res => res.data);

const sendWhatsapp = data => 
   axios.post(`/api/sendwhatsapp`, data.payload).then(res => res.data);

const sendSms = data => 
   axios.post(`/api/sendsms`,data.payload).then(res => res.data);

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  userInfo,
  logout,
  editProfile,
  sendMail,
  sendWhatsapp,
  sendSms
};
