import { createRoutine } from 'redux-saga-routines';

export const register = createRoutine('REGISTER');
export const userInfo = createRoutine('USER_INFO');
export const login = createRoutine('LOGIN');
export const logout = createRoutine('LOGOUT');

export const sendMail = createRoutine('SEND_MAIL');