import axios from "axios";
const Api = axios.create({
  baseURL: "https://api.gruposplog.com.br/artesanal",
  // baseURL: "http://localhost:3000/artesanal",
});
export { Api };
