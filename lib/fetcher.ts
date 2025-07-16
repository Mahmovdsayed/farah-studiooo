"use server";

import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";
import { api } from "./api";

const userToken = async (): Promise<string | null> => {
  return (await cookies()).get("userToken")?.value || null;
};

const fetchUserData = async (token: string, url: string) => {
  try {
    const { data } = await api.get(url, {
      headers: { Cookie: `userToken=${token}` },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserDataDashboard = async (url: string, tag: string) => {
  const token = await userToken();
  if (!token) return null;

  return unstable_cache(() => fetchUserData(token, url), [tag, token], {
    tags: [tag],
    revalidate: 60,
  })();
};

export { getUserDataDashboard };
