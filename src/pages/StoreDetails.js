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
            const fields = 'fields=id,hours,locationName,locationType,state,city,addressLine1,postalCode,services,phoneNumber,filters,waitTime,distanceFromUserLocation,coordinates,rating,homepageTitleTag,homepageMetaDescription';
            const url = `${STORE_API_BASE_URL}api/stores/${sentenceCase(idOrAddress)}?${fields}`;
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
        <div className="w-screen h-screen">

            <DetailedLocationCard
                store={store}
                className="bg-white lg:w-[70%] xl:w-[50%] lg:absolute z-50 top-24 left-7 shadow-xl"
                isLoading={isLoading}
            />

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