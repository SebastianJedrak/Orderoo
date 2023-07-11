import { useState } from "react";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

import DialogDelete from "./DialogDelete";
import { ProductsType } from "../../types";
import DialogAddEditProduct from "./products/DialogAddEditProduct";
import DialogAddEditPackage from "./packages/DialogAddEditPackage";
import ItemList from "./ItemList";

type Props = {
  products?: ProductsType["productItems"] | null;
  packages?: ProductsType["packages"] | null;
};

export default function AdminView(props: Props) {
  const productItems = props.products;
  const packages = props.packages;

  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
  const [isProductAddModalOpen, setIsProductAddModalOpen] = useState(false);
  const [isPackageAddModalOpen, setIsPackageAddModalOpen] = useState(false);
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
      if (btn.dataset.type === "product") {
        setDialogProduct([JSON.parse(btn.dataset.product!)]);
        setIsProductAddModalOpen(true);
      }
      if (btn.dataset.type === "package") {
        setDialogPackage([JSON.parse(btn.dataset.product!)]);
        setIsPackageAddModalOpen(true);
      }
    }
  };

  const addHandler = (e: React.SyntheticEvent) => {
    const btn = (e.target as HTMLElement).closest("button");
    if (!btn) return;
    if (btn.dataset.type === "product") {
      setDialogProduct(null);
      setIsProductAddModalOpen(true);
    }
    if (btn.dataset.type === "package") {
      setDialogPackage(null);
      setIsPackageAddModalOpen(true);
    }
  };

  return (
    <Box>
      <Paper
        component="section"
        elevation={3}
        sx={{ mx: "auto", px: "5vw", py:5, maxWidth: 700, mb: 5 }}
      >
        {/* Products */}
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          color="primary"
        >
          {productItems ? "Products" : "Packages"}
        </Typography>
        <Stack spacing={1} my={4} onClick={productClickHandler}>
          <Stack direction={"row"}>
            <Typography width={"32px"} sx={{ fontWeight: "fontWeightBold" }}>
              ID
            </Typography>
            <Typography sx={{ fontWeight: "fontWeightBold" }}>
              {productItems ? "Product" : "Package"}
            </Typography>
          </Stack>
          <Divider />
          <ItemList products={productItems} onAdd={addHandler} />
          <ItemList packages={packages} onAdd={addHandler} />
        </Stack>
      </Paper>

      {/* Dialogs */}
      <DialogDelete
        isOpen={isDeleteModalOpen}
        onClose={setDeleteIsModalOpen}
        product={dialogProduct}
        package={dialogPackage}
      />
      <DialogAddEditProduct
        isOpen={isProductAddModalOpen}
        onClose={setIsProductAddModalOpen}
        product={dialogProduct}
      />
      <DialogAddEditPackage
        isOpen={isPackageAddModalOpen}
        onClose={setIsPackageAddModalOpen}
        package={dialogPackage}
      />
    </Box>
  );
}
