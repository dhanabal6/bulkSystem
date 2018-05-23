import { register, login, userInfo, logout, editProfile, forgotPassword, resetPassword } from '../routines';

const initialState = {
  data: {},
  loading: false,
  errorMessage: null,
  message: null,
  error: null,
};
 
export default function registerReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  console.log(action.payload);
  switch (action.type) {
    case register.TRIGGER:
      return {
        ...state,
     };
    case register.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case register.SUCCESS:
      return {
        ...state,
        data: action.payload,
        errorMessage: action.payload.error,
        message: action.payload.message,
    };
    case register.FULFILL:
      return {  
        ...state,
    };

    case editProfile.TRIGGER:
      return {
        ...state,
     };
    case editProfile.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case editProfile.SUCCESS:
      return {
        ...state,
        data: action.payload,
    };
    case editProfile.FULFILL:
      return {  
        ...state,
    };
    
    case login.TRIGGER:
      return {
        ...state,
        loading: true,
     };
    case login.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case login.SUCCESS:
      return {
        ...state,
        data: action.payload,
        errorMessage: action.payload.error,
        message: action.payload.message,
    };
    case login.FULFILL:
      return {  
        ...state,
        loading: false,
    };

    case userInfo.TRIGGER:
      return {
        ...state,
     };
    case userInfo.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case userInfo.SUCCESS:
      return {
        ...state,
        data: action.payload,
    };
    case userInfo.FULFILL:
      return {  
        ...state,
    };
    
     case forgotPassword.TRIGGER:
      return {
        ...state,
     };
    case forgotPassword.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case forgotPassword.SUCCESS:
      return {
        ...state,
        data: action.payload,
        errorMessage: action.payload.error,
        message: action.payload.message,
    };
    case forgotPassword.FULFILL:
      return {  
        ...state,
    };

    case resetPassword.TRIGGER:
      return {
        ...state,
     };
    case resetPassword.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case resetPassword.SUCCESS:
      return {
        ...state,
        data: action.payload,
        errorMessage: action.payload.error,
        message: action.payload.message,
    };
    case resetPassword.FULFILL:
      return {  
        ...state,
    };

    case logout.TRIGGER:
      return {
        ...state,
     };
    case logout.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case logout.SUCCESS:
      return {
        ...state,
        data: action.payload,
        errorMessage: action.payload.error,
        message: action.payload.message,
    };
    case logout.FULFILL:
      return {  
        ...state,
    };

    default:
      return state;
  }
}