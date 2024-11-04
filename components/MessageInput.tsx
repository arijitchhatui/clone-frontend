"use client";

import { ChannelContext } from "@/hooks/channel-context";
import { MessageUserInput } from "@/hooks/types";
import useMessageAPI from "@/hooks/useMessageAPI";
import AddIcon from "@mui/icons-material/Add";
import LandscapeIcon from "@mui/icons-material/Landscape";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Paper, TextField } from "@mui/material";
import { useContext, useState } from "react";

interface UserMessageInputProps {
  onMessage: () => unknown;
}

export default function MessageInput({ onMessage }: UserMessageInputProps) {
  const { sendMessage } = useMessageAPI();
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [channel] = useContext(ChannelContext);

  const handleMessage = async () => {
    setLoading(true);
    try {
      (await sendMessage({
        message: messageInput,
        receiverId: channel.receiver.userId,
      })) as MessageUserInput;
      setMessageInput("");
      onMessage();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width="100%"
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Container maxWidth="xs" sx={{ padding: 0 }}>
        <Paper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`𝔐𝔢𝔰𝔰𝔞𝔤𝔢 ${channel.receiver.fullName}`}
            value={messageInput || ""}
            onChange={(e) => setMessageInput(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <Box mr={1.5}>
                    <AddIcon />
                  </Box>
                ),
                endAdornment: (
                  <>
                    {" "}
                    <LoadingButton
                      loading={loading}
                      loadingPosition="start"
                      startIcon={null}
                      disabled={!messageInput}
                      onClick={handleMessage}
                    >
                      <SendIcon />
                    </LoadingButton>
                    <Button>
                      <LandscapeIcon />
                    </Button>
                  </>
                ),
              },
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}
