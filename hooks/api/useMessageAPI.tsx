import { authCookieKey } from "@/library/constants";
import { getCookie } from "cookies-next";
import { EditMessageInput, MessageUserInput } from "../types";

const useMessageAPI = () => {
  const getChannels = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/channels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getChannelById = async (channelId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/channels/${channelId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const createChannel = async (userId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/channels/create/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  };

  const getChannelMessages = async (channelId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/channels/${channelId}/messages`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const sendMessage = async (body: Partial<MessageUserInput>) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const editMessage = async (_id: string, body: Partial<EditMessageInput>) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages/${_id}/edit`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const deleteMessage = async (_id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages/${_id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const deleteChannelMessages = async (_id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/channels/delete/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  };

  return {
    getChannels,
    getChannelById,
    getChannelMessages,
    sendMessage,
    deleteMessage,
    editMessage,
    createChannel,
    deleteChannelMessages
  };
};
export default useMessageAPI;