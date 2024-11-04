"use client";

import Transition from "@/components/Transition";
import { PostsEntity } from "@/hooks/types";
import usePostAPI from "@/hooks/usePostAPI";
import { UserContext } from "@/hooks/user-context";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function DeletePostModal({
  isOpen,
  onClose,
  post,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
  post: PostsEntity;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { deletePost } = usePostAPI();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [caption] = useState(post.caption);

  const [user] = useContext(UserContext);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(post._id);
      handleClose();
      router.push(`/${user.username}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        sx={{
          alignContent: "center",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Stack mt={2}>
          <Stack direction="row" alignContent="center" alignItems="center">
            <IconButton onClick={handleClose}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography
              alignContent="center"
              alignItems="center"
              variant="subtitle2"
              color="var(--error)"
              fontWeight={200}
            >
              {" "}
              Are you sure you want to delete this journal?
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Card sx={{ padding: 0, margin: 0 }}>
          {post.imageURL && (
            <CardMedia
              sx={{
                objectFit: "contain",
              }}
              component="img"
              image={post.imageURL}
              title="post title"
            />
          )}
          <CardContent>
            <TextField
              fullWidth
              value={caption}
              variant="standard"
              label="Caption"
              disabled
            />
          </CardContent>
        </Card>
        <DialogActions>
          <LoadingButton
            loading={loading}
            sx={{ width: "100%" }}
            onClick={handleDelete}
            variant="contained"
            style={{ color: "var(--error)" }}
          >
            <DeleteIcon />
            Yes
          </LoadingButton>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
          >
            <TagFacesIcon />
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
