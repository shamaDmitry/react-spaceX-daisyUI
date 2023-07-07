import { useState, useEffect } from "react";
import { _axios } from "../helpers/fetcher";

const useQuery = (url) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [query, setQuery] = useState({});
  const [options, setOptions] = useState({
    limit: 10,
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    _axios.post(url, {
      query,
      options,
    })
      .then(res => {
        setIsLoading(false);

        res.data.docs && setData(res.data.docs);

        res.data.docs && setMeta(() => ({
          "hasNextPage": res.data.hasNextPage,
          "hasPrevPage": res.data.hasPrevPage,
          "nextPage": res.data.nextPage,
          "page": res.data.page,
          "pagingCounter": res.data.pagingCounter,
          "prevPage": res.data.prevPage,
          "totalDocs": res.data.totalDocs,
          "totalPages": res.data.totalPages,
        }))
      })
      .catch(err => {
        setIsLoading(false);
        setError(true);
      })

    return () => { }
  }, [query, options]);

  return {
    data,
    error,
    isLoading,
    setQuery,
    setOptions,
    meta,
  }
}

export default useQuery;