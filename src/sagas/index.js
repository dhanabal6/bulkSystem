import userSaga from './userSaga';
import mailSaga from './mailSaga';

import { routinePromiseWatcherSaga } from 'redux-saga-routines';

export default function* rootSaga(){
  yield []
  .concat(userSaga)
  .concat(mailSaga)
  .concat(routinePromiseWatcherSaga);
}
