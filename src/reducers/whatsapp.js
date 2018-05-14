import { sendWhatsapp } from '../routines';

const initialState = {
  data: [],
  loading: false,
  error: null,
};
 
export default function whatsappReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case sendWhatsapp.TRIGGER:
      return {
        ...state,
        loading: true,
     };
    case sendWhatsapp.FAILURE:
      return {
        ...state,
         loading:false,
      };
    case sendWhatsapp.SUCCESS:
      return {
        ...state,
        loading: false,
    };
    case sendWhatsapp.FULFILL:
      return {  
        ...state,
    };
    default:
      return state;
  }
}