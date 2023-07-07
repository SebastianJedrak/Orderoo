import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Stack,
} from "@mui/material";
import { SetStateAction, useContext, useEffect, useState } from "react";
import FormAddEdit from "./FormAddEditProduct";
import { ProductsType } from "../../../types";
import { ProductsContext } from "../../../ctx/ProductsContext";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  product: ProductsType["productItems"] | null;
};

export default function DialogAddEdit(props: Props) {
  const product = props.product ? props.product[0] : null;

  const dataStorage: ProductsType = JSON.parse(localStorage.getItem("data")!);
  const data = useContext(ProductsContext);
  const setData = data?.setData;
  const [dataForm, setDataForm] = useState<ProductsType["productItems"] | null>(
    null
  );
  const [isError, setIsError] = useState(true);
  const [submitTouched, setSubmitTouched] = useState(false);

  useEffect(() => {
    if (props.isOpen) setSubmitTouched(false);
  }, [props]);

  const closeHandler = () => {
    props.onClose(false);
  };

  const getDataHandler = (data: ProductsType["productItems"] | null) => {
    if (data !== null) setDataForm(data);
  };

  const errorHandler = (error: boolean) => {
    setIsError(error);
  };

  const submitHandler = () => {
    if (isError) return setSubmitTouched(true);
    props.onClose(false);
    const filteredStorage = dataStorage.productItems.filter(
      (product) => product.productId !== dataForm![0].productId
    );
    const newProductItems = [...filteredStorage, ...dataForm!].sort(
      (a, b) => Number(a.productId) - Number(b.productId)
    );

    const newData = {
      productItems: newProductItems,
      packages: dataStorage.packages,
    };

    localStorage.setItem("data", JSON.stringify(newData));
    setData!(newData);
  };

  return (
    <Dialog open={props.isOpen} onClose={closeHandler}>
      <DialogTitle sx={{ px: 15 }} textAlign={"center"} color="primary">
        {product ? `Edit ${product.productName}` : "Add New Product"}
        <FormHelperText
          error
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            visibility: `${submitTouched && isError ? "visible" : "hidden"}`,
          }}
        >
          Input correct data
        </FormHelperText>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "common.black",
            mb: 2,
          }}
        ></DialogContentText>
        <FormAddEdit
          onGetData={getDataHandler}
          onError={errorHandler}
          product={props.product}
        />
      </DialogContent>
      <Stack direction={"row"} justifyContent={"center"}>
        <DialogActions>
          <Button
            sx={{ width: "100px" }}
            variant="contained"
            autoFocus
            onClick={closeHandler}
          >
            Cancel
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            sx={{ width: "100px" }}
            variant="outlined"
            type="submit"
            onClick={submitHandler}
          >
            {product ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
