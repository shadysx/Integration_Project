import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Court, User } from '../../Interfaces/Interface';
import "./EditCourtDialog.css"
import { CourtsService } from '../../services/CourtsService';
import { AuthContext } from '../../contexts/AuthContext';

// Define the props for the component
export interface SimpleDialogProps {
  open: boolean;
  selectedCourt: Court;
  setSelectedCourt: (court: any) => void;
  onClose: (value: Court) => void;
  fetchCourts: () => void;
}

// Define and export the component
export default function EditCourtDialog(props: SimpleDialogProps) {
  // Extract the props
  const { onClose, selectedCourt, setSelectedCourt, open, fetchCourts } = props;

  // Access the alert state from AuthContext
  const { setAlert } = React.useContext(AuthContext);

  // Handle the dialog close event
  const handleClose = () => {
    onClose(selectedCourt);
  };

  // Handle the change event of the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourt((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle the form submit event
  const handleSubmit = async (event) => {
    event.preventDefault();   

    // Extract the id from selectedCourt and remove it from requestBody
    const { id, ...requestBody } = selectedCourt;
   
    // Create an instance of the CourtsService
    const courtsService = new CourtsService();    

    // Fetch the existing courts
    const courts = await courtsService.FetchCourts();        
    
    // Check if a court with the same number already exists
    const court = courts.find(c => c.number === selectedCourt.number)   
    
    if (court?.number === selectedCourt.number) {
      // Display an error alert if a court with the same number already exists
      setAlert({open: true, type: 'error', description:'An existing court already has this number' })
      return;
    }

    if (selectedCourt.number < 1) {
      // Display an error alert if the court's number is less than 1
      setAlert({open: true, type: 'error', description:'The court\'s number should be bigger than 0' })
      return;
    }

    // Display a success alert for court update
    setAlert({open: true, type: 'success', description:'Court Updated Successfully !' });

    // Close the dialog
    handleClose();

    // Update the court using the CourtsService
    await courtsService.UpdateCourt(requestBody, id);

    // Fetch the updated courts
    await fetchCourts();
  };

  // Render the component
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