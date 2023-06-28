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
import { AuthContext } from '../../contexts/AuthContext';
import { ReservationService } from '../../services/ReservationService';
import { BlockedsService } from '../../services/BlockedsService';

export interface SimpleDialogProps {
  open: boolean;
  selectedCourt: Court;
  setSelectedCourt: (court: any) => void;
  onClose: (value: Court) => void;
  fetchCourts: () => void;
}

export default function EditCourtDialog(props: SimpleDialogProps) {
  const { onClose, selectedCourt, setSelectedCourt, open, fetchCourts } = props;
  const { setAlert } = React.useContext(AuthContext)

  const handleClose = () => {
    onClose(selectedCourt);
  };

  React.useEffect(() => {
    console.log(selectedCourt)
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourt((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { id, ...requestBody } = selectedCourt;
   
    const courtsService = new CourtsService();    

    const courts = await courtsService.FetchCourts();        
    
    const court = courts.find(c => c.number == selectedCourt.number)   
    
    if(court?.number == selectedCourt.number)
    {
      setAlert({open: true, type: 'error', description:'A existing court have already this number' })
      return;
    }

    handleClose();
    await courtsService.UpdateCourt(requestBody, id);
    await fetchCourts();
  };

  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Edit Court</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="lastName">Number:</label>
      <input type="number" id="number" name="number" value={selectedCourt?.number} onChange={handleChange} required /><br /><br />
      
      <input type="submit" value="Update" />
    </form>
    </div>
  </Dialog>
  );
}