"use client";
import UploadModal from "@/app/[username]/components/UploadModal";
import { CreatorContext } from "@/hooks/creator-context";
import { UserContext } from "@/hooks/user-context";
import theme from "@/util/theme";
import AddIcon from "@mui/icons-material/Add";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import NavigationIcon from "@mui/icons-material/Navigation";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Divider,
  Fab,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { grid } from "./SearchComponents";

export default function AccountPage() {
  const [user] = useContext(UserContext);
  const [creator] = useContext(CreatorContext);

  const pathname = usePathname();
  const { id } = useParams();
  const [createModal, setCreateModal] = useState(false);

  const stats = [
    {
      title: "entries",
      count: creator.postCount,
    },
    {
      title: "connections",
      count: creator.followerCount,
      value: "/account/connections",
    },
    {
      title: "connected",
      count: creator.followingCount,
      value: "/account/connected",
    },
  ];

  const pathName = pathname === `/accounts/${id}` ? "/accounts" : pathname;

  return (
    <>
      {/* Profile Header */}
      <Stack
        mb={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={0} width="50%" marginRight={0}>
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
            {creator.username}
            <IconButton edge="end">
              <ExpandMoreOutlinedIcon />
            </IconButton>
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          {/* add link LinkComponent */}
          <Fab color="primary" href="/" aria-label="share">
            <NavigationIcon sx={{ width: 30, height: 30 }} />
          </Fab>
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => setCreateModal(true)}
          >
            <AddIcon sx={{ width: 30, height: 30 }} />
          </Fab>
          <Fab color="inherit" href="/account/settings" LinkComponent={Link}>
            <ViewListIcon sx={{ width: 30, height: 30 }} />
          </Fab>
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
                src={creator.avatarURL!}
                alt="Profile Picture"
                sx={{ width: 80, height: 80 }}
              />
            </Badge>
            <Stack direction="column" spacing={1}>
              <Stack
                direction="row"
                spacing={4}
                justifyContent="flex-end"
                flexGrow={1}
              >
                {stats.map((item, idx) => (
                  <Stack
                    key={idx}
                    direction="column"
                    alignContent="center"
                    alignItems="center"
                  >
                    {item.value ? (
                      <Link href={item.value}>
                        <Typography variant="h6" fontWeight={100}>
                          {item.count}
                        </Typography>
                      </Link>
                    ) : (
                      <Typography variant="h6" fontWeight={100}>
                        {item.count}
                      </Typography>
                    )}

                    <Typography variant="body2" fontWeight={100}>
                      {item.title}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Card
                sx={{
                  backgroundImage: "url('/photos/f49y3HRM_400x400.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "right",
                  backgroundRepeat: "no-repeat",
                  height: 50,
                  width: "100%",
                }}
              >
                <CardContent sx={{ p: 0, width: "100%" }}>
                  <Stack direction="column">
                    <Typography
                      variant="subtitle2"
                      fontWeight={100}
                      color="text.secondary"
                      textAlign="center"
                    >
                      Live From Space
                    </Typography>
                    <Stack direction="row" justifyContent="left" sx={{ pr: 0 }}>
                      <IconButton aria-label="previous">
                        {theme.direction === "rtl" ? (
                          <SkipPreviousIcon />
                        ) : (
                          <SkipNextIcon />
                        )}
                      </IconButton>
                      <IconButton aria-label="play/pause">
                        <PlayArrowIcon />
                      </IconButton>
                      <IconButton aria-label="next">
                        {theme.direction === "rtl" ? (
                          <SkipNextIcon />
                        ) : (
                          <SkipPreviousIcon />
                        )}
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Stack>

          <Stack direction="column">
            <Typography variant="h6" fontWeight={200}>
              {creator.fullName}
            </Typography>

            <Link
              href={creator.websiteURL!}
              target="_blank"
              style={{
                color: "var(--success)",
                display: "inline-block",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {creator.websiteURL}
            </Link>

            <Typography variant="body2" fontWeight={300}>
              {creator.bio}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
            width="100%"
            spacing={2}
          >
            <Fab
              aria-label="edit"
              variant="extended"
              href="/account/profile"
              LinkComponent={Link}
              sx={{ width: "100%", borderRadius: "30px" }}
            >
              <EditIcon sx={{ width: 30, height: 30 }} />
              Profile{" "}
            </Fab>
            <Fab
              variant="extended"
              sx={{ width: "100%", borderRadius: "30px" }}
            >
              <DashboardIcon sx={{ width: 20, height: 30 }} />
              Dashboard
            </Fab>
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
              <Stack key={idx}>
                <IconButton href={item.value} LinkComponent={Link}>
                  <Fab
                    variant="extended"
                    color={pathName === item.value ? "primary" : "inherit"}
                  >
                    {item.icon}
                  </Fab>
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Divider />
        </Stack>
      </Box>
      <UploadModal isOpen={createModal} onClose={() => setCreateModal(false)} />
    </>
  );
}
