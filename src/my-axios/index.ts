import Axios from "./axios.ts";
import { AxiosInstance } from "./types.ts";

function createInstance(): AxiosInstance {
  const context = new Axios();
  let instance = Axios.prototype.request.bind(context);
  instance = Object.assign(instance, context);
  return instance as AxiosInstance;
}

const axios = createInstance();

export * from "./types.ts";
export default axios;
