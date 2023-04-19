import axios from "axios";
import React, { useEffect, useState } from "react";

function usePost(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const post = (body: any) => {
    setLoading(true);
    axios
      .post(url, body)
      .then((response) => {
        setStatus(response.status);
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, post, status };
}

export default usePost;
