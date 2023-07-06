import { useState, useEffect } from "react";
import { _axios } from "../helpers/fetcher";

const useQuery = (url, query = {}, options = {}) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // setData(null);
    setError(false);

    _axios.post(url, {
      query: {
        ...query,
      },
      options: {
        limit: 10,
        page: pageIndex,
        ...options,
      }
    })
      .then(res => {
        setIsLoading(false);
        res.data.docs && setData(res.data.docs);

        res.data.docs && setMeta(() => ({
          "hasNextPage": res.data.hasNextPage,
          "hasPrevPage": res.data.hasPrevPage,
          "nextPage": res.data.nextPage,
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
  }, [pageIndex]);

  return {
    data,
    error,
    isLoading,
    pageIndex,
    setPageIndex,
    meta,
  }
}

export default useQuery;