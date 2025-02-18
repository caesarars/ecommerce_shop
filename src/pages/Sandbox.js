import React , {useState} from "react"
import { ethers } from "ethers";
import "./Sandbox.css"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../SmartContract"

const Sandbox = () => {

    const [ userAddress, setUserAddress ] = useState("");
    const [weiAmount, setWeiAmount] = useState(0)
    const [recepient , setRecepient] = useState(0);
    const [ balance , setBalance ] = useState(0)

    const images = [
        'https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Image+1',
        'https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Image+2',
        'https://via.placeholder.com/400x300/3357FF/FFFFFF?text=Image+3',
        'https://via.placeholder.com/400x300/FF33A8/FFFFFF?text=Image+4',
        'https://via.placeholder.com/400x300/33A8FF/FFFFFF?text=Image+5',
        'https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Image+6',
        'https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Image+7',
        'https://via.placeholder.com/400x300/3357FF/FFFFFF?text=Image+8',
        'https://via.placeholder.com/400x300/33A8FF/FFFFFF?text=Image+123',
        'https://via.placeholder.com/400x300/FF5733/FFFFFF?text=Image+611',
        'https://via.placeholder.com/400x300/33FF57/FFFFFF?text=Image+73',
        'https://via.placeholder.com/400x300/3357FF/FFFFFF?text=Image+81',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const imagesToDisplay = images.slice(currentIndex, currentIndex + 4);

    // Fungsi untuk mengubah gambar ke kanan
    const nextImages = () => {
        if (currentIndex + 4 >= images.length) {
            setCurrentIndex(0); // Loop ke awal
        } else {
            setCurrentIndex(currentIndex + 4);
        }
    };

    // Fungsi untuk mengubah gambar ke kiri
    const prevImages = () => {
        if (currentIndex - 4 < 0) {
            setCurrentIndex(images.length - 4); // Loop ke akhir
        } else {
            setCurrentIndex(currentIndex - 4);
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider =  new ethers.BrowserProvider(window.ethereum) ;
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                console.log("address : ", address)
                setUserAddress(address)

                sendTransaction()
            } catch(error) {
                console.error(error);
            }
        } else {
            alert("MetaMask not detected! Please install MetaMask.");
        }
    }

    const handleWeiAmount = (e) => {
        setWeiAmount(e.target.value)
    }

    const handleRecepient = (e) => {
        setRecepient(e.target.value)
    }

    const ethToWei = (amountInEth) => {
        return ethers.parseUnits(amountInEth.toString(), "ether"); // Converts ETH to Wei
    };

    const sendTransaction = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            const tx = await contract.deposit(ethToWei(weiAmount), {
                value: ethToWei(weiAmount),
            });

            await tx.wait();
            alert(`Deposit Successful: ${tx.hash}`);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    }

    const getBalances = async () => {
        if (!window.ethereum) {
            alert("MetaMask is required!");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            // Call the getBalance function from the smart contract
            const contractBalance = await contract.getBalance();
            console.log("contract balance : " , contractBalance)
            setBalance(ethers.formatUnits(contractBalance, "ether")); // Convert Wei to ETH
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }

    return (
        <div className="container w-50 mt-5">
            {/* <div className="box mb-5"></div>

            <div className="carousel-container">
            <div
                className="carousel-images"
                style={{
                    transform: `translateX(-${currentIndex * 25}%)`, // Geser gambar
                    transition: 'transform 0.5s ease-in-out', // Animasi geser
                }}
            >
                {imagesToDisplay.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`carousel-image-${index}`}
                        className="carousel-image"
                    />
                ))}
            </div>
            <button className="carousel-button prev" onClick={prevImages}>
                Prev
            </button>
            <button className="carousel-button next" onClick={nextImages}>
                Next
            </button>
        </div>
            <div className="box2"></div>
            <div className="box3"></div>
            <div className="box4"></div>
            <div className="box5"></div>

            <div className="web3-payment"><p>Web 3 Payment</p>
                    <input type="text" placeholder="Wei amount" onChange={handleWeiAmount} />
                    <input type="text" placeholder="Recepient" onChange={handleRecepient} />
                    <br></br>
                <button className="btn btn-success" onClick={() => connectWallet()}>Pay Here</button><br></br>
                <button className="btn btn-primary" onClick={() => getBalances()}>Get Balance</button>
                <br></br>
                <h4>{balance}</h4>
            </div>
            */}
            <div className=" test1">
            </div>
            <div className="popup">
                welcome
            </div>
        </div>
    )
}

export default Sandbox;