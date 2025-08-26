import { useParams } from "react-router-dom";
import { STORE_API_BASE_URL, STORE_API_KEY } from "../../constants/apiConstants";
import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const CitiesByState = () => {
    const { stateCode } = useParams();
    const [state, setState] = useState(null);
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
            }).finally(() => {
                setIsLoading(false);
            })
        }

        getState();
    }, [stateCode]);

    return (
        <div className="w-screen h-screen">
            {isLoading ?
                <div className="flex justify-center items-center h-[90%]">
                    <ClipLoader color="#fcca46" loading={isLoading} size={100} />
                </div> :
                <div className="flex flex-col max-w-[1250px] items-start gap-4 w-full pl-3 xl:ml-[27rem]">
                    <div className="mb-8 mt-3 text-left">
                        <a className="underline hover:text-primary font-bold" href={`/locations`}>Directory</a> <span>&gt;</span> {state.name}
                    </div>
                    <h1 className="text-left text-[2.125rem] md:text-[3rem] lg:text-[2.75rem] leading-[1] uppercase">Oil Changers in {state.name}</h1>
                    <ul className="px-[4px] md:pl-24 py-[1.5rem] text-left font-avenir-condensed font-semibold leading-normal">
                        {state.cities.map(city =>
                            <li key={city} className="px-3 py-[0.4rem]">
                                <a className="hover:underline hover:text-primary" href={`${stateCode}/${city}`}>{city}</a>
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div >
    )
}

export default CitiesByState;