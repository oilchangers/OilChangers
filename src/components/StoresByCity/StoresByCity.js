import { useParams } from "react-router-dom";
import { STORE_API_BASE_URL, STORE_API_KEY } from "../../constants/apiConstants";
import axios from "axios";
import { useEffect, useState } from "react";
import { kebabCase } from "change-case";
import ClipLoader from "react-spinners/ClipLoader";

const StoresByCity = () => {
    const { stateCode, city } = useParams();
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStores = async () => {
            const fields = `fields=id,locationName,addressLine1,state,postalCode`;
            await axios.get(`${STORE_API_BASE_URL}api/stores?cityOrZipCode=${city}&${fields}`, {
                headers: {
                    'x-api-key': STORE_API_KEY
                }
            }).then(response => {
                if (response.status === 200) {
                    setStores(response.data);
                }
            }).catch((ignore) => {
            }).finally(() => {
                setIsLoading(false);
            })
        }

        getStores();
    }, [city]);

    return (
        <div className="w-screen h-screen">
            {isLoading ?
                <div className="flex justify-center items-center h-[90%]">
                    <ClipLoader color="#fcca46" loading={isLoading} size={100} />
                </div> :
                <div className="flex flex-col max-w-[1250px] items-start gap-4 w-full pl-3 xl:ml-[27rem]">
                    <div className="mb-8 mt-3 text-left flex gap-1">
                        <a className="underline hover:text-primary font-bold" href={`/locations`}>Directory</a> <span>&gt;</span>
                        <a className="underline hover:text-primary font-bold" href={`/locations/${stateCode}`}>{stores[0].state.name}</a>
                        <span>&gt;</span> {city}
                    </div>
                    <h1 className="text-left text-[2.125rem] md:text-[3rem] lg:text-[2.75rem] leading-[1] uppercase">Oil Changers in {city}, {stores[0].state.name}</h1>
                    <ul className="px-[4px] md:pl-24 py-[1.5rem] text-left leading-normal">
                        {stores.map(store =>
                            <li key={store.id} className="px-3 py-[0.4rem] flex gap-1">
                                <a href={`${city}/${kebabCase(store.addressLine1)}`} className="hover:underline hover:text-primary font-avenir-condensed font-semibold">{store.locationName}</a> -
                                <span>{store.addressLine1}, {city} {store.state.code} {store.postalCode}</span>
                            </li>)}
                    </ul>
                </div>}
        </div>
    )
}

export default StoresByCity;