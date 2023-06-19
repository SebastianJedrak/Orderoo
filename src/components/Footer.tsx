import { Box, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box py={2} component="footer" bgcolor="primary.main" textAlign="center" >
      <Typography
        color="common.white"
        variant="body1"
        maxWidth="1000px"
        mx="auto"
      >
        Website made by Sebastian Jędrak for portfolio purposes. Offers aren't real. If you have any
        problem you can contact me at jedrak.sebastian@gmail.com
      </Typography>
    </Box>
  );
}
