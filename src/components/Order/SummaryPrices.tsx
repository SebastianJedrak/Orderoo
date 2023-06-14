import { Typography } from "@mui/material";

export default function SummaryPrices() {
  return (
    <>
      <Typography
        sx={{
          visibility: `${discountPriceVisible ? "visible" : "hidden"}`,
          opacity: `${discountPriceVisible ? "1" : "0"}`,
          transition: "opacity linear 0.15s",
        }}
        variant="h6"
      >
        {" "}
        {discountPrice} PLN
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: `${discountPriceVisible && "gray"}`,
          textDecoration: `${discountPriceVisible && "line-through"}`,
          fontSize: `${discountPriceVisible && "1.1rem"}`,
          paddingTop: `${discountPriceVisible && "0.25rem"}`,
          transition: "all linear 0.1s",
        }}
      >
        {" "}
        {totalPrice} PLN
      </Typography>
    </>
  );
}
