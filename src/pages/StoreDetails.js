import DetailedLocationCard from "../components/DetailedLocationCard/DetailedLocationCard";
import GenericMap from "../components/Map/GenericMap";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { sentenceCase } from "change-case";
import { STORE_API_BASE_URL, STORE_API_KEY } from "../constants/apiConstants";
import { DEFAULT_MAP_CENTER } from "../utils/constants";
import { HubConnectionBuilder } from "@microsoft/signalr";

const LocationDetails = () => {
    const { idOrAddress } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [store, setStore] = useState(null);
    const storeRef = useRef(null);

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
                    storeRef.current = response.data;
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
        try {
            const signalRConnection = new HubConnectionBuilder()
                .withUrl(`${STORE_API_BASE_URL}store-notification-hub`, {
                    accessTokenFactory: () => STORE_API_KEY,
                    withCredentials: true
                })
                .withAutomaticReconnect()
                .build();

            signalRConnection.on("StoreWaitTimeChanged", (message) => {
                setStore(prev => ({
                    ...prev,
                    waitTime: message.waitTime
                }));
            });

            signalRConnection.start();
        }
        catch (ignore) {
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                showInfoWindowOnMarkerClick={false}
                locations={store ? [store] : []}
            />
        </div>
    );
};

export default LocationDetails;