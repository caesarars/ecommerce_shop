import React, {useEffect} from "react";

const ErrorPopUp = ({message, onClose}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();  // Call the onClose function passed from parent to hide the popup
        }, 3000);
        return () => clearTimeout(timer);  // Cleanup the timer
    }, [onClose]);

    if (!message) return null;  // Don't render if there's no message

    return (
        <div className="alert alert-danger alert-dismissible fade show position-fixed bottom-0 end-0 m-3" role="alert" style={{ zIndex: 1050 }}>
            <strong>Error!</strong> {message}
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        </div>
    )
}

export default ErrorPopUp;