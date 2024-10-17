import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal: controller.signal })
                const result = await response.json();
                setData(result) 
            } catch (err) {
                if(err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                setLoading(false)
            }

        }

        fetchData();

        return () => controller.abort();
    }, [url])
    return { data, loading, error };
};

