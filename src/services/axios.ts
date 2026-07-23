import axios from "axios";

//Cria instância do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject({ message: "Ocorreu um erro inesperado." });
    }

    const statusCode = error.response?.status;
    const responseData = error.response?.data;
    const apiMessage =
      typeof responseData?.message === "string" && responseData.message.trim()
        ? responseData.message
        : undefined;

    if (statusCode === 400) {
      return Promise.reject({
        statusCode,
        message:
          apiMessage ||
          "Não foi possível processar sua solicitação. Verifique os dados informados.",
      });
    }

    if (statusCode === 401) {
      return Promise.reject({
        statusCode,
        message: apiMessage || "E-mail ou senha incorretos. Tente novamente.",
      });
    }

    if (statusCode === 403) {
      return Promise.reject({
        statusCode,
        message: apiMessage || "Você não tem permissão para realizar esta ação.",
      });
    }

    if (statusCode === 422) {
      return Promise.reject({
        statusCode,
        message: apiMessage || "Alguns campos estão inválidos. Revise os dados e tente novamente.",
        fieldErrors: responseData?.errors ?? responseData?.fieldErrors,
      });
    }

    if (typeof statusCode === "number" && statusCode >= 500) {
      return Promise.reject({
        statusCode,
        message: "Ocorreu um erro. Tente novamente mais tarde.",
      });
    }

    return Promise.reject({
      statusCode,
      message: apiMessage || "Nao foi possível concluir a operação.",
    });
  },
);

export default api;
