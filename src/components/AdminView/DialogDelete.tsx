import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { SetStateAction } from "react";
import { ProductsType } from "../../types";

type Props = {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  product: ProductsType["productItems"] | [];
  package: ProductsType["packages"] | [];
};

export default function DialogFormSubmit(props: Props) {
  const closeHandler = () => {
    props.onClose(false);
  };

  console.log(props.product[0]);

  return (
    <Dialog open={props.isOpen} onClose={closeHandler}>
      <DialogTitle sx={{ px: 15, mb: 2 }} textAlign={"center"} color="primary">
        DELETE
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "common.black",
            mb: 2,
            fontWeight: "fontWeightBold",
          }}
        >
          Do you want to delete this{" "}
          {/* {props.package.length > 0
            ? props.product[0].productName
            : props.package[0].packageName} */}
          ? This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeHandler}>
          No
        </Button>
      </DialogActions>
      <DialogActions>
        <Button autoFocus onClick={closeHandler}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
