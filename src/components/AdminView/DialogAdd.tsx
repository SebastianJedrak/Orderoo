import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { SetStateAction } from "react";
import FormAddEdit from "./FormAddEdit";
import { ProductsType } from "../../types";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
};

export default function DialogAdd(props: Props) {
  const closeHandler = () => {
    props.onClose(false);
  };

const getDataHandler = (data: (ProductsType["productItems"] | null)) => {
const dataForm = data
console.log(dataForm);
} 

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
        <FormAddEdit onGetData={getDataHandler}/>
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
            onClick={closeHandler}
          >
            Add
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
