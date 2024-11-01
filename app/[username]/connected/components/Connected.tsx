"use client";

import { CreatorContext } from "@/hooks/creator-context";
import { UserProfilesEntity } from "@/hooks/types";
import useAPI from "@/hooks/useAPI";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  Fab,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ConnectedModal from "../../components/ConnectedModal";

export default function ConnectedPage() {
  const { getFollowing } = useAPI();
  const [creator] = useContext(CreatorContext);
  const [following, setFollowing] = useState<UserProfilesEntity[]>([]);
  const [connectedModal, setConnectedModal] = useState(false);
  const [, setIsCardOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfilesEntity | null>(
    null
  );

  const loadConnected = async (userId: string) => {
    try {
      const fetchFollowing = await getFollowing(userId);
      setFollowing(fetchFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    setIsCardOpen(true);
  };

  useEffect(() => {
    loadConnected(creator.userId);
  }, [creator.userId]); //eslint-disable-line

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <IconButton href={`/${creator.username}`} LinkComponent={Link}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <TextField
          label="Search your connected"
          sx={{ width: "75%" }}
          slotProps={{
            inputLabel: {
              sx: {
                typography: "text.secondary",
                fontWeight: "200",
              },
            },
            input: {
              sx: { borderRadius: "10px" },
            },
          }}
          onClick={handleSearch}
        />
        <Fab
          sx={{ width: 40, height: 40 }}
          color="secondary"
          aria-label="edit"
          variant="circular"
        >
          <FilterAltOutlinedIcon />
        </Fab>
      </Stack>
      <Divider />
      <Stack mb={8}>
        {following.map((followingUser, idx) => (
          <Card key={idx} sx={{ mb: 0.5, width: "100%", p: 0 }}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  src={followingUser.avatarURL}
                  alt={followingUser.fullName}
                />
              }
              title={
                <Typography fontWeight={200}>
                  {followingUser.fullName}
                </Typography>
              }
              subheader={
                <Typography
                  fontSize=".75rem"
                  fontWeight={200}
                  variant="subtitle2"
                >
                  {followingUser.username}
                </Typography>
              }
              action={
                <>
                  <Fab
                    aria-label="add"
                    variant="extended"
                    sx={{
                      width: "100%",
                      borderRadius: "30px",
                    }}
                    color="inherit"
                    onClick={() => {
                      setSelectedUser(followingUser);
                      setConnectedModal(true);
                    }}
                  >
                    <Typography color="primary">Connected </Typography>
                  </Fab>
                </>
              }
            />
          </Card>
        ))}
      </Stack>

      {selectedUser && (
        <ConnectedModal
          isOpen={connectedModal}
          onClose={() => setConnectedModal(false)}
          user={selectedUser}
        />
      )}
    </>
  );
}
