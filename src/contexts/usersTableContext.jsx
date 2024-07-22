import React, { useMemo, useReducer } from "react";
import { useState, useContext } from "react";

const UsersTableContext = React.createContext();

export const useUsersTableContext = () => {
  return useContext(UsersTableContext);
}

export const UsersTableContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const initialState = {
    search: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
  }

  const reducer = (state, {type, payload}) => {
    switch (type) {
      case "search":
        return {...initialState, search: payload};
      case "age":
        return {...initialState, age: payload};
      case "gender":
        return {...initialState, gender: payload};
      case "phone":
        return {...initialState, phone: payload};
      case "address":
        return {...initialState, address: payload};

      default:
        return state;
    }
  }

  const [input, dispatch] = useReducer(reducer, initialState);
  const [order, setOrder] = useState({
    field: '',
    type: '',
  });
  const [singleUserId, setSingleUserId] = useState();

  const contextValue = useMemo(() => ({
    users,
    setUsers,
    search: input.search,
    setSearch: (value) => dispatch({type: "search", payload: value}),
    age: input.age,
    setAge: (value) => dispatch({type: "age", payload: value}),
    gender: input.gender,
    setGender: (value) => dispatch({type: "gender", payload: value}),
    phone: input.phone,
    setPhone: (value) => dispatch({type: "phone", payload: value}),
    address: input.address,
    setAddress: (value) => dispatch({type: "address", payload: value}),
    order,
    setOrder,
    isOpen,
    setIsOpen,
    singleUserId,
    setSingleUserId
  }), [
    users,
    input.search,
    input.age,
    input.gender,
    input.phone,
    input.address,
    order,
    isOpen,
    singleUserId
  ]);

  return <UsersTableContext.Provider value={contextValue}>
    {children}
  </UsersTableContext.Provider>
}