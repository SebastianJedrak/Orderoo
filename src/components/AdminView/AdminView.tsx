import { useContext } from "react";
import { ProductsContext } from "../../ctx/ProductsContext";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminView() {
  const data = useContext(ProductsContext);
  const productItems = data?.productInSelectedYear;
  const packageItems = data?.packageInSelectedYear;

  return (
    <Box>
      <Paper
        component="section"
        elevation={3}
        sx={{ mx: "auto", padding: 5, maxWidth: 700 }}
      >
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          color="primary"
        >
          Products
        </Typography>
        <Stack spacing={1}>
          <Stack direction={"row"}>
            <Typography width={"32px"} sx={{ fontWeight: "fontWeightBold" }}>
              ID
            </Typography>
            <Typography sx={{ fontWeight: "fontWeightBold" }}>
              Product
            </Typography>
          </Stack>
          <Divider />
          {productItems!.map((item) => (
            <>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack key={item.productId} direction={"row"}>
                  <Typography width={"32px"}>{item.productId}</Typography>
                  <Typography>{item.productName}</Typography>
                </Stack>

                <Box>
                  <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="primary">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Stack>

              <Divider />
            </>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
