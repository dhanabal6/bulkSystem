import { sendMail } from '../routines';

const initialState = {
  data: {},
  loading: false,
  error: null,
};
 
export default function mailReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case sendMail.TRIGGER:
      return {
        ...state,
        loading: true,
     };
    case sendMail.FAILURE:
      return {
        ...state,
         loading:false,
      };
    case sendMail.SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
    };
    case sendMail.FULFILL:
      return {  
        ...state,
    };
    default:
      return state;
  }
}