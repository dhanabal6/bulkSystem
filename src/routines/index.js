import { createRoutine } from 'redux-saga-routines';

export const register = createRoutine('REGISTER');
export const userInfo = createRoutine('USER_INFO');
export const login = createRoutine('LOGIN');
export const logout = createRoutine('LOGOUT');
export const editProfile = createRoutine('EDIT_PROFILE');
export const forgotPassword = createRoutine('FORGOT_PASSWORD');
export const resetPassword = createRoutine('RESET_PASSWORD');

export const sendMail = createRoutine('SEND_MAIL');
export const sendWhatsapp = createRoutine('SEND_WHATSAPP');
export const sendSms = createRoutine('SEND_SMS');
