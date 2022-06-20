import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../config";

const useGetNetworks = () => {
    const [networks, setNetworks] = useState([]);

    useEffect(() => {
        const funcGetNetworks = async () => {
            const { data } = await axios.get(`${config.url}/listNetworks`);

            if (data.message === undefined) {
                setNetworks(data);
            } else {
                const result = {
                    message: data.message,
                };

                setNetworks(result);
            }
        };
        funcGetNetworks();
    }, []);

    return networks;
};

export default useGetNetworks;
