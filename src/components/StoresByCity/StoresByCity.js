import { useParams } from "react-router-dom";
import { STORE_API_BASE_URL, STORE_API_KEY } from "../../constants/apiConstants";
import axios from "axios";
import { useEffect, useState } from "react";
import { kebabCase } from "change-case";

const StoresByCity = () => {
    const { stateCode, city } = useParams();
    const [stores, setStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStores = async () => {
            await axios.get(`${STORE_API_BASE_URL}api/stores?cityOrZipCode=${city}`, {
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
        <div className="flex justify-left">
            {isLoading ? <h1>Loading...</h1> :
                <div>
                    <div>
                        <a href={`/locations`}>Directory</a> <span>&gt;</span> <a href={`/locations/${stateCode}`}>{stores[0].state}</a> <span>&gt;</span> {city}
                    </div>
                    <h1 className="text-4xl uppercase">Oil Changers in {city}, {stores[0].state}</h1>
                    <ul>
                        {stores.map(store =>
                            <li key={store.id}>
                                <a href={`${city}/${kebabCase(store.addressLine1)}`} className="font-bold">{store.locationName}</a> - {store.addressLine1}
                            </li>)}
                    </ul>
                </div>}
        </div>
    )
}

export default StoresByCity;