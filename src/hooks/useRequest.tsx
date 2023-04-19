import axios from "axios";
import React, { useState } from "react";

function useRequest() {
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<number | null>(null);

  const post = (url: string, body: any) => {
    setLoadingRequest(true);
    axios
      .post(url, body)
      .then((response) => {
        setStatus(response.status);
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
        setStatus(response.status);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoadingRequest(false);
      });
  };

  return { loadingRequest, error, status, post, put };
}

export default useRequest;
