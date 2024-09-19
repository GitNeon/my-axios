import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "./types.ts";
import { stringify } from "./util.ts";
import parseHeaders from "parse-headers";
import AxiosInterceptor from "./interceptors.ts";

class Axios {
  public interceptors = {
    request: new AxiosInterceptor<InternalAxiosRequestConfig>(),
    response: new AxiosInterceptor<AxiosResponse>(),
  };

  /**
   * axios核心请求方法
   * 该方法包含以下逻辑：
   * 1、对传入的配置项进行合并
   * 2、拦截器处理
   * 3、发送网络请求
   * @param config
   */
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest(config);
  }

  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let { url, method, params, data, headers, timeout } = config;
      const request = new XMLHttpRequest();

      // get参数处理
      if (params && method.toUpperCase() === "GET") {
        params = stringify(params);
        const lastStr = url[url.length - 1];
        url = lastStr === "?" ? `${url}&${params}` : `${url}?${params}`;
      }

      request.open(method, url, true);
      // 必须在open之后才能添加headers
      if (headers) {
        for (const key in headers) {
          const value = headers[key];
          request.setRequestHeader(key, value);
        }
      }

      request.onreadystatechange = () => {
        // 请求发送成功处理
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 300) {
            const response: AxiosResponse<T> = {
              data: request.response || request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config: config,
              request,
            };
            resolve(response);
          }
        }
      };
      if (timeout) {
        request.timeout = timeout;
        request.ontimeout = () => {
          reject("请求超时");
        };
      }
      request.onerror = () => {
        reject("请求错误");
      };
      // post use
      if (data) {
        data = JSON.stringify(data);
      }
      request.send(data);
    });
  }
}

export default Axios;
