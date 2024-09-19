import AxiosInterceptor from "./interceptors.ts";

export type Method =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "get"
  | "post"
  | "put"
  | "delete";

export interface AxiosRequestConfig {
  url: string;
  method: Method;
  params?: any;
  data?: any;
  headers?: any;
  timeout?: number;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

export interface InternalAxiosRequestConfig {
  headers: Record<string, any>;
}

export type OnFulfilled<V> = (value: V) => V | Promise<V>;

export type OnRejected = (error: any) => any;

export interface Interceptor<V> {
  onFulfilled?: OnFulfilled<V>;
  onRejected?: OnRejected;
}

export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  interceptors: {
    request: AxiosInterceptor<InternalAxiosRequestConfig>;
    response: AxiosInterceptor<AxiosResponse>;
  };
}
