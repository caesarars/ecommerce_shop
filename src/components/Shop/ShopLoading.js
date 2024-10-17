import React from "react";


import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShopLoading = ({loading}) => {
    return (
        <>
            {loading && (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                    <p>Loading...</p>
                </div>
            )}
        </>
    )
}

export default ShopLoading