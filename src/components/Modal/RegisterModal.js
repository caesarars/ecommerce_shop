import React, {useState } from "react";
import { Modal, Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


// Styling for the modal box
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const RegisterModal = ({open, handleClose}) => {

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {/* Box to style the modal content */}
                <Box sx={style}>
                <CheckCircleOutlineIcon
                    sx={{ fontSize: 80, color: 'green' }} // Large green success icon
                    />
                 {/* Success Message */}
                <Typography id="modal-title" variant="h5" component="h2" sx={{ mt: 2 }}>
                Registration Successful!
                </Typography>
                
                <Typography id="modal-description" sx={{ mt: 2 }}>
                Thank you for registering. You can now log in to your account.
                </Typography>
                <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                >
                Close
                </Button>
                </Box>
            </Modal>
        </>
    )
}

export default RegisterModal;