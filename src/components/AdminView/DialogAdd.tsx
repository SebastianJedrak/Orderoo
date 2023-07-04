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
import { SetStateAction, useContext, useState } from "react";
import FormAddEdit from "./FormAddEdit";
import { ProductsType } from "../../types";
import { ProductsContext } from "../../ctx/ProductsContext";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
};

export default function DialogAdd(props: Props) {
  const dataStorage: ProductsType = JSON.parse(localStorage.getItem("data")!);
  const data = useContext(ProductsContext);
  const setData = data?.setData;
  const [dataForm, setDataForm] = useState<ProductsType["productItems"] | null>(
    null
  );
  const [isError, setIsError] = useState(true);
  const [submitTouched, setSubmitTouched] = useState(false);

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
    const newData = {
      productItems: [...dataStorage.productItems, ...dataForm!],
      packages: dataStorage.packages,
    };

    localStorage.setItem("data", JSON.stringify(newData));
    setData!(newData);
  };

  return (
    <Dialog open={props.isOpen} onClose={closeHandler}>
      <DialogTitle sx={{ px: 15, mb: 2 }} textAlign={"center"} color="primary">
        Add New Product
        {submitTouched && isError && (
          <FormHelperText error sx={{ fontSize: "1rem", textAlign: "center" }}>
            Input correct data
          </FormHelperText>
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "common.black",
            mb: 2,
          }}
        ></DialogContentText>
        <FormAddEdit onGetData={getDataHandler} onError={errorHandler} />
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
            Add
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
