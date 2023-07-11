import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import { ProductsType } from "../../types";

type Props = {
  products?: ProductsType["productItems"] | null;
  packages?: ProductsType["packages"] | null;
  onAdd: (e: React.SyntheticEvent) => void;
};

export default function ItemList(props: Props) {
  const productItems = props.products;
  if (productItems)
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

              <Box minWidth={"80px"}>
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
        <Box textAlign={"center"}>
          <Button
            endIcon={<ControlPointIcon />}
            variant="contained"
            onClick={props.onAdd}
            data-type="product"
          >
            Add Product
          </Button>
        </Box>
      </>
    );

  const packages = props.packages;
  if (packages)
    return (
      <>
        {packages!.map((item) => (
          <Fragment key={item.packageId}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack direction={"row"}>
                <Typography width={"32px"}>{item.packageId}</Typography>
                <Typography>{item.packageName}</Typography>
              </Stack>

              <Box minWidth={"80px"}>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  data-product={JSON.stringify(item)}
                  data-action={"edit"}
                  data-type="package"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  data-product={JSON.stringify(item)}
                  data-action={"delete"}
                  data-type="package"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>

            <Divider />
          </Fragment>
        ))}
        <Box textAlign={"center"}>
          <Button
            endIcon={<ControlPointIcon />}
            variant="contained"
            onClick={props.onAdd}
            data-type="package"
          >
            Add Package
          </Button>
        </Box>
      </>
    );

  return <div></div>;
}
