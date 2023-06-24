import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CheckBox } from '@mui/icons-material';
import { Checkbox, ListItemText } from '@mui/material';

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


export default function SelectMembersComboBox({membersList, handleChange, membersSelected}) {
  const theme = useTheme();


  React.useEffect(() => {
    console.log("members seleect", membersList)
  })

  return (
    <div>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Members</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={membersSelected}
        label="Selected members"
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        multiple
      >
        {membersList.map(member => (
        <MenuItem value={member.id}>
              <Checkbox checked={membersSelected.indexOf(member.id) > -1} />
              <ListItemText primary={member.fullName} />

        </MenuItem> ))}
      </Select>
    </FormControl>
    </div>
  );
}