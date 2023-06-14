import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function DialogFormSubmit(props: {isOpen: boolean}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {setIsOpen(false)};
  useEffect(() => {
    props.isOpen && setIsOpen(true) 
  }, [props.isOpen])
  

  return (
    <Dialog open={isOpen} onClose={closeHandler}>
      <DialogTitle>Successfully Ordered!</DialogTitle>
      <DialogContent>
        <DialogContentText>Ordered items and price</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeHandler}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
