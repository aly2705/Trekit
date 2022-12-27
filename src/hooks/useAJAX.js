import { useState, useCallback } from "react";

const useAJAX = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (reqConfigObj, processDataFn) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(reqConfigObj.url, {
        method: reqConfigObj.method,
        headers: reqConfigObj.headers,
        body: JSON.stringify(reqConfigObj.body),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      processDataFn(data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, []);

  return { sendRequest, error, isLoading, setError, setIsLoading };
};

export default useAJAX;
