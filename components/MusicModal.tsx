"use client";

import { UserContext } from "@/hooks/context/user-context";
import styled from "@emotion/styled";
import {
  FastForwardRounded,
  FastRewindRounded,
  PauseRounded,
  PlayArrowRounded,
  VolumeDownRounded,
  VolumeUpRounded,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export function MusicModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  const duration = 200; // seconds
  const [position, setPosition] = useState(32);
  const [paused, setPaused] = useState(false);
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const [user] = useContext(UserContext)

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  const WallPaper = styled("div")({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
    background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
    transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
    "&::before": {
      content: '""',
      width: "140%",
      height: "140%",
      position: "absolute",
      top: "-40%",
      right: "-50%",
      background:
        "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
    },
    "&::after": {
      content: '""',
      width: "140%",
      height: "140%",
      position: "absolute",
      bottom: "-50%",
      left: "-30%",
      background:
        "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
      transform: "rotate(30deg)",
    },
  });

  const Widget = styled("div")(({}) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: "100%",
    margin: "auto",
    position: "relative",
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
    backdropFilter: "blur(40px)",
  }));

  const CoverImage = styled("div")({
    width: 100,
    height: 100,
    objectFit: "cover",
    overflow: "hidden",
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.08)",
    "& > img": {
      width: "100%",
    },
  });

  const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

  return (
    <>
      <Dialog open={open} onClose={handleClose} keepMounted fullWidth>
        <Box
          sx={{  overflow: "hidden" ,pr: 3}}
        >
          <Widget
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CoverImage>
                <Image
                  src={user.avatarURL}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  alt="can't win - Chilling Sunday"
                  width={400}
                  height={400}
                />
              </CoverImage>
              <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 500 }}
                >
                  Jun Pulse
                </Typography>
                <Typography noWrap>
                  <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
                </Typography>
                <Typography noWrap sx={{ letterSpacing: -0.25 }}>
                  Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
                </Typography>
              </Box>
            </Box>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={position}
              min={0}
              step={1}
              max={duration}
              onChange={(_, value) => setPosition(value as number)}
              sx={(t) => ({
                color: "rgba(0,0,0,0.87)",
                height: 4,
                "& .MuiSlider-thumb": {
                  width: 8,
                  height: 8,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&::before": {
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                    ...t.applyStyles("dark", {
                      boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                    }),
                  },
                  "&.Mui-active": {
                    width: 20,
                    height: 20,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
                ...t.applyStyles("dark", {
                  color: "#fff",
                }),
              })}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: -2,
              }}
            >
              <TinyText>{formatDuration(position)}</TinyText>
              <TinyText>-{formatDuration(duration - position)}</TinyText>
            </Box>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: -1,
                "& svg": {
                  color: "#000",
                  ...theme.applyStyles("dark", {
                    color: "#fff",
                  }),
                },
              })}
            >
              <IconButton aria-label="previous song">
                <FastRewindRounded fontSize="large" />
              </IconButton>
              <IconButton
                aria-label={paused ? "play" : "pause"}
                onClick={() => setPaused(!paused)}
              >
                {paused ? (
                  <PlayArrowRounded sx={{ fontSize: "3rem" }} />
                ) : (
                  <PauseRounded sx={{ fontSize: "3rem" }} />
                )}
              </IconButton>
              <IconButton aria-label="next song">
                <FastForwardRounded fontSize="large" />
              </IconButton>
            </Box>
            <Stack
              spacing={2}
              direction="row"
              sx={(theme) => ({
                mb: 1,
                px: 1,
                "& > svg": {
                  color: "rgba(0,0,0,0.4)",
                  ...theme.applyStyles("dark", {
                    color: "rgba(255,255,255,0.4)",
                  }),
                },
              })}
              alignItems="center"
            >
              <VolumeDownRounded />
              <Slider
                aria-label="Volume"
                defaultValue={30}
                sx={(t) => ({
                  color: "rgba(0,0,0,0.87)",
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 24,
                    height: 24,
                    backgroundColor: "#fff",
                    "&::before": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                      boxShadow: "none",
                    },
                  },
                  ...t.applyStyles("dark", {
                    color: "#fff",
                  }),
                })}
              />
              <VolumeUpRounded />
            </Stack>
          </Widget>
          <WallPaper />
        </Box>
      </Dialog>
    </>
  );
}
