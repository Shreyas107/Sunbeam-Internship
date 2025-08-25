import axios from "axios";
import { BASE_URL } from "../config";

export async function loginStaff({ email, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/staff/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
}
