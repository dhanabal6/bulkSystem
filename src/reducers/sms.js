import { sendSms } from '../routines';

const initialState = {
  data: [],
  loading: false,
  error: null,
};
 
export default function smsReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case sendSms.TRIGGER:
      return {
        ...state,
        loading: true,
     };
    case sendSms.FAILURE:
      return {
        ...state,
         loading:false,
      };
    case sendSms.SUCCESS:
      return {
        ...state,
        loading: false,
    };
    case sendSms.FULFILL:
      return {  
        ...state,
    };
    default:
      return state;
  }
}