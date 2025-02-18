import React, { useEffect, useState } from "react";
import { parseEther } from "ethers"; // Perbaikan import
import useWeb3 from "../../components/useWeb3";
import useEthPrice from "../../api/web3/useEthPrice";
import { auto } from "@popperjs/core";

const TotalPayment = ({totalPrice, cardNumber ,handleCardNumberChange}) => {

    const { account, provider, connectWallet } = useWeb3();
    const [amount, setAmount] = useState("");
    const [txHash, setTxHash] = useState(null);
 
    const ethPrice = useEthPrice();
    const amountInEth = ethPrice ? (totalPrice / ethPrice).toFixed(6) : "..."; 
    const merchantAddress = "0x805ae6Bc960DC34b209b783ce211af05618b93a6"; // Wallet tujuan
  
    const handlePayment = async () => {
      if (!provider) return alert("Connect MetaMask first!");
  
      try {
        const signer = await provider.getSigner(); // Perbaikan pemanggilan signer
        const tx = await signer.sendTransaction({
          to: merchantAddress,
          value: parseEther(amount), // Fix parseEther
        });
  
        setTxHash(tx.hash);
        alert("Transaction Sent! Hash: " + tx.hash);
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Transaction Failed");
      }
    };
  
    return (
        <>
                
                <div className="container-payment-methods">
                    <div className="form-payment p-3 montserrat-light">
                    <span className="montserrat-normal">${Math.ceil(totalPrice)}</span>
                   
                    <p>ETH Price ${ethPrice}</p>
                    <p>{amountInEth} ETH</p>
                    <button className="btn btn-warning mb-3" onClick={connectWallet}>
                        {account ? `Connected: ${account}` : "Connect Wallet"}
                    </button>
                    <br></br>
                    <input className="form-control"
                        type="text"
                        placeholder="Enter ETH Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button  style={{textAlign:"center"}} className="btn btn-success mt-3" onClick={handlePayment} disabled={!account}>Pay Now</button>
                    {txHash && <p style={{textAlign:"center"}}>Transaction Hash: {txHash}</p>}


                    </div>
                </div>
        </>
    )
}

export default TotalPayment;