import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const PopUp = ({ show, handleClose, orderId, children }) => {

    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
        }
    };

    useEffect(() => {
        if (show) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    return (
        <>
            <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document" ref={modalRef}>
                    <div className="modal-content">
                    <div className="modal-body">
                       {children}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUp;