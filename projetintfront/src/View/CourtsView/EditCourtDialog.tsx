import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Court, User } from '../../Interfaces/Interface';
import "./EditCourtDialog.css"
import { CourtsService } from '../../services/CourtsService';
import { AuthContext } from '../../contexts/AuthContext';


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
    
    const court = courts.find(c => c.number === selectedCourt.number)   
    
    if(court?.number === selectedCourt.number )
    {      
        setAlert({open: true, type: 'error', description:'An existing court have already this number' })
        return;
    }

    if(selectedCourt.number < 1)
    {      
        setAlert({open: true, type: 'error', description:'The court\'s number should be bigger than 0' })
        return;
    }

    setAlert({open: true, type: 'success', description:'Court Updated Successfully !' });

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
      <input type="number" id="number" name="number" value={selectedCourt?.number} onChange={handleChange} required /><br />
      
      <input type="submit" value="Update" />
    </form>
    </div>
  </Dialog>
  );
}