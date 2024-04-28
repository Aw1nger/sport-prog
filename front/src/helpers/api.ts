import axios from "axios";

export async function uploadItem(url: string, formData: Object) {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    return response;
  } catch (error: any) {
    console.error("Поймал ошибку:", error);
    return error.response;
  }
}

export async function getItem(url: string, params?: {}) {
  const response = await axios.get(url, { params });
  return response;
}

export async function deleteItem(url: string, formData: Object) {
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      data: formData,
    });
    return response;
  } catch (error) {
    console.error("Поймал ошибку:", error);
    throw error;
  }
}

export async function updateItem(url: string, formData: Object) {
  try {
    const response = await axios.patch(url, formData);
    return response;
  } catch (error: any) {
    console.error("Поймал ошибку:", error);
    return error.response;
  }
}

export async function uploadBlob(url: string, formData: FormData) {
  try {
    const response = await axios.post(url, formData);
    return response;
  } catch (error: any) {
    console.error("Поймал ошибку:", error);
    return error.response;
  }
}

export async function updateBlob(url: string, formData: FormData) {
  try {
    const response = await axios.patch(url, formData);
    return response;
  } catch (error: any) {
    console.error("Поймал ошибку:", error);
    return error.response;
  }
}

