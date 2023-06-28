import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { ProductsContext } from "../../../ctx/ProductsContext";

export const YEARS = [2023, 2024, 2025];

export default function SelectYear() {
  const data = useContext(ProductsContext);
  const setSelectedYear = data?.setSelectedYear;
  const selectedYear = data?.selectedYear;

  // Set initial date
  useEffect(() => {
    setSelectedYear!(String(YEARS[0]));
  }, [setSelectedYear]);

  const handleChangeYear = (e: SelectChangeEvent) => {
    // Set Year
    const selectedValue = String(e.target.value);
    setSelectedYear!(selectedValue);
  };

  return (
    <FormControl fullWidth sx={{ my: 5 }} variant="standard">
      <InputLabel
        size="small"
        id="select-year-label"
        sx={{ color: "primary.main" }}
      >
        Select year
      </InputLabel>
      <Select
        sx={{ width: "150px" }}
        size="small"
        labelId="select-year-label"
        label="Select year"
        id="select-year"
        value={selectedYear}
        onChange={handleChangeYear}
      >
        {YEARS.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
