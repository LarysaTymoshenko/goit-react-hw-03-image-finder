import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getImages = axios.create({
  baseURL: "https://pixabay.com/api/",
  timeout: 1000,

  params: {
    key: "24038047-704cc7956da07111e29f822f6",
    per_page: 12,
    image_type: "photo",
    orientation: "horizontal",
  },
});

export async function searchImages(name, page = 1, per_page) {
  const params = { q: name, page, per_page };
  try {
    const { data } = await getImages("", { params });
    return data;
  } catch (error) {
    toast.error(`Sorry, please enter the name again `);
  }
}
