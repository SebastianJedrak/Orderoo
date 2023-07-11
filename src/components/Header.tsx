import { Typography, Button, Box, Stack } from "@mui/material";
import { SetStateAction } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import Logo from "../img/logo.png"

type Props = {
  view: string;
  changeView: React.Dispatch<SetStateAction<string>>;
};

function Header(props: Props) {
  const changeViewHandler = () => {
    if (props.view === "user") props.changeView("admin");
    if (props.view === "admin") props.changeView("user");
  };

  return (
    <Stack
      component="header"
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgcolor="primary.main"
      px={3}
    >
      <Box sx={{ width: "100px" }} />
      <Stack direction={"row"} py={1} alignItems={"center"} >
        <img src={Logo} alt="logo" height={"64px"}/>
        <Typography color="common.white" variant="h4">
          Media Connect
        </Typography>
      </Stack>

      <Button
        onClick={changeViewHandler}
        sx={{ width: "100px" }}
        size="small"
        variant="contained"
        color="secondary"
      >
        <CachedIcon sx={{ mr: 0.5 }} />{" "}
        {props.view === "admin" ? "user" : "admin"}
      </Button>
    </Stack>
  );
}

export default Header;
