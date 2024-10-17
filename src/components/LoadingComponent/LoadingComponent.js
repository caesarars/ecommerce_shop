import React, {useEffect} from "react";


const LoadingComponent = ({onClose}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();  // Call the onClose function passed from parent to hide the popup
        }, 3000);
        return () => clearTimeout(timer);  // Cleanup the timer
    }, [onClose]);

    return (
        <div className="d-flex justify-content-center align-items-center position-fixed" style={{ height: '100vh' }}>
            {/* Bootstrap Spinner */}
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    )
}

export default LoadingComponent;