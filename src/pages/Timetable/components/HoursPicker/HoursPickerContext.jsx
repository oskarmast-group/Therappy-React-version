import React, { useReducer } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const HoursPickerContext = React.createContext();

const errorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, [action.id]: action.error };
    case 'REMOVE_ERROR':
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

const HoursPickerProvider = ({ children, setWithError }) => {
    const [state, dispatch] = useReducer(errorReducer, {});

    useEffect(()=>{
        setWithError(Object.values(state).some((value)=>value));
    }, [state]);

    return (
        <HoursPickerContext.Provider value={{ dispatch }}>
          {children}
        </HoursPickerContext.Provider>
    );
};

export const useHoursPicker = () => React.useContext(HoursPickerContext);

export default HoursPickerProvider;
