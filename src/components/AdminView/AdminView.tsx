import { Fragment, useContext, useState } from "react";
import { ProductsContext } from "../../ctx/ProductsContext";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import DialogDelete from "./DialogDelete";
import { ProductsType } from "../../types";
import DialogAdd from "./DialogAddEdit";

export default function AdminView() {
  const data = useContext(ProductsContext);
  const productItems = data?.productInSelectedYear;
  const packageItems = data?.packageInSelectedYear;

  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<
    ProductsType["productItems"] | null
  >(null);
  const [dialogPackage, setDialogPackage] = useState<
    ProductsType["packages"] | null
  >(null);

  const productClickHandler = (e: React.SyntheticEvent) => {
    const btn = (e.target as HTMLElement).closest("button");
    if (!btn) return;
    if (btn.dataset.action === "delete") {
      setDeleteIsModalOpen(true);
      if (btn.dataset.type === "product")
        setDialogProduct([JSON.parse(btn.dataset.product!)]);
      if (btn.dataset.type === "package")
      setDialogPackage([JSON.parse(btn.dataset.product!)]);
    }
    if (btn.dataset.action === "edit") {
      setDialogProduct([JSON.parse(btn.dataset.product!)]);
      setAddIsModalOpen(true);
    }
  };

  const addProductHandler = () => {
    setDialogProduct(null)
    setAddIsModalOpen(true);
  };

  return (
    <Box>
      <Paper
        component="section"
        elevation={3}
        sx={{ mx: "auto", padding: 5, maxWidth: 700 }}
      >
        {/* Products */}
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          color="primary"
        >
          Products
        </Typography>
        <Stack spacing={1} my={4} onClick={productClickHandler}>
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
        </Stack>
        <Box textAlign={"center"}>
          <Button
            endIcon={<ControlPointIcon />}
            variant="contained"
            onClick={addProductHandler}
          >
            Add Product
          </Button>
        </Box>
      </Paper>

      {/* Packages */}

      {/* Dialogs */}
      <DialogDelete
        isOpen={isDeleteModalOpen}
        onClose={setDeleteIsModalOpen}
        product={dialogProduct}
        package={dialogPackage}
      />
      <DialogAdd
        isOpen={isAddModalOpen}
        onClose={setAddIsModalOpen}
        product={dialogProduct}
      />
    </Box>
  );
}
