/**
 * 获取sessionStorage
 * @param {String} key
 */
export const setSession = (key: string) => {
  try {
    sessionStorage.getItem(key);
  } catch (e) {
    console.log(`getItem ${key} 失败`);
  }
};
/**
 * 获取sessionStorage
 * @param {String} key
 */
export const getSession = (key: string) => {
  let data;
  try {
    data = sessionStorage.getItem(key);
  } catch (e) {
    data = null;
  }
  return data;
};
/**
 * 删除sessionStorage
 * @param {String} key
 */
export const removeSession = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch (e) {
    console.log(`removeSession ${key} 失败`);
  }
};
