import axios from "axios";
import React, { useEffect, useState } from "react";

function useUpdate(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<number | null>(null);

  const put = (body: any) => {
    setLoading(true);
    axios
      .put(url, body)
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

  return { data, loading, error, put, status };
}

export default useUpdate;
