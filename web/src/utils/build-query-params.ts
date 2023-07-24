export function buildQueryParams(params: URLSearchParams) {
  const queryParams = new URLSearchParams(params);

  for (const [key, value] of queryParams.entries()) {
    if (value === null || value === undefined || value === "") {
      queryParams.delete(key);
    }
  }

  return queryParams;
}
