import React, {useEffect} from "react";
import "./LoadingComponent.css"

const LoadingComponent = ({isLoading, isPopUp = false}) => {
  
    return (
        <>
            {isLoading &&  
            <div className="background_loading">
              <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                {!isPopUp &&  <div class="spinner-border text-danger" role="status" style={{opacity:1, width:'64px', height:'64px'}}>
                    <span  style={{opacity:1}} class="sr-only"></span>
                </div>}
               
            </div>
        </div>}
        </>
       
      
    )
}

export default LoadingComponent;