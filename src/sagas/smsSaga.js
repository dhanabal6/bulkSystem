import {  sendSms } from "../routines";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import { call, put, fork } from "redux-saga/effects";
import api from "../api";


function* sendSmsSaga(data) {
  try {
    yield put(sendSms.request());
    console.log(data);
    const response = yield call(api.sendSms.bind(null, data));
    yield put(sendSms.success(response));
  } catch (error) {
    console.dir(error);
    yield put(sendSms.failure(error.message));
  } finally {
    yield put(sendSms.fulfill());
  }
}
export default [
  fork(takeEvery, sendSms.TRIGGER, sendSmsSaga)
];
