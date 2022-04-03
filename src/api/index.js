import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// API.interceptors.request.use((req) => {
// 	if (localStorage.getItem("token")) {
// 		req.headers.Authorization = `${JSON.parse(
// 			localStorage.getItem("token")
// 		)}`;
// 	}

// 	return req;
// });

// export const fetchAllContent = () => API.get(`/content`);
// export const createContent = (newContent) => API.post("/content/add", newContent);

// export const updateFinished = (id, updatedContent) =>
// 	API.patch(`/content/update/${id}`, updatedContent);
