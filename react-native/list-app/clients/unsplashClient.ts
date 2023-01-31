import { TUnsplashPhoto } from "../types";
type ResponseKind = "success" | "failure";

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

const BASE_URL = 'https://api.unsplash.com';

export const fetchPhothosByPage = async (
  page: number,
  color: string,
  orientation: string 
): Promise<NetworkResponse<TUnsplashPhoto[]>> => {
  const response = await fetch(
    `${BASE_URL}/search/photos?page=${page}=1&query=${color}&client_id=fn-pVLasIokTQN9i-QrPuH9FeftGgSdo76B4ybimcdQ`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const json = await response.json();
    return {
      kind: "success",
      body: json.results,
    };
  } else {
    return {
      kind: "failure",
    };
  }
};
