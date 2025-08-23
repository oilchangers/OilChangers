import SearchBox from '../components/SearchBox/SearchBox';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import SummarizedLocationCard from '../components/SummarizedLocationCard/SummarizedLocationCard';
import Button from '../components/Button/Button';
import MyLocationIcon from '../components/Icons/MyLocationIcon';
import { STORE_API_BASE_URL, STORE_API_KEY } from '../constants/apiConstants';
import LocationFinderMap from '../components/Map/LocationFinderMap';
import { HubConnectionBuilder } from '@microsoft/signalr';
import LocationsByStateBrowser from '../components/LocationsByStateBrowser/LocationsByStateBrowser';
import { Helmet } from 'react-helmet';

const LocationFinder = () => {
    const [stores, setStores] = useState([]);
    const storesRef = useRef(stores);
    const [cityOrZipCode, setCityOrZipCode] = useState('');
    const [isFetchingStores, setIsFetchingStores] = useState(false);
    const [selectedLocationTypes, setSelectedLocationTypes] = useState([]);
    const [locationTypesQueryParamsString, setLocationTypesQueryParamsString] = useState([]);
    const [canAccessCurrentUserLocation, setCanAccessCurrentUserLocation] = useState(false);
    const [search, setSearch] = useState(false);
    const [selectedUserLocation, setSelectedUserLocation] = useState('');
    const [isCurrentLocationSelectionVisible, setIsCurrentLocationSelectionVisible] = useState(true);
    const [hasUserRequestedCurrentLocation, setHasUserRequestedCurrentLocation] = useState(false);
    const [states, setStates] = useState([]);
    const [isLoadingStates, setIsLoadingStates] = useState(false);

    useEffect(() => {
        try {
            const signalRConnection = new HubConnectionBuilder()
                .withUrl(`${STORE_API_BASE_URL}store-notification-hub`, {
                    accessTokenFactory: () => STORE_API_KEY,
                    withCredentials: true
                })
                .withAutomaticReconnect()
                .build();

            signalRConnection.on("StoreAvailabilityChanged", (message) => {
                const currentStores = storesRef.current;
                const store = currentStores.find(store => store.id === message.storeId);
                if (store) {
                    store.availabilityStatus = message.availabilityStatus;
                    setStores([...currentStores]);
                }
            });

            signalRConnection.start();
        }
        catch (ignore) {
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = async (cityOrZipCode) => {
        if (!cityOrZipCode) {
            return;
        }

        setIsFetchingStores(true);

        const selectedFieldsParam = 'id,hours,locationName,locationType,state,city,addressLine1,postalCode,phoneNumber,filters,waitTime,distanceFromUserLocation,coordinates';

        let url = `${STORE_API_BASE_URL}api/stores?cityOrZipCode=${cityOrZipCode}${locationTypesQueryParamsString}&fields=${selectedFieldsParam}`;

        await axios.get(url, {
            headers: {
                'x-api-key': STORE_API_KEY
            }
        }).then(response => {
            if (response.status === 200) {
                setStores(response.data);
            }
        }).catch(() => {
        }).finally(() => {
            setSelectedUserLocation(cityOrZipCode);
            setIsFetchingStores(false);
        });
    };

    const handleGetStoresByLocationType = (event, locationType) => {
        const locationTypes = [...selectedLocationTypes];

        if (event.target.checked) {
            locationTypes.push(locationType);
            setSelectedLocationTypes(locationTypes);
        } else {
            locationTypes.splice(locationTypes.indexOf(locationType), 1);
            setSelectedLocationTypes(locationTypes);
        }

        let locationTypesQueryParamsString = '';
        for (let locationType of locationTypes) {
            locationTypesQueryParamsString += `&locationType=${locationType.replace("+", "%2B").replace("&", "%26")}`;
        }

        setLocationTypesQueryParamsString(locationTypesQueryParamsString);

        let url = '';
        if (cityOrZipCode) {
            url = `${STORE_API_BASE_URL}api/stores?cityOrZipCode=${cityOrZipCode}${locationTypesQueryParamsString}`;
        }
        else {
            url = `${STORE_API_BASE_URL}api/stores${locationTypesQueryParamsString}`;
        }

        getStores(url);
    }

    const getStores = async (url) => {
        setIsFetchingStores(true);
        await axios.get(url, {
            headers: {
                'x-api-key': STORE_API_KEY
            }
        }).then(response => {
            if (response.status === 200) {
                setStores(response.data);
            }
        }).catch(() => {
        }).finally(() => {
            setIsFetchingStores(false);
        });
    }

    useEffect(() => {
        getCurrentUserLocation();
    }, []);

    useEffect(() => {
        storesRef.current = stores;
    }, [stores]);

    const getCurrentUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (position.coords.latitude && position.coords.longitude) {
                    setSelectedUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setCanAccessCurrentUserLocation(true);
                }
                else {
                    setCanAccessCurrentUserLocation(false);
                }
            },
            (error) => {
                setCanAccessCurrentUserLocation(false);
                setIsCurrentLocationSelectionVisible(false);
            });
    }

    useEffect(() => {
        const fetchStates = async () => {
            setIsLoadingStates(true);
            await axios.get(`${STORE_API_BASE_URL}api/states`, {
                headers: {
                    'x-api-key': STORE_API_KEY
                }
            }).then(response => {
                setStates(response.data);
            })
                .catch(error => {
                    console.error("Error fetching states", error);
                })
                .finally(() => {
                    setIsLoadingStates(false);
                });
        }

        fetchStates();
    }, []);

    return (
        <>
            <Helmet>
                <title>Find an Oil Changers near you - hours, directions, wait times, and more</title>
                <meta name="description" content="Oil Changers serves millions of happy customers across the country. Click here to find an Oil Changers in your neighborhood." />
            </Helmet>

            <div className="flex flex-col w-[100vw] h-[100vh]">
                <div className="flex-[3] flex w-[100%] min-h-[75vh]">
                    <div className="relative z-10 flex flex-col md:w-[350px] p-0 pt-3 overflow-visible shadow-[3px_0_5px_-2px_rgba(0,0,0,0.3)]">
                        <div className="flex flex-col">
                            <div className="flex flex-col px-4">
                                <div className="flex flex-col gap-3 pb-3">
                                    <h1 className="text-center text-[1.6rem] uppercase font-bold">Find an Oil Changers</h1>
                                    <form className="flex flex-col gap-2" onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSearch(cityOrZipCode);
                                        setSearch(true);
                                    }}>
                                        <SearchBox
                                            onChange={(e) => setCityOrZipCode(e.target.value)}
                                            value={cityOrZipCode}
                                            placeholder="Enter city or zip code"
                                            autoComplete="off"
                                            role="search"
                                            name="location"
                                        />
                                        <Button className="py-[8px]" type="submit">
                                            Find locations
                                        </Button>
                                    </form>
                                </div>

                                {isCurrentLocationSelectionVisible &&
                                    <div className="flex items-center gap-2 pb-3">
                                        <MyLocationIcon width="1rem" height="1rem" />
                                        <div
                                            className="underline cursor-pointer"
                                            onClick={() => {
                                                getCurrentUserLocation();
                                                setHasUserRequestedCurrentLocation(true);
                                                setCityOrZipCode(null);
                                            }}
                                        >
                                            Use my current location
                                        </div>
                                    </div>}
                            </div>

                            {true &&
                                <div className="mb-2">
                                    <div className="border-t border-gray-400 mb-3"></div>

                                    <div className="flex flex-col px-2">
                                        <div className="text-left text-xs font-bold mb-2 px-3">Filter locations</div>
                                        <div className="flex justify-between px-3 text-[10px]">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="oil-changers" className="flex gap-2 items-center">
                                                    <input
                                                        checked={selectedLocationTypes.includes('Oil Changers')}
                                                        type="checkbox"
                                                        name="oil-changers"
                                                        className="w-3 h-3"
                                                        onChange={(e) => handleGetStoresByLocationType(e, 'Oil Changers')}
                                                    />
                                                    <span
                                                        title="Oil Changers"
                                                        className="text-wrap hover:underline cursor-pointer"
                                                        onClick={() => {
                                                            handleGetStoresByLocationType({ target: { checked: !selectedLocationTypes.includes('Oil Changers') } }, 'Oil Changers');
                                                        }}
                                                    >
                                                        Oil Changers
                                                    </span>
                                                </label>
                                                <label htmlFor="car-wash" className="flex gap-2 items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="car-wash"
                                                        className="w-3 h-3"
                                                        onChange={(e) => handleGetStoresByLocationType(e, 'Oil Changers & Car Wash')} />
                                                    <span
                                                        title="Oil Changers & Car Wash"
                                                        className="text-wrap hover:underline cursor-pointer"
                                                        onClick={() => {
                                                            handleGetStoresByLocationType({ target: { checked: !selectedLocationTypes.includes('Oil Changers & Car Wash') } }, 'Oil Changers & Car Wash');
                                                        }}
                                                    >
                                                        Car Wash
                                                    </span>
                                                </label>
                                            </div>

                                            <div className="flex flex-col gap-2 text-[10px] ">
                                                <label htmlFor="oil-changers-plus-repair" className="flex gap-2 items-center">
                                                    <input type="checkbox" name="oil-changers-plus-repair" className="w-3 h-3" onChange={(e) => handleGetStoresByLocationType(e, 'Oil Changers + Repair')} />
                                                    <span
                                                        title="Oil Changers + Repair"
                                                        className="text-wrap hover:underline cursor-pointer"
                                                        onClick={() => {
                                                            handleGetStoresByLocationType({ target: { checked: !selectedLocationTypes.includes('Oil Changers + Repair') } }, 'Oil Changers + Repair');
                                                        }}
                                                    >
                                                        Oil Changers + Repair
                                                    </span>
                                                </label>

                                                <label htmlFor="coming-soon" className="flex items-center justify-start gap-2">
                                                    <input type="checkbox" name="coming-soon" className="w-3 h-3" onChange={(e) => handleGetStoresByLocationType(e, 'Coming Soon')} />
                                                    <span
                                                        title="Coming Soon"
                                                        className="text-wrap hover:underline cursor-pointer"
                                                        onClick={() => {
                                                            handleGetStoresByLocationType({ target: { checked: !selectedLocationTypes.includes('Coming Soon') } }, 'Coming Soon');
                                                        }}
                                                    >
                                                        Coming Soon
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>


                                </div>}

                            <div className="border-t border-gray-400"></div>
                        </div>

                        {isFetchingStores ?
                            <div className="text-left text-black px-3 mt-3">Loading...</div> :
                            stores.length > 0 ?
                                <div className="flex flex-col overflow-y-scroll">
                                    {stores.map((store) => (
                                        <div key={store.id} className="cursor-pointer hover:bg-gray-100">
                                            <div className="my-3 px-4">
                                                <SummarizedLocationCard {...store} />
                                            </div>
                                            <div className="border-t border-gray-400 mt-3" />
                                        </div>
                                    ))}
                                </div> :
                                !cityOrZipCode && !canAccessCurrentUserLocation ?
                                    <div className="text-left text-sm C mt-3 px-3 overflow-y-scroll h-full">
                                        We cannot find your current location.
                                        <br />
                                        Please search for a location above.
                                    </div> :
                                    <div className="text-left text-sm mt-3 text-black px-3  overflow-y-scroll h-full">
                                        No locations found within 50 miles of your location
                                    </div>
                        }
                    </div>

                    <LocationFinderMap
                        selectedUserLocation={selectedUserLocation}
                        stores={stores}
                        isFetchingStores={isFetchingStores}
                    />
                </div>

                <LocationsByStateBrowser className="flex-[1]" states={states} isLoading={isLoadingStates} />
            </div>
        </>
    );

}

export default LocationFinder;