"use client";

import { StyledBadge } from "@/components/SearchComponents";
import useAPI from "@/hooks/api/useAPI";
import { CreatorContext } from "@/hooks/context/creator-context";
import { FollowersEntity } from "@/hooks/entities/users.entities";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  Fab,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ConnectionPage() {
  const { getFollowers, followProfile } = useAPI();
  const [creator] = useContext(CreatorContext);
  const [followers, setFollowers] = useState<FollowersEntity[]>([]);
  const [, setSelectedUser] = useState<FollowersEntity | null>(null);
  const [, setIsCardOpen] = useState(false);
  const router = useRouter();

  const loadConnections = async (userId: string) => {
    try {
      const fetchFollowers = await getFollowers(userId);
      setFollowers(fetchFollowers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      await followProfile(userId);
      setSelectedUser(null);
      loadConnections(creator.userId);
      toast.success(`Connected `);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to connect!!`);
    }
  };

  const handleSearch = () => {
    setIsCardOpen(true);
  };

  useEffect(() => {
    loadConnections(creator.userId);
  }, [creator.userId]); //eslint-disable-line

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <IconButton onClick={() => router.back()}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <TextField
          label="Search your Connections"
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
      <Stack>
        {followers.length === 0 ? (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/svg/naruto1.svg"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />
            <Image
              src="/svg/sasuke1.svg"
              style={{
                objectFit: "cover",
                width: "50%",
                height: "50%",
              }}
              alt="image"
              width={300}
              height={100}
              priority
            />
            <Typography variant="h6">Your friends will appear here</Typography>
          </Stack>
        ) : (
          followers.map((followedUser, idx) => (
            <Card key={idx} sx={{ mb: 0.5, width: "100%", p: 0 }}>
              <CardHeader
                avatar={
                  <StyledBadge
                    isOnline={followedUser.user.isOnline}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent
                    variant="dot"
                  >
                    <Avatar
                      aria-label="recipe"
                      src={followedUser.user.avatarURL}
                      alt={followedUser.user.fullName}
                    />
                  </StyledBadge>
                }
                title={
                  <Button
                    onClick={() =>
                      router.push(`/${followedUser.user.username}`)
                    }
                  >
                    <Typography fontWeight={200}>
                      {followedUser.user.fullName}
                    </Typography>
                  </Button>
                }
                subheader={
                  <Typography
                    fontWeight={200}
                    fontSize=".75rem"
                    variant="subtitle2"
                  >
                    {followedUser.user.username}
                  </Typography>
                }
                action={
                  followedUser.user.isFollowedByMe ? (
                    <PeopleIcon />
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectedUser(followedUser);
                        handleFollow(followedUser.user.userId);
                      }}
                    >
                      <PersonAddIcon />
                      Follow
                    </Button>
                  )
                }
              />
            </Card>
          ))
        )}
      </Stack>
    </>
  );
}
