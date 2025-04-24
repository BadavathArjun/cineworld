import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url, {
                    signal: abortController.signal,
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (!abortController.signal.aborted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (!abortController.signal.aborted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Cleanup function to abort fetch on unmount or url change
        return () => {
            abortController.abort();
        };
    }, [url]);

    return { data, loading, error };
};

export default useFetch; 