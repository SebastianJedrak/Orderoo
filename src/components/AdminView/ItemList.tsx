import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductsType } from "../../types";

type Props = {
  products?: ProductsType["productItems"] | null;
};

export default function ItemList(props: Props) {
  const productItems = props.products;

  return (
    <>
      {productItems?.map((item) => (
        <Fragment key={item.productId}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"}>
              <Typography width={"32px"}>{item.productId}</Typography>
              <Typography>{item.productName}</Typography>
            </Stack>

            <Box>
              <IconButton
                aria-label="edit"
                color="primary"
                data-product={JSON.stringify(item)}
                data-action={"edit"}
                data-type="product"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="primary"
                data-product={JSON.stringify(item)}
                data-action={"delete"}
                data-type="product"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>

          <Divider />
        </Fragment>
      ))}
    </>
  );
}
