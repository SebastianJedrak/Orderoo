import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

  const closeHandler = () => {
    props.onClose(false);
  };

  const getDataHandler = (data: ProductsType["productItems"] | null) => {
   if (data !== null) setDataForm(data)
  };

  const submitHandler = () => {
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
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "common.black",
            mb: 2,
          }}
        ></DialogContentText>
        <FormAddEdit onGetData={getDataHandler} />
      </DialogContent>
      <Stack direction={"row"} justifyContent={"center"}>
        {" "}
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
