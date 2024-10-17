"use client";
import CreateModal from "@/app/account/components/CreateModal";
import { UserContext } from "@/hooks/useContext";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import GestureIcon from "@mui/icons-material/Gesture";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  Divider,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import { grid } from "./SearchComponents";
import { useParams, usePathname } from "next/navigation";

export default function VerifiedTopNav() {
  const [user] = useContext(UserContext);
  const _pathName = usePathname()
  const { id } = useParams()
  const [createModal, setCreateModal] = useState(false);

  const stats = [
    {
      title: "posts",
      count: user.postCount,
      label: "/followers",
    },
    {
      title: "followers",
      count: user.followerCount,
      label: "/followers",
    },
    {
      title: "following",
      count: user.followingCount,
      label: "/following",
    },
  ];

  const pathName = _pathName === `/accounts/${id}` ? "/accounts" : _pathName;


  return (
    <>
      {/* Profile Header */}
      <Stack
        mb={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={0} width="50%">
          <Typography
            variant="h5"
            fontWeight={50}
            color="inherit"
            textAlign="left"
            sx={{
              display: "inline-block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.username}
          </Typography>
          <IconButton edge="end">
            <ExpandMoreOutlinedIcon />
          </IconButton>
        </Box>

        <Stack direction="row" spacing={1}>
          {/* add link LinkComponent */}
          <IconButton color="inherit" href="/">
            <GestureIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
          <IconButton color="inherit" onClick={() => setCreateModal(true)}>
            <AddBoxOutlinedIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
          <IconButton
            color="inherit"
            href="/account/settings"
            LinkComponent={Link}
          >
            <MenuIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Stack>
      </Stack>
      <Box display="flex" alignItems="center">
        <Stack direction="column" spacing={2} width="100%">
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
          >
            {" "}
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<AddSharpIcon />}
            >
              <Avatar
                src={user.avatarURL!}
                alt="Profile Picture"
                sx={{ width: 80, height: 80 }}
              />
            </Badge>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="flex-end"
              flexGrow={1}
            >
              {stats.map((item, idx) => (
                <Stack
                  direction="column"
                  key={idx}
                  alignContent="center"
                  alignItems="center"
                >
                  <Typography variant="h6" fontWeight={100}>
                    {item.count}
                  </Typography>
                  <Typography variant="body2" fontWeight={100}>
                    {item.title}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>

          {/* Button to add vibe */}

          <Typography variant="h6" fontWeight={200}>
            {user.fullName}
          </Typography>
          {/* <Link
            href={user.websiteURL!}
            target="_blank"
            style={{ color: "var(--success)" }}
          >
            {user.websiteURL}
          </Link> */}
          <Typography variant="body1" fontWeight={300}>
            {user.bio}
          </Typography>

          <Box>
            <IconButton>
              <AddCircleOutlineSharpIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          </Box>
          <Stack direction="row" spacing={0.5} justifyContent="space-between">
            <Button
              variant="outlined"
              href="/account/profile"
              LinkComponent={Link}
            >
              Profile{" "}
            </Button>
            <Button variant="outlined">Share </Button>
            <Button variant="outlined">Contact</Button>
            <Button variant="outlined">Dashboard</Button>
          </Stack>
          <Divider />
          <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          {grid.map((item, idx) => (
            <Card
              key={idx}
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <CardActionArea href={item.value} LinkComponent={Link}>
                <Stack
                  alignItems="center"
                  alignContent="center"
                  spacing={0}
                  p={1}
                >
                  <Icon color={pathName === item.value ? "primary" : "action"}>
                    {item.icon}
                  </Icon>
                </Stack>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        <Divider sx={{ mt: 2 }} />
        </Stack>
      </Box>
      <CreateModal isOpen={createModal} onClose={() => setCreateModal(false)} />
    </>
  );
}
