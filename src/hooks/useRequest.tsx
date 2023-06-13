import axios from "axios";
import React, { useState } from "react";
import parseJwt from "@/utils/parseJwt";
import Cookie from "js-cookie";

function useRequest() {
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const login = (body: any, callback?: any) => {
    setLoadingRequest(true);
    axios
      .post("http://localhost:3333/login", body)
      .then((response) => {
        if (response.status === 200) {
          const parsedToken = parseJwt(response.data.jwt);
          Cookie.set("user", JSON.stringify(parsedToken));
          setSuccess(true);
          callback && callback(response.data, parsedToken);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  const post = (url: string, body: any, callback?: any) => {
    setLoadingRequest(true);
    axios
      .post(url, body)
      .then((response) => {
        setSuccess(response.status === 200 || response.status === 201);
        callback && callback(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  const put = (url: string, body: any, callback?: any) => {
    setLoadingRequest(true);
    axios
      .put(url, body)
      .then((response) => {
        setSuccess(response.status === 200);
        callback && callback(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  const deleteItem = (url: string, callback?: any) => {
    setLoadingRequest(true);
    axios
      .delete(url)
      .then((response) => {
        setSuccess(response.status === 200);
        callback && callback(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  return {
    loadingRequest,
    error,
    success,
    login,
    post,
    put,
    deleteItem,
  };
}

export default useRequest;
