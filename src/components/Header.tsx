import { Typography, Paper } from "@mui/material";
import { SetStateAction } from "react";

type Props = {
  view: string,
  changeView: React.Dispatch<SetStateAction<string>>
}

function Header(props: Props) {
  return (
    <Paper elevation={12} component="header">
      <Typography
        py={2}
        textAlign="center"
        bgcolor="primary.main"
        color="common.white"
        variant="h4"
      >
        Media Connect
      </Typography>
    </Paper>
  );
}

export default Header;
