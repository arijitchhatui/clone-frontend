"use client";

import { CommentPostInput } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import { UserContext } from "@/hooks/useContext";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";

interface CommentInputProps {
  postId: string;
  onComment: () => unknown;
}

export function CommentInput({ postId, onComment }: CommentInputProps) {
  const [user] = useContext(UserContext);
  const { commentPost } = useAPI();
  const [formData, setFormData] = useState<Partial<CommentPostInput>>({
    comment: "",
  });

  const handleComment = async () => {
    try {
      if (formData.comment) {
        await commentPost(formData, postId);
        setFormData({ comment: "" });
        onComment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width="100%"
      sx={{
        position: "fixed",
        bottom: 65,
        left: 0,
        right: 0,
        zIndex: 4,
      }}
    >
      <Container maxWidth="xs" sx={{ px: 0 }}>
        <Paper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Share your thoughts..."
            autoFocus
            value={formData.comment || ""}
            onChange={(e) => setFormData({ comment: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <Box mr={1.5}>
                    <Avatar src={user.avatarURL} alt={user.fullName} />
                  </Box>
                ),
                endAdornment: (
                  <Button onClick={handleComment} variant="text">
                    Post
                  </Button>
                ),
              },
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}