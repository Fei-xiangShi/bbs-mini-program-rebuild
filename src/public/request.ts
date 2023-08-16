import SiteConfig from "@/config/requestUrl";
import ResponseCheck from "@/utils/responseCheck";

const request = (
  url: string,
  method: "GET" | "POST",
  data: string | object | ArrayBuffer
) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: SiteConfig.baseUrl + url,
      method,
      data,
      header: {
        "Cookie": uni.getStorageSync("jwt"),
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

const get = (url: string, data: string | object | ArrayBuffer) => {
  let res = request(url, "GET", data);
  ResponseCheck.resIsSuccess(res);
  return res;
};

const post = (url: string, data: string | object | ArrayBuffer) => {
  let res = request(url, "POST", data);
  ResponseCheck.resIsSuccess(res);
  return res;
};

const http = {
  get, post
}

export { http };
