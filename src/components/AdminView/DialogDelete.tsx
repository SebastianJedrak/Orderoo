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
  product: ProductsType["productItems"] | null ;
  package: ProductsType["packages"] | null ;
};

export default function DialogFormSubmit(props: Props) {
  const closeHandler = () => {
    props.onClose(false);
  };

  console.log(props.product!);


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
          Do you want to delete this {}? This action is irreversible.
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
