export const updateQueryString = (key: string, value: string, params?: URLSearchParams) => {
  if (!params) params = new URLSearchParams();
  else params = new URLSearchParams(params);
  params.set(key, value);
  return params;
};
