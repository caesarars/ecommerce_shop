// useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartContext } from '../context/CartContext';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const { setListOfCart } = useCartContext()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url, {withCredentials:true, headers: {
                    Authorization: `Bearer ${token}`,
                  }});

                if (response && response.data && response.data.carts) {

                    console.log("response.data.carts : " , response.data.carts)

                    setData(response.data.carts);
                    setListOfCart(response.data.carts)
                }

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
