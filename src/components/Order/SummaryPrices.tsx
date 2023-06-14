import { Typography } from "@mui/material";

type Props = {
  discountPriceVisible: boolean
  discountPrice: string
  totalPrice: string
}

export default function SummaryPrices(props: Props) {
  return (
    <>
      <Typography
        sx={{
          visibility: `${props.discountPriceVisible ? "visible" : "hidden"}`,
          opacity: `${props.discountPriceVisible ? "1" : "0"}`,
          transition: "opacity linear 0.15s",
        }}
        variant="h6"
      >
        {props.discountPrice} PLN
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: `${props.discountPriceVisible && "gray"}`,
          textDecoration: `${props.discountPriceVisible && "line-through"}`,
          fontSize: `${props.discountPriceVisible && "1.1rem"}`,
          paddingTop: `${props.discountPriceVisible && "0.25rem"}`,
          transition: "all linear 0.1s",
        }}
      >
        {props.totalPrice} PLN
      </Typography>
    </>
  );
}
