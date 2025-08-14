import { useParams } from "react-router-dom";
import { STORE_API_BASE_URL, STORE_API_KEY } from "../../constants/apiConstants";
import axios from "axios";
import { useEffect, useState } from "react";

const CitiesByState = () => {
    const { stateCode } = useParams();
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getState = async () => {
            await axios.get(`${STORE_API_BASE_URL}api/states/${stateCode}`, {
                headers: {
                    'x-api-key': STORE_API_KEY
                }
            }).then(response => {
                if (response.status === 200) {
                    setState(response.data);
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            })
        }

        getState();
    }, [stateCode]);

    return (
        <div>
            {
                isLoading ? <div>Loading...</div> :
                    <div>
                        <h1 className="text-5xl uppercase">Oil Changers in {stateCode}</h1>
                        <ul className="px-16 py-10 text-left leading-normal">
                            {state.cities.map(city =>
                                <li key={city} className="px-3 py-[0.4rem] font-bold text-sm">
                                    <a href={`${stateCode}/${city}`}>{city}</a>
                                </li>
                            )}
                        </ul>
                    </div>
            }
        </div >
    )
}

export default CitiesByState;