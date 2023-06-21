import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from "@mui/material";
  import { SetStateAction } from "react";
  
  type Props = {
    isOpen: boolean;
    onClose: React.Dispatch<SetStateAction<boolean>>;
  };
  
  export default function DialogFormSubmit(props: Props) {
    const closeHandler = () => {
      props.onClose(false);
    };
  
    return (
      <Dialog open={props.isOpen} onClose={closeHandler}>
        <DialogTitle sx={{ px: 15, mb: 2 }} textAlign={"center"} color="primary">
        Do you want to delete this item?
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
            This action is irreversible.
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
  