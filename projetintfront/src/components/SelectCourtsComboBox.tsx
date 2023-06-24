import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function SelectCourtsComboBox({courtsList, handleChange}) {
  const theme = useTheme();
  const [courtId, setCourtId] = React.useState<string>();


  React.useEffect(() => {
    console.log("courtselect", courtsList)
  })

  return (
    <div>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Court</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={courtId}
        label="Select court"
        onChange={handleChange}
      >
        {courtsList.map(court => <MenuItem value={court.id}>{court.number}</MenuItem> )}
      </Select>
    </FormControl>
    </div>
  );
}