import React from "react";
import { Box, Typography, Paper, Skeleton, Divider, Stack } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { QueueItemData } from "@/utils/types";
import QueueItem from "./QueueItem";

interface ApprovalQueueListProps {
  loading: boolean;
  contractData: any;
  onRefresh?: () => void;
}

const ApprovalQueueList = ({ loading, contractData, onRefresh }: ApprovalQueueListProps) => {
  if (loading) {
    return (
      <Box>
        {[1, 2, 3].map((item) => (
          <Paper
            key={item}
            elevation={0}
            sx={{
              borderRadius: "24px",
              backgroundColor: COLORS.WHITE,
              border: "1px solid #0135470F",
              overflow: "hidden",
              mb: 3,
            }}
          >
            <Box sx={{ p: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2.5}
                sx={{
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2.5}
                  sx={{
                    alignItems: "flex-start",
                    flexGrow: 1,
                    width: "100%",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    width={160}
                    height={100}
                    sx={{
                      borderRadius: "12px",
                      display: { xs: "none", sm: "block" },
                    }}
                  />
                  <Box sx={{ width: "100%" }}>
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={32}
                      sx={{ mb: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={24}
                      sx={{ mb: 0.5 }}
                    />
                    <Skeleton variant="text" width="60%" height={24} />
                  </Box>
                </Stack>
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={40}
                  sx={{
                    borderRadius: "100px",
                    display: { xs: "none", sm: "block" },
                  }}
                />
              </Stack>
            </Box>
            <Divider sx={{ borderColor: "#0135470F" }} />
            <Box sx={{ p: 2.5, px: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  <Skeleton
                    variant="rounded"
                    width={110}
                    height={40}
                    sx={{ borderRadius: "100px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={100}
                    height={40}
                    sx={{ borderRadius: "100px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={160}
                    height={40}
                    sx={{ borderRadius: "100px" }}
                  />
                </Stack>
                <Skeleton
                  variant="text"
                  width={120}
                  height={20}
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </Stack>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  if (contractData?.docs?.length > 0) {
    return (
      <Box>
        {contractData.docs.map((item: QueueItemData) => (
          <QueueItem
            key={item._id}
            item={item}
            onActionComplete={onRefresh}
          />
        ))}
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        borderRadius: "24px",
        textAlign: "center",
        border: "1px solid #0135470F",
        backgroundColor: COLORS.WHITE,
      }}
    >
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "18px",
          color: COLORS.SECONDARY,
          mb: 1,
        }}
      >
        All Caught Up!
      </Typography>
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 500,
          fontSize: "14px",
          color: "#7A9BAB",
        }}
      >
        There are no listings awaiting approval in the queue.
      </Typography>
    </Paper>
  );
};

export default ApprovalQueueList;
