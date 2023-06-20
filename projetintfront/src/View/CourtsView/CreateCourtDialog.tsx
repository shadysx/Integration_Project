import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Court, User } from '../../Interfaces/Interface';
import { useState } from 'react';
import "./EditCourtDialog.css"
import { UserService } from '../../services/UserService';
import ComboBox from '../../components/ComboBox';
import { CategoriesService } from '../../services/CategoriesService';
import { Helper } from '../../Helpers/Helper';
import { CourtsService } from '../../services/CourtsService';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: Court) => void;
  fetchCourts: () => void;
}

export default function CreateCourtDialog(props: SimpleDialogProps) {
  const { onClose, open, fetchCourts } = props;
  const [court, setCourt] = useState<Court>({
    number: 0
  });

  const handleClose = () => {
    onClose(court);
  };

  React.useEffect(() => {
    console.log(court)
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourt((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    // Add your logic to handle the form submission here
    console.log('selected court ', court)
    const courtsService = new CourtsService();
    await courtsService.CreateCourt(court);
    await fetchCourts();
  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Create Court</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="lastName">Number:</label>
      <input type="number" id="number" name="number" value={court?.number} onChange={handleChange} required /><br /><br />
      
      <input type="submit" value="Create" />
    </form>
    </div>
  </Dialog>
  );
}