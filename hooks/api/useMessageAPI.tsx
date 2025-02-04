import { authCookieKey } from "@/library/constants";
import { ENV } from "@/util/constants";
import { getCookie } from "cookies-next";
import {
  EditMessageInput,
  MessageUserInput,
} from "../entities/messages.entities";

const useMessageAPI = () => {
  const getChannels = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV("NEXT_PUBLIC_API_URL")}/channels`, {
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
      `${ENV("NEXT_PUBLIC_API_URL")}/channels/${channelId}`,
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
      `${ENV("NEXT_PUBLIC_API_URL")}/channels/create/${userId}`,
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

  const getChannelMessages = async (
    channelId: string,
    query: { offset: number; limit: number }
  ) => {
    const accessToken = getCookie(authCookieKey);
    const { offset, limit } = query;
    const res = await fetch(
      `${ENV(
        "NEXT_PUBLIC_API_URL"
      )}/channels/${channelId}/messages?offset=${offset}&limit=${limit}`,
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

  const getChannelMedia = async (channelId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/channels/${channelId}/media`,
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
    const res = await fetch(`${ENV("NEXT_PUBLIC_API_URL")}/messages`, {
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

  const sendMessageReactions = async (body: {
    messageId: string;
    reaction: string;
  }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/messages/reactions`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type":"application/json",
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

  const forwardMessage = async (
    _id: string,
    body: Partial<MessageUserInput>,
    receiverId: string
  ) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/messages/${_id}/${receiverId}/forward`,
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

  const editMessage = async (_id: string, body: Partial<EditMessageInput>) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/messages/${_id}/edit`,
      {
        method: "PATCH",
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

  const deleteMessage = async (_id: string, deleted: boolean) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/messages/${_id}/${deleted}/delete`,
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

  const deleteMessages = async (messageIds: string[]) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/channels/messages/delete/`,
      {
        method: "DELETE",
        body: JSON.stringify({ messageIds }),
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

  const deleteChannel = async (_id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV("NEXT_PUBLIC_API_URL")}/channels/${_id}/delete`,
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
    deleteMessages,
    forwardMessage,
    deleteChannel,
    getChannelMedia,
    sendMessageReactions,
  };
};
export default useMessageAPI;
