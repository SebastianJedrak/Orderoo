import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { SetStateAction } from "react";
import { OrderType } from "../../types";

type Props = {
  isOpen: boolean;
  order: OrderType | null;
  onClose: React.Dispatch<SetStateAction<boolean>>;
};

export default function DialogFormSubmit(props: Props) {
  const closeHandler = () => {
    props.onClose(false);
  };

  return (
    <Dialog open={props.isOpen} onClose={closeHandler}>
      <DialogTitle color="secondary">Successfully Ordered!</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "common.black",
            marginBottom: "8px",
          }}
        >
          Ordered Products
        </DialogContentText>
        {props.order?.orderedItems.map((item) => (
          <DialogContentText key={item.productId}>
            {item.productName}
          </DialogContentText>
        ))}
        <DialogContentText sx={{ color: "common.black", marginTop: "16px" }}>
          Payment {props.order?.price} PLN
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeHandler}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
