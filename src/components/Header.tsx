import { Typography, Paper } from "@mui/material";

function Header() {
  return (
    <Paper elevation={4} component="header">
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
