<script setup lang="ts">
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "../my-axios";

const baseURL = "http://localhost:8080";

interface Person {
  name: string;
  age: number;
  address: string;
}

const student_1: Person = {
  name: "Student 1",
  age: 18,
  address: "XXX",
};

const getAxisoConfig: AxiosRequestConfig = {
  url: baseURL + "/get",
  method: "get",
  params: student_1,
};

const postAxiosConfig: AxiosRequestConfig = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "post",
  data: {
    title: "foo",
    body: "bar",
    userId: 1,
  },
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
};

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("request config = ", config);
    return config;
  },
  (error: any) => {
    console.log("request error", error);
  },
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("response = ", response);
    return response;
  },
  (error: any) => {
    console.log("response error", error);
  },
);

axios<Person>(postAxiosConfig).then((res: AxiosResponse<Person>) =>
  console.log(res),
);
</script>

<template>
  <div>My Axios 测试</div>
</template>

<style scoped></style>
