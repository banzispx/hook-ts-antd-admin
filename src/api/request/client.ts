import Http from './../http';
const baseUrl = 'http://localhost:3001/';
export const getClient = (data = {}) => {
  return Http.get(`${baseUrl}client`, data);
};
export const delClient = (data: any) => {
  return Http.delete(`${baseUrl}client/${data.id}`, data);
};
export const addClient = (data: any) => {
  return Http.post(`${baseUrl}client/`, data);
};
