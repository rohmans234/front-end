import axios from "axios";

const instance = axios.create({
  baseURL: "https://slinkybuilding-us.backendless.app/api",
  headers: {
    "Content-Type": "application/json",
    "application-id": "A8920024-17E4-4669-80FC-7ECF98E75931",
    "secret-key": "2B85CA8F-8E8A-4961-9905-B895A3B541A1",
  },
});

export default instance;
