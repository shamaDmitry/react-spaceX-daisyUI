import { _axios } from "./fetcher";

export const postFetcher = async({url, query, options}) => {
  const response = await _axios.post(url, {
    query: query,
    options: options,
  })
  return response.data;
}