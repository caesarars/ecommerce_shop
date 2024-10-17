import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const PaymentSuccessModal = ({ show, handleClose, orderId }) => {
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
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className='montserrat-normal mt-5'>Your payment has been processed successfully.</p>
                <p>Thank you for your purchase!</p>
                <FontAwesomeIcon icon={faCheckCircle} size="4x" className='text-success mt-3 mb-3' />
                <p className='montserrat-normal'>Your Order id</p>
                <p className='montserrat-light'>{orderId}</p>
                <a className="m-3" href={`/purchase/${orderId}`} >Click Here to Check you purchase</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
