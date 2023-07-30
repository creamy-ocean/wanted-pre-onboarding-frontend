import axios from "axios";

const config = {
  baseURL: "https://www.pre-onboarding-selection-task.shop/",
  headers: { "Content-Type": "application/json" },
};

export const axiosClient = axios.create(config);
