const initialState = {
    nav: null,
    submitloading:false,
    error:null,
    loading:false,
  };
  
  const Navigation= (state = initialState, action) => {
    switch (action.type) {
      case "SET_REF":
        return {
          ...state,
          nav: action.payload,
          loading: false,
          error: null,
        };
      case "REF":
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      default:
        
        return state;
    }
  };
  
  export default Navigation;
  