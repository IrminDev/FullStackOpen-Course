import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };
    
    return {
        type,
        value,
        onChange,
    };
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            if (name !== "") {
                try {
                    const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
                    setCountry({ found: true, data: response.data })
                } catch (error) {
                    setCountry({ found: false, data: null });
                }
            }
        };
        fetchCountry();
    }, [name]);

    return country;
}