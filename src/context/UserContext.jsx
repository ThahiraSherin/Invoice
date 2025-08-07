import { createContext, useEffect, useReducer } from "react"

export const UserContext = createContext();


const initialState = {
    name: "",
    address: "",
    invoiceNumber: "",
    date: "",
    items: []
};


const reducer = (state,action) => {
    switch (action.type) {
        case 'SET_NAME' :
            return {...state, name: action.payload};
        case 'SET_ADDRESS':
            return {...state, address: action.payload};
        case 'SET_INVOICENUMBER' :
            return {...state, invoiceNumber: action.payload};
        case 'SET_DATE' :
            return {...state, date: action.payload};
        case 'ADD_ITEM' :
          const currentItems = Array.isArray(state.items) ? state.items : [];
            return {
              ...state,
              items: [...state.items, {description: "", quantity: 1, rate: 0}]
            };
        case 'UPDATE_ITEM' :
          const itemsCopy = [...state.items]; //itemsCopy = [{ desc: "pen", qty: 2, rate: 5 }]
          const item = {...itemsCopy[action.payload.index]};//action.payload.index = 0; item = { desc: "pen", qty: 2, rate: 5 }
          item[action.payload.field] = action.payload.value;//If field = "rate" and value = 10, then item.rate = 10            
          itemsCopy[action.payload.index] = item; //Put the updated item back into the copied array at the correct index.
          return {
              ...state,items: itemsCopy
            };// Return a new state object, with the updated items array.
        
        case 'DELETE_ITEM' :{
          const itemsCopy = [...state.items];
          itemsCopy.splice(action.payload, 1); //splice(index,howmany)
          return {
            ...state, items: itemsCopy //This returns a new state
          }
        }
        default :
            return state; 
    }
};


 export const UserProvider = ({children}) => {
    const savedData = JSON.parse(localStorage.getItem("invoiceData"));
    const [state, dispatch] = useReducer (reducer, savedData || initialState);

  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(state))
  },[state]);

  return (
    <div>
      <UserContext.Provider value={{state,dispatch}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default UserContext;
