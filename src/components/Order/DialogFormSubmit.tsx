import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
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
      <DialogTitle sx={{ px: 15, mb: 2 }} textAlign={"center"} color="primary">
        Successfully Ordered!
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            color: "common.black",
            mb: 2,
            fontWeight:"fontWeightBold"
          }}
        >
          Ordered Products
        </DialogContentText>
        {props.order?.orderedItems.map((item) => (
          <DialogContentText key={item.productId}>
            - {item.productName}
          </DialogContentText>
        ))}
        <DialogContentText
          textAlign={"end"}
          sx={{ color: "common.black", mt: 3 }}
        >
          Payment:{" "}
          <Box
            component="span"
            fontWeight="fontWeightBold"
            color="secondary.main"
          >
            {props.order?.price}{" "}
          </Box>
          PLN
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
