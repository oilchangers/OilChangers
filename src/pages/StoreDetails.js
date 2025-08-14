import DetailedLocationCard from "../components/DetailedLocationCard/DetailedLocationCard";
import GenericMap from "../components/Map/GenericMap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { sentenceCase } from "change-case";
import { STORE_API_BASE_URL, STORE_API_KEY } from "../constants/apiConstants";
import { ClipLoader } from "react-spinners";
import { DEFAULT_MAP_CENTER } from "../utils/constants";

const LocationDetails = () => {
    const { idOrAddress } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [store, setStore] = useState(null);

    useEffect(() => {
        const getStore = async () => {
            const url = `${STORE_API_BASE_URL}api/stores/${sentenceCase(idOrAddress)}?includeWaitTime=true&includeCoordinates=true&includeRating=true`;
            await axios.get(url, {
                headers: {
                    'x-api-key': STORE_API_KEY
                }
            }).then(response => {
                if (response.status === 200) {
                    setStore(response.data);

                    document.title = response.data?.homepageTitleTag;
                    document.querySelector('meta[name="description"]').setAttribute('content', response.data?.homepageMetaDescription);
                }
            }).catch((ignore) => {
                console.log("Error fetching store details");
            }).finally(() => {
                setIsLoading(false);
            })
        }

        getStore();
    }, [idOrAddress]);

    useEffect(() => {
        document.title = "Loading...";
    }, []);

    return (
        <div className="w-[100vw] h-[100vh]">
            {isLoading ?
                <div className="absolute left-4 top-16 w-[100%] w-min-[48%] h-min-[80%] z-50 justify-center border border-solid border-red-500 bg-red-500">
                    <div className="flex justify-center items-center absolute w-min-[50vw] h-full border border-solid shadow-xl">
                        {/* <ClipLoader color="#fcca46" loading={isLoading} size={100} /> */}
                    </div>
                </div> :
                <DetailedLocationCard store={store} className="absolute left-4 top-16 w-[48%] h-fit z-50 bg-white" />
            }

            <GenericMap
                center={store ? { lat: store?.coordinates.latitude, lng: store?.coordinates.longitude - 0.1 } : DEFAULT_MAP_CENTER}
                showLegend={false}
                canBeInteractedWith={true}
                showCenterMarker={false}
                locations={store ? [store] : []}
            />
        </div>
    );
};

export default LocationDetails;