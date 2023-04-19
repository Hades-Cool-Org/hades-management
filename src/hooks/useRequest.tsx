import axios from "axios";
import React, { useState } from "react";
// @ts-ignore
import cookieCutter from "cookie-cutter";
import parseJwt from "@/utils/parseJwt";

function useRequest() {
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const login = (body: any) => {
    setLoadingRequest(true);
    axios
      .post("http://localhost:3333/login", body)
      .then((response) => {
        if (response.status === 200) {
          cookieCutter.set("user", JSON.stringify(parseJwt(response.data.jwt)));
          setSuccess(true);
          return response;
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  const post = (url: string, body: any) => {
    setLoadingRequest(true);
    axios
      .post(url, body)
      .then((response) => {
        setSuccess(response.status === 201);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  const put = (url: string, body: any) => {
    setLoadingRequest(true);
    axios
      .put(url, body)
      .then((response) => {
        setSuccess(response.status === 200);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  const deleteItem = (url: string, body: any) => {
    setLoadingRequest(true);
    axios
      .put(url, body)
      .then((response) => {
        setSuccess(response.status === 200);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  return { loadingRequest, error, success, login, post, put, deleteItem };
}

export default useRequest;
