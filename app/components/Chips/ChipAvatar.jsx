import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ChipAvatar = ({name, image}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        color="success"
        avatar={<Avatar alt={name} src={image} />}
        label={name}
        // variant="outlined"
        
      />
    </Stack>
  );
};

export default ChipAvatar;