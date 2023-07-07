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
import FormAddEditPackage from "./FormAddEditPackage";
import { ProductsType } from "../../../types";
import { ProductsContext } from "../../../ctx/ProductsContext";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  package: ProductsType["packages"] | null;
};

export default function DialogAddPackage(props: Props) {
  const packet = props.package ? props.package[0] : null;

  const dataStorage: ProductsType = JSON.parse(localStorage.getItem("data")!);
  const data = useContext(ProductsContext);
  const setData = data?.setData;
  const [dataForm, setDataForm] = useState<ProductsType["packages"] | null>(
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

  const getDataHandler = (data: ProductsType["packages"] | null) => {
    if (data !== null) setDataForm(data);
  };

  const errorHandler = (error: boolean) => {
    setIsError(error);
  };

  const submitHandler = () => {
    if (isError) return setSubmitTouched(true);
    props.onClose(false);
    const filteredStorage = dataStorage.packages.filter(
      (packet) => packet.packageId !== dataForm![0].packageId
    );
    const newPackageItems = [...filteredStorage, ...dataForm!].sort(
      (a, b) => Number(a.packageId) - Number(b.packageId)
    );

    const newData = {
      productItems: dataStorage.productItems,
      packages: newPackageItems,
    };

    localStorage.setItem("data", JSON.stringify(newData));
    setData!(newData);
  };

  return (
    <Dialog open={props.isOpen} onClose={closeHandler}>
      <DialogTitle sx={{ px: 15 }} textAlign={"center"} color="primary">
        {packet ? `Edit ${packet.packageName}` : "Add New Package"}
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
        <FormAddEditPackage
          onGetData={getDataHandler}
          onError={errorHandler}
          package={props.package}
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
            {packet ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
