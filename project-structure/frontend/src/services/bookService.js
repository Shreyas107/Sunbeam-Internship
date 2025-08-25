import axios from "axios";
import { BASE_URL } from "../config";

export async function fetchAllBooks() {
  console.log("BASE_URL: ", BASE_URL);
  try {
    const response = await axios.get(`${BASE_URL}/test/all-books`);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
}
