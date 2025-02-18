import React, { useEffect, useState } from "react";
import { parseEther } from "ethers"; // Perbaikan import
import useWeb3 from "../../components/useWeb3";
import useEthPrice from "../../api/web3/useEthPrice";
import PopUp from "../../components/PopUp/PopUp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const TotalPayment = ({totalPrice, cardNumber ,handleCardNumberChange, handleErrorPopUp}) => {

    const { account, provider, connectWallet } = useWeb3();
    const amount = totalPrice + 5;
    const [txHash, setTxHash] = useState(null);
    const [isError ,setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const ethPrice = useEthPrice();
    const amountInEth = ethPrice ? ((totalPrice + 5) / ethPrice).toFixed(6) : ""; 
    const merchantAddress = "0x805ae6Bc960DC34b209b783ce211af05618b93a6"; // Wallet tujuan
    const [isSucces , setIsSuccess] = useState(false);
  
    const handlePayment = async () => {
      if (!provider) return alert("Connect MetaMask first!");
      try {
        const signer = await provider.getSigner(); // Perbaikan pemanggilan signer
        const tx = await signer.sendTransaction({
          to: merchantAddress,
          value: parseEther("0.0000001"), // Fix parseEther
        });
  
        setTxHash(tx.hash);
        setIsSuccess(true);
        handleErrorPopUp(true);
      } catch (error) {      
        let message = "Transaction Failed";
        if (error?.reason) {
          message = error.reason; // Example: "rejected"
        } else if (error?.code === "ACTION_REJECTED") {
          message = "User rejected the transaction.";
        } else if (error?.error?.message) {
          message = error.error.message;
        } else {
          message = error.message || "An unknown error occurred.";
        }
        setErrorMessage(message)
        setIsError(true)
        handleErrorPopUp(true)
      }
    };
  
    const onClose = () => {
      setIsError(false)
      setIsSuccess(false)
      handleErrorPopUp(false)
      handleErrorPopUp(false);
    }

    return (
        <> 
                 <PopUp show={isError} handleClose={onClose} >
                     <div className="container" style={{border:"1px solid white"}}>
                         <div className="d-flex justify-content-center flex-column align-items-center">
                             <FontAwesomeIcon icon={faTimesCircle} color="red" size="2x"/>
                             <p className="montserrat-light" style={{fontSize:"16px" , margin:"8px"}}>{errorMessage}</p>
                         </div>
                     </div>
                  </PopUp>
                  <PopUp show={isSucces} handleClose={onClose}>
                  <div className="container" style={{border:"1px solid white"}}>
                         <div className="d-flex justify-content-center flex-column align-items-center">
                             <FontAwesomeIcon icon={faCheckCircle} color="green" size="3x"/>
                             <h4 style={{padding:"8px"}}>Your Transaction Hash</h4>
                             <p className="montserrat-light" style={{fontSize:"11px"}}>{txHash}</p>
                             <a href={`https://sepolia.etherscan.io/tx/${txHash}`}>Click here</a>
                         </div>
                     </div>
                  </PopUp>
                <div className="container-payment-methods p-4 shadow">
                 <p className="montserrat-normal">Payment</p>
                    <div className="form-payment p-3 montserrat-light">
                    <div className="row">
                        <div className="col-md-6">
                          <p className="montserrat-light">Cart Subtotal</p>
                        </div>
                        <div className="col-md-3">
                            <p className="montserrat-normal">${Math.ceil(totalPrice)}</p>
                        </div>
                    </div>
                    <div className="row">
                       <div className="col-md-6">
                          <p className="montserrat-light">Shipping Cost</p>
                        </div>
                        <div className="col-md-3">
                            <p className="montserrat-normal">$5</p>
                        </div>
                    </div>
                    <div className="row">
                       <div className="col-md-6">
                          <p className="montserrat-light">Total Cost</p>
                        </div>
                        <div className="col-md-3">
                            <p className="montserrat-normal">${Math.ceil(totalPrice) + 5}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                       <div className="col-md-6">
                          <p className="montserrat-light">ETH Price</p>
                        </div>
                        <div className="col-md-3">
                            <p className="montserrat-normal">${ethPrice}</p>
                        </div>
                    </div>

                    <div className="row">
                       <div className="col-md-6">
                          <p className="montserrat-light">Total</p>
                        </div>
                        <div className="col-md-4">
                            <p className="montserrat-normal">{amountInEth} ETH</p>
                        </div>
                    </div>
                    <hr></hr>
                        {!account && <span className="montserrat-light btn btn-warning" style={{fontSize:"14px"}} onClick={connectWallet}>
                          Connect Wallet
                        </span> }

                        {account && 
                        <>
                        
                         <p style={{fontSize:"13px", overflow:"auto"}}>Address : {account}</p>
                        </>}
                      
                    <br></br>
                    <button  style={{textAlign:"center"}} className="btn btn-success mt-3" onClick={handlePayment} disabled={!account}>Pay Now</button>
                    
                    {/* {txHash && <p style={{fontSize:"13px"}}>Transaction Hash: {txHash}</p>} */}


                    </div>
                </div>
        </>
    )
}

export default TotalPayment;