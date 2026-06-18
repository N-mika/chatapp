import axios from "axios";
import { ChatMessage, User } from "./DataType";
import { API_BASE_URL } from "./api";

// const API = "https://stjude-backend.onrender.com/api";
// const API = "http://localhost:3000/api";

// CREATE
export const onAddService = async (
  nameAdd: string,
  params: ChatMessage
): Promise<"success" | "error"> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${nameAdd.toLowerCase()}`, params);
    return response.status >= 200 && response.status < 300 ? "success" : "error";
  } catch (error) {
    console.error(error);
    return "error";
  }
};

// UPDATE
export const onUpdateService = async (
  nameUpdate: string,
  params: ChatMessage
): Promise<"success" | "error"> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${nameUpdate.toLowerCase()}/${params.id}`, params);
    return response.status >= 200 && response.status < 300 ? "success" : "error";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

// GET (all)
export const onGetService = async <T>(endPoint: string): Promise<T[]> => {
  try {
    const response = await axios.get<T[]>(`${API_BASE_URL}/${endPoint}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la requête GET", error);
    return [];
  }
};
// GET (one by id)
export const onGetByIdService = async <T>(endPoint: string, id: string, id2? : string ): Promise<T[]> => {
  try {
    if(id2){
      const response = await axios.get<T[]>(`${API_BASE_URL}/${endPoint.toLowerCase()}/${id}/${id2}`);
      return response.data;
    }
    else{
      const response = await axios.get<T[]>(`${API_BASE_URL}/${endPoint.toLowerCase()}/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error("Erreur lors de la requête GET by ID", error);
    return [];
  }
};
// GET (one by id)
export const onGetByIdServiceReturnObjet = async <T>(endPoint: string, id: string, id2? : string ): Promise<T> => {
  try {
    if(id2){
      const response = await axios.get<T>(`${API_BASE_URL}/${endPoint.toLowerCase()}/${id}/${id2}`);
      return response.data;
    }
    else{
      const response = await axios.get<T>(`${API_BASE_URL}/${endPoint.toLowerCase()}/${id}`);
      return response.data;
    }
  } catch (error) {
    console.error("Erreur lors de la requête GET by ID", error);
    return {} as T;
  }
};
// DELETE
export const onDeleteService = async (nameDelete: string, id: string): Promise<"success" | "error"> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${nameDelete.toLowerCase()}/${id}`);
    return response.status >= 200 && response.status < 300 ? "success" : "error";
  } catch (error) {
    console.error(error);
    return "error";
  }
};

// LOGIN
export const loginService = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Erreur lors de la connexion", error);
    throw new Error(error.response?.data?.message || "Erreur de connexion");
  }
};

