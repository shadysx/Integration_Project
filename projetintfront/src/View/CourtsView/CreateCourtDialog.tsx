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

// Define the props for the component
export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: Court) => void;
  fetchCourts: () => void;
}

// Define and export the component
export default function CreateCourtDialog(props: SimpleDialogProps) {
  // Extract the props
  const { onClose, open, fetchCourts } = props;

  // Access the alert state from AuthContext
  const { setAlert } = React.useContext(AuthContext);

  // Define the local state for the court
  const [court, setCourt] = useState<Court>({
    number: 0
  });

  // Handle the dialog close event
  const handleClose = () => {
    onClose(court);
  };

  // useEffect hook can be used for any side effects, like fetching data
  React.useEffect(() => {
    // Add any side effects here if needed
  });

  // Handle the change event of the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourt((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle the form submit event
  const handleSubmit = async (event) => {
    event.preventDefault();    

    // Log the selected court
    console.log('selected court ', court)

    // Create an instance of the CourtsService
    const courtsService = new CourtsService();

    // Fetch the existing courts
    const courts = await courtsService.FetchCourts();

    // Check if a court with the same number already exists
    const c = courts.find(c => c.number == court.number)

    if (c?.number == court.number) {
      // Display an error alert if a court with the same number already exists
      setAlert({open: true, type: 'error', description:'An existing court already has this number' })
      return;
    }

    if (court.number < 1) {
      // Display an error alert if the court's number is less than 1
      setAlert({open: true, type: 'error', description:'The court\'s number should be bigger than 0' })
      return;
    }

    // Display a success alert for court creation
    setAlert({ type: "success", description: "Court created successfully!", open: true });

    // Close the dialog
    handleClose();

    // Create the court using the CourtsService
    await courtsService.CreateCourt(court);

    // Fetch the updated courts
    await fetchCourts();
  };

  // Render the component
  return (
    <Dialog onClose={handleClose} open={open} >
    <DialogTitle className="dialog-title">Create Court</DialogTitle>
    <div className='dialog'>
    <form onSubmit={handleSubmit}  className="dialog-form">
      <label htmlFor="lastName">Number:</label>
      <input type="number" id="number" name="number" value={court?.number} onChange={handleChange} required /><br />
      
      <input type="submit" value="Create" />
    </form>
    </div>
  </Dialog>
  );
}