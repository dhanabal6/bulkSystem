import { register, login, userInfo, logout, editProfile, forgotPassword, resetPassword } from '../routines';

const initialState = {
  data: {},
  loading: false,
  loginState: false,
  error: null,
};
 
export default function registerReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
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
        loginState:false,
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
        loginState: true,
    };
    case login.FULFILL:
      return {  
        ...state,
        loginState: true,
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
    };
    case logout.FULFILL:
      return {  
        ...state,
    };

    default:
      return state;
  }
}