import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getImages = axios.create({
  baseURL: "https://pixabay.com/api/",
  timeout: 1000,

  params: {
    key: "23933594-99c5d6abfa76120a4e36d3057",
    per_page: 12,
    image_type: "photo",
    orientation: "horizontal",
  },
});

export async function searchImages(q = "", page = 1) {
  const params = { q, page };
  try {
    const { data } = await getImages("", { params });
    return data;
  } catch (error) {
    toast.error(`Sorry, please enter the name again `);
  }
}
