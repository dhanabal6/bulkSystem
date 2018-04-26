import {
  register,
  login,
  userInfo,
  logout
} from "../routines";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import { call, put, fork } from "redux-saga/effects";
import api from "../api";

function* registerSaga(data) {
  try {
    yield put(register.request());
    const response = yield call(api.register.bind(null, data));
    yield put(register.success(response));
  } catch (error) {
    yield put(register.failure(error.message));
  } finally {
    yield put(register.fulfill());
  }
}

function* loginSaga(data) {
  try {
    yield put(login.request());
    const response = yield call(api.login.bind(null, data));
    yield put(login.success(response));
  } catch (error) {
    console.dir(error);
    yield put(login.failure(error.message));
  } finally {
    yield put(login.fulfill());
  }
}



function* userInfoSaga() {
  try {
    yield put(userInfo.request());
    const response = yield call(api.userInfo);
    yield put(userInfo.success(response));
  } catch (error) {
    yield put(userInfo.failure(error.message));
  } finally {
    yield put(userInfo.fulfill());
  }
}

function* logoutSaga() {
  try {
    yield put(logout.request());
    const response = yield call(api.logout);
    yield put(logout.success(response));
  } catch (error) {
    yield put(logout.failure(error.message));
  } finally {
    yield put(push("/"));
    yield put(logout.fulfill());
  }
}

export default [
  fork(takeEvery, register.TRIGGER, registerSaga),
  fork(takeEvery, login.TRIGGER, loginSaga),
  fork(takeEvery, userInfo.TRIGGER, userInfoSaga),
  fork(takeEvery, logout.TRIGGER, logoutSaga)
];
