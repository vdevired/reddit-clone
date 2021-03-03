import { useState, useEffect } from "react";
import { authAxios } from "../static/js/utils";
import { backendUrl } from "../static/js/constants";
import axios from "axios";

const useAxiosGet = (
    url,
    onSite = true,
    checkAuth = true,
    performRequest = true
) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unmounted = false;
        const fetchData = async () => {
            const axiosUsed = checkAuth ? authAxios : axios;
            const finalUrl = onSite ? backendUrl + url : url;

            try {
                const res = await axiosUsed.get(finalUrl);
                if (!unmounted) {
                    setData(res.data);
                    setLoading(false);
                }
            } catch (error) {
                if (!unmounted) {
                    setError(true);
                    setErrorMessage(error.message);
                    setLoading(false);
                }
            }
        };
        if (performRequest) fetchData();
        return () => {
            unmounted = true;
        };
    }, [url, performRequest, checkAuth, onSite]);

    return {
        data,
        setData,
        loading,
        error,
        errorMessage,
    };
};

export default useAxiosGet;
