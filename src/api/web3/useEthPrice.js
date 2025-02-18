import { useState, useEffect } from "react";

const getEthPrice = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
    const data = await response.json();
    return data.ethereum.usd;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return null;
  }
};

const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getEthPrice();
      setEthPrice(price);
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update tiap 1 menit

    return () => clearInterval(interval);
  }, []);

  return ethPrice;
};

export default useEthPrice;
