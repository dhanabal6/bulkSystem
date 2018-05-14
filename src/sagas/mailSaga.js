import {  sendMail } from "../routines";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import { call, put, fork } from "redux-saga/effects";
import api from "../api";


function* sendMailSaga(data) {
  try {
    yield put(sendMail.request());
    console.log(data);
    const response = yield call(api.sendMail.bind(null, data));
    console.log(response);
    yield put(sendMail.success(response));
  } catch (error) {
    console.dir(error);
    yield put(sendMail.failure(error.message));
  } finally {
    yield put(sendMail.fulfill());
  }
}
export default [
  fork(takeEvery, sendMail.TRIGGER, sendMailSaga)
];
