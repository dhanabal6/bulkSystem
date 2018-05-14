import {  sendWhatsapp } from "../routines";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import { call, put, fork } from "redux-saga/effects";
import api from "../api";


function* sendWhatsappSaga(data) {
  try {
    yield put(sendWhatsapp.request());
    console.log(data);
    const response = yield call(api.sendWhatsapp.bind(null, data));
    yield put(sendWhatsapp.success(response));
  } catch (error) {
    console.dir(error);
    yield put(sendWhatsapp.failure(error.message));
  } finally {
    yield put(sendWhatsapp.fulfill());
  }
}
export default [
  fork(takeEvery, sendWhatsapp.TRIGGER, sendWhatsappSaga)
];
