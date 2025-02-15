"use client";

import { reactions } from "@/components/SearchComponents";
import useMessageAPI from "@/hooks/api/useMessageAPI";
import {
  GroupMessagesEntity,
  GroupReactionsEntity,
} from "@/hooks/entities/messages.entities";
import {
  Dialog,
  DialogContent,
  List,
  ListItemButton,
  ListItemIcon,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EmojiModal({
  setMessages,
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  message: GroupMessagesEntity;
  setMessages: React.Dispatch<React.SetStateAction<GroupMessagesEntity[]>>;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { sendGroupReaction } = useMessageAPI();

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleEmojiReaction = async (reaction: string) => {
    try {
      const reactedMessage = await sendGroupReaction({
        messageId: message._id,
        reaction: reaction,
      });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === message._id
            ? {
                ...msg,
                reactions: [
                  ...(msg.reactions || []),
                  reactedMessage as GroupReactionsEntity,
                ],
              }
            : msg
        )
      );
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO REACT!");
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: "100%",
          },
        }}
        sx={{ mb: 1.5 }}
      >
        <Paper sx={{ backgroundColor: "ButtonFace" }}>
          <DialogContent sx={{ padding: 0 }}>
            <List sx={{ display: "flex", padding: 0, margin: 0 }}>
              {reactions.map((emoji, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => handleEmojiReaction(emoji.icon)}
                >
                  <ListItemIcon>{emoji.icon}</ListItemIcon>
                </ListItemButton>
              ))}
            </List>
          </DialogContent>
        </Paper>
      </Dialog>
    </>
  );
}
