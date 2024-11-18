"use client";
import userReelAPI from "@/hooks/api/useReelAPI";
import { ReelsEntity } from "@/hooks/types";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import { Box, Card, CardMedia, Grid2, Stack, Typography } from "@mui/material";
import { cluster } from "radash";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReelsPage() {
  const [reels, setReels] = useState<ReelsEntity[]>([]);
  const videoGroups = cluster(reels, 3);
  const { getReels } = userReelAPI();

  const calculateRowCols = (idx: number, igx: number) => {
    return idx % 2 === 0 && (idx === 0 ? igx % 2 === 0 : true)
      ? 1
      : igx % 2 !== 0 && idx === 1
      ? 1
      : 2;
  };

  const loadUserReels = async () => {
    try {
      const reel = await getReels();
      setReels(reel);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load reel!");
    }
  };

  useEffect(() => {
    loadUserReels();
  }, []); //eslint-disable-line

  return (
    <>
      <Box mb={8}>
        {reels.length === 0 ? (
          <Stack
            my="10"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <CameraAltSharpIcon sx={{ width: 60, height: 60 }} />
            <Typography variant="h5" fontWeight="100">
              No videos
            </Typography>
            <Typography variant="h6" fontWeight="50">
              This user has no video.
            </Typography>
          </Stack>
        ) : (
          <Fragment>
            <Grid2 container spacing={0.5}>
              {reels.map((reel, idx) => (
                <Card key={idx} sx={{ width: "100%", padding: 0, mb: 0.5 }}>
                  <CardMedia
                    component="video"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                    src={reel.videoURL}
                    controls
                    autoPlay={true}
                    muted={false}
                    loop={false}
                  />
                </Card>
              ))}
            </Grid2>
          </Fragment>
        )}
      </Box>
    </>
  );
}
