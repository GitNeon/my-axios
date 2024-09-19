import { Interceptor, OnFulfilled, OnRejected } from "./types.ts";

class AxiosInterceptor<V> {
  public interceptors: Array<Interceptor<V> | null> = [];

  use(onFulfilled: OnFulfilled<V>, onRejected: OnRejected): number {
    this.interceptors?.push({
      onFulfilled,
      onRejected,
    });

    // 给拦截器标号，eject方法使用
    return this.interceptors.length - 1;
  }
  eject(id: number) {
    const interceptor = this.interceptors[id];
    if (interceptor) {
      this.interceptors[id] = null;
    }
  }
  clear() {}
}

export default AxiosInterceptor;
