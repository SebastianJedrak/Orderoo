import { Typography, Paper, Button, Box, Stack } from "@mui/material";
import { SetStateAction } from "react";

type Props = {
  view: string;
  changeView: React.Dispatch<SetStateAction<string>>;
};

function Header(props: Props) {
  return (
    <Stack
      component="header"
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgcolor="primary.main"
      px={3}
    >
      <Box sx={{width: "11%"}}/>
      <Typography py={2} textAlign="center" color="common.white" variant="h4">
        Media Connect
      </Typography>
      <Button sx={{width: "11%"}} size="small" variant="contained" color="secondary">Change to Client</Button>
    </Stack>
  );
}

export default Header;
