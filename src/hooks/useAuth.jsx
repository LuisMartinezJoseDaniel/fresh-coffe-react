import React, { useCallback, useEffect } from "react";
import axiosClient from "../api/axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", (url) =>
    axiosClient(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      })
  );

  const login = async (datos, setErrors) => {
    axiosClient
      .post("/api/login", datos)
      .then(async ({ data }) => {
        localStorage.setItem("AUTH_TOKEN", data.token);
        setErrors([]);
        await mutate();
      })
      .catch((error) => {
        setErrors(Object.values(error.response.data.errors));
      });
  };

  const logout = async () => {
    if (!error) {
      await axiosClient
        .post("/api/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async () => {
          await mutate(undefined);
          localStorage.removeItem("AUTH_TOKEN");
        })
        .catch(console.log);
    }
    window.location.pathname = "/auth/login";
    // navigate("/auth/login");
  };

  const register = (datos, setErrors) => {
    axiosClient
      .post("/api/register", datos)
      .then(async ({ data }) => {
        await mutate();
        localStorage.setItem("AUTH_TOKEN", data.token);
        setErrors([]);
      })
      .catch((error) => {
        setErrors(Object.values(error.response.data.errors));
      });
  };

  useEffect(() => {
    if (middleware === "guest" && user && user.admin) {
      navigate("/admin");
      return;
    }
    if (middleware === "guest" && url && user) {
      navigate(url);
      return;
    }
    if (middleware === "admin" && user && !user.admin) {
      navigate("/");
      return;
    }
    if (middleware === "auth" && error) {
      logout();
    }
  }, [user, error]);

  console.log({ user });

  return {
    login,
    logout,
    register,
    user,
    error,
  };
};
