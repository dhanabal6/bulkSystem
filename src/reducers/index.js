import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import mail from './mail';

export default combineReducers({
  router: routerReducer,
  user,
  mail,
  form: formReducer,
});