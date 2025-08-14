import axios from "axios";
import { useEffect, useState } from "react";
import { STORE_API_BASE_URL, STORE_API_KEY } from "../../constants/apiConstants";

const LocationsByStateFooter = () => {
    const [states, setStates] = useState([]);

    useEffect(() => {
        axios.get(`${STORE_API_BASE_URL}api/states`, {
            headers: {
                'x-api-key': STORE_API_KEY
            }
        })
            .then(response => {
                setStates(response.data);
            })
            .catch(error => {
                console.error("Error fetching states", error);
            });
    }, []);

    return (
        <div className="p-[100px] flex flex-col gap-12 justify-center items-center shadow-lg z-10 border border-solid border-red-300">
            <h1 className="text-5xl uppercase">Browse locations by state</h1>
            <div className="w-[70%]">
                <ul className="grid grid-cols-4 gap-y-2 mx-auto">
                    {states.map((state, index) => (
                        <li
                            key={state.abbreviation}
                            className={`flex justify-center items-center text-sm  border-t border-gray-300 ${index < 4 ? 'border-t-0' : ''}`}
                        >
                            <a href={`locations/${state.abbreviation.toLowerCase()}`}>{state.name}</a>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default LocationsByStateFooter;