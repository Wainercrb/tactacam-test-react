import { TUnsplashPhoto } from "../types";
type ResponseKind = "success" | "failure";

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

export const fetchPhothosByPage = async (
  page: number,
  count: number
): Promise<NetworkResponse<TUnsplashPhoto[]>> => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}=1&query=office&client_id=fn-pVLasIokTQN9i-QrPuH9FeftGgSdo76B4ybimcdQ`,
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
