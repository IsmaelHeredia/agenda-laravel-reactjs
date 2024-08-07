import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { RootState } from "@customTypes/redux/global";
import { useSelector } from "react-redux";

const RutasNormales = () => { 

  const location = useLocation();

  const [isAuth, setIsAuth] = useState(0); // [1] Login OK [2] Bad Login

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {

    const fetchData = async () => {

      var url = import.meta.env.VITE_API_URL + "/validar";

      if(!token) {
        setIsAuth(2);
      }

      try {

        let res = await axios.post(url, {"token" : token});

        if(res.data.estado == "1") {
          setIsAuth(1);
        } else {
          setIsAuth(2);
        }     

      }
      catch(e) {
        setIsAuth(2);
      }

    }

    fetchData();

  }, []);

  if (isAuth === undefined) {
    return <Outlet />;
  }

  if(isAuth == 1) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if(isAuth == 2) {
    return <Outlet />;
  }

}

export default RutasNormales