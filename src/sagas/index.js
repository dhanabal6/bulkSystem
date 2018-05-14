import userSaga from './userSaga';
import mailSaga from './mailSaga';
import whatsappSaga from './whatsappSaga';
import smsSaga from './smsSaga';

import { routinePromiseWatcherSaga } from 'redux-saga-routines';

export default function* rootSaga(){
  yield []
  .concat(userSaga)
  .concat(mailSaga)
  .concat(whatsappSaga)
  .concat(smsSaga)
  .concat(routinePromiseWatcherSaga);
}
