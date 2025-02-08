"use client";

import React, { createContext, useState } from "react";
import { GroupsEntity } from "../entities/messages.entities";

const emptyGroup = {
  _id: "",
  channelAvatar: "",
  channelName: "",
  description: "",
  createdAt: new Date(),
  senderId: "",
  participants: [],
} satisfies GroupsEntity;

export const GroupContext = createContext<
  [GroupsEntity, React.Dispatch<React.SetStateAction<GroupsEntity>>]
>([emptyGroup, () => null]);

export function GroupContextWrapper({
  group,
  children,
}: {
  group: GroupsEntity | null;
  children: React.ReactNode;
}) {
  const [groupInfo, setGroupInfo] = useState<GroupsEntity>(group || emptyGroup);

  return (
    <GroupContext.Provider value={[groupInfo, setGroupInfo]}>
      {children}
    </GroupContext.Provider>
  );
}
