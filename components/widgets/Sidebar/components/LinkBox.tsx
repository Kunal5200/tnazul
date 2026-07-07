import { SIDEBAR_LINKS } from "@/utils/constant";
import { COLORS } from "@/utils/enum";
import { LINK_BOX } from "@/utils/types";
import {
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";

const LinkBox = ({ data }: { data: LINK_BOX[] }) => {
  return (
    <Box>
      <List>
        {data.map((val, i) => (
          <ListItemButton key={i}>
            <ListItemAvatar sx={{ minWidth: 30 }}>
              <val.icon sx={{ fill: COLORS.SIDEBAR_ICON_COLOR }} />
            </ListItemAvatar>
            <ListItemText
              primary={val.label}
              slotProps={{
                primary: {
                  sx: {
                    color: COLORS.SIDEBAR_TEXT_COLOR,
                  },
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default LinkBox;
