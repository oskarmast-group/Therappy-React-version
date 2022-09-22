import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const RouterContext = React.createContext();

const RouterProvider = ({ children }) => {
  const location = useLocation();
  const [route, setRoute] = useState({
    to: location.pathname,
    from: location.pathname,
  });

  useEffect(() => {
    setRoute((prev) => ({ to: location.pathname, from: prev.to }));
  }, [location]);

  const canGoBack = () => !!route.from && route.from!==route.to;

  const goBack = (defaultRoute) => canGoBack() ? route.from : defaultRoute; 

  return <RouterContext.Provider value={{route, canGoBack, goBack}}>{children}</RouterContext.Provider>;
};

export const useRouter = () => React.useContext(RouterContext);

export default RouterProvider;