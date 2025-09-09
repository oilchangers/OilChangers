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
import MapLegend from '../components/Map/MapLegend';

const LocationFinder = () => {
    const [stores, setStores] = useState([]);
    const storesRef = useRef(stores);
    const [cityOrZipCode, setCityOrZipCode] = useState('');
    const [isLoadingStores, setIsLoadingStores] = useState(false);
    const [selectedLocationTypes, setSelectedLocationTypes] = useState([]);
    const [locationTypesQueryParamsString, setLocationTypesQueryParamsString] = useState([]);
    const [canAccessCurrentUserLocation, setCanAccessCurrentUserLocation] = useState(false);
    const [search, setSearch] = useState(false);
    const [userLocation, setUserLocation] = useState('');
    const [isCurrentLocationSelectionVisible, setIsCurrentLocationSelectionVisible] = useState(true);
    const [hasUserRequestedCurrentLocation, setHasUserRequestedCurrentLocation] = useState(false);
    const [states, setStates] = useState([]);
    const [isLoadingStates, setIsLoadingStates] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const locationRefs = useRef({});
    const isInitialRender = useRef(true);

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
                try {
                    const currentStores = storesRef.current;
                    const store = currentStores.find(store => store.id === message.storeId);
                    if (store) {
                        store.waitTime = message.waitTime;
                        setStores([...currentStores]);
                    }
                }
                catch (ignore) {
                }
            });

            signalRConnection.start()
                .catch(ignore => {
                });
        }
        catch (ignore) {
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStoresByCityOrZipCode = async (cityOrZipCode) => {
        if (!cityOrZipCode) {
            return;
        }

        setIsLoadingStores(true);

        const selectedFieldsParam = 'id,hours,locationName,locationType,state,city,addressLine1,postalCode,phoneNumber,filters,waitTime,distanceFromUserLocation,coordinates';

        let url = `${STORE_API_BASE_URL}api/stores?cityOrZipCode=${cityOrZipCode}&${locationTypesQueryParamsString}&fields=${selectedFieldsParam}`;

        await axios.get(url, {
            headers: {
                'x-api-key': STORE_API_KEY
            }
        }).then(response => {
            setStores(response.data);
        }).catch(() => {
        }).finally(() => {
            setUserLocation(cityOrZipCode);
            setIsLoadingStores(false);
        });
    };

    const getStores = async (url) => {
        setIsLoadingStores(true);
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
            setIsLoadingStores(false);
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
                    setUserLocation({
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
                })
                .finally(() => {
                    setIsLoadingStates(false);
                });
        }

        fetchStates();
    }, []);

    useEffect(() => {
        if (selectedLocation && locationRefs.current[selectedLocation.id]) {
            locationRefs.current[selectedLocation.id].scrollIntoView({
                block: 'end',
                behavior: 'smooth'
            });
        }
    }, [selectedLocation]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const getStoresByLocationType = () => {
            let locationTypesQueryParamsString = '';
            if (selectedLocationTypes.length !== 0) {
                locationTypesQueryParamsString = '&locationTypes=';
                const selectedLocationTypesString = selectedLocationTypes.join(',');
                locationTypesQueryParamsString += `${selectedLocationTypesString.replace("+", "%2B").replace("&", "%26")}`;
            }

            setLocationTypesQueryParamsString(locationTypesQueryParamsString);

            const selectedFieldsParam = 'id,hours,locationName,locationType,state,city,addressLine1,postalCode,phoneNumber,filters,waitTime,distanceFromUserLocation,coordinates';
            let url = '';
            if (cityOrZipCode) {
                url = `${STORE_API_BASE_URL}api/stores?cityOrZipCode=${cityOrZipCode}${locationTypesQueryParamsString}&fields=${selectedFieldsParam}`;
            }
            else {
                url = `${STORE_API_BASE_URL}api/stores${locationTypesQueryParamsString}&fields=${selectedFieldsParam}`;
            }

            getStores(url);
        }

        getStoresByLocationType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLocationTypes]);

    useEffect(() => {
        if (!isLoadingStores && !isInitialRender.current) {
            setSelectedLocation(null);
        }
    }, [isLoadingStores]);

    const isFilterSelected = (filter) => {
        return selectedLocationTypes.includes(filter);
    }

    const toggleLocationTypeFilter = (event, filter) => {
        let locationTypes = [...selectedLocationTypes];

        if (event.target.checked) {
            locationTypes.push(filter);
            setSelectedLocationTypes(locationTypes);
        }
        else {
            locationTypes = selectedLocationTypes.filter(locationType => locationType !== filter);
            setSelectedLocationTypes(locationTypes);
        }
    }

    const displayFilters = () => {
        return search && cityOrZipCode;
    }

    const displayUseMyCurrentLocation = () => {
        return !hasUserRequestedCurrentLocation && isCurrentLocationSelectionVisible;
    }

    return (
        <>
            <Helmet>
                <title>Find an Oil Changers near you - hours, directions, wait times, and more</title>
                <meta name="description" content="Oil Changers serves millions of happy customers across the country. Click here to find an Oil Changers in your neighborhood." />
            </Helmet>

            <div className="flex flex-col w-screen h-screen">
                <div className="grid [grid-template-rows:auto_auto_2fr_auto_4fr] md:grid-rows-[auto_auto_400px] md:grid-cols-[21rem_2fr] w-[100%] min-h-[160vh] md:min-h-fit bg-transparent">
                    {/* Search */}
                    <div className="flex-[1] col-start-1 col-span-1 !p-[1.5rem] xs:px-16 md:px-7 md:py-4 flex flex-col justify-center gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-center">
                                <h1 className="text-center text-[2rem] md:text-[1.85rem] uppercase font-bold w-max">Find an Oil Changers</h1>
                            </div>
                            <form className="flex flex-col gap-2" onSubmit={(e) => {
                                e.preventDefault();
                                setSearch(true);
                                getStoresByCityOrZipCode(cityOrZipCode);
                            }}>
                                <SearchBox
                                    onChange={(e) => setCityOrZipCode(e.target.value)}
                                    value={cityOrZipCode}
                                    placeholder="Enter city or zip code"
                                    autoComplete="off"
                                    role="search"
                                    name="location"
                                />
                                <Button type="submit" className="md:py-0" disabled={isLoadingStores}>
                                    Find locations
                                </Button>
                            </form>
                        </div>

                        {displayUseMyCurrentLocation() &&
                            <div className={`flex items-center gap-2 text-sm`}>
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

                    {/* Filters */}
                    {displayFilters() ?
                        <div
                            className="flex col-start-1 col-span-1 py-3 pl-4 xs:pl-0 xs:justify-center xs:px-16 md:px-7 md:py-2 text-black border-t md:border-b border-gray-400 shadow-[0_3px_2px_-1px_rgba(0,0,0,0.3)] md:shadow-none">
                            <div className="flex flex-col min-w-[90%] xs:min-w-[80%] md:min-w-full gap-2">
                                <div className="text-left text-sm font-bold">Filter locations</div>
                                <div className="flex justify-between gap-5 text-xs">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="oil-changers" className="flex gap-2 items-center">
                                            <input
                                                disabled={isLoadingStores}
                                                checked={isFilterSelected('Oil Changers')}
                                                type="checkbox"
                                                name="oil-changers"
                                                className="w-3 h-3"
                                                onChange={(e) => { toggleLocationTypeFilter(e, 'Oil Changers'); }}
                                            />
                                            <span
                                                title="Oil Changers"
                                                className={`text-wrap ${isLoadingStores ? 'pointer-events-none' : 'hover:underline'} cursor-pointer`}
                                                onClick={() => {
                                                    toggleLocationTypeFilter({ target: { checked: isFilterSelected('Oil Changers') } }, 'Oil Changers');
                                                }}
                                            >
                                                Oil Changers
                                            </span>
                                        </label>
                                        <label htmlFor="car-wash" className="flex gap-2 items-center">
                                            <input
                                                disabled={isLoadingStores}
                                                type="checkbox"
                                                name="car-wash"
                                                className="w-3 h-3"
                                                checked={isFilterSelected('Oil Changers & Car Wash')}
                                                onChange={(e) => {
                                                    toggleLocationTypeFilter(e, 'Oil Changers & Car Wash');
                                                }}
                                            />
                                            <span
                                                title="Oil Changers & Car Wash"
                                                className={`text-wrap ${isLoadingStores ? 'pointer-events-none' : 'hover:underline'} cursor-pointer`}
                                                onClick={() => {
                                                    toggleLocationTypeFilter({ target: { checked: isFilterSelected('Oil Changers & Car Wash') } }, 'Oil Changers & Car Wash');
                                                }}
                                            >
                                                Car Wash
                                            </span>
                                        </label>
                                    </div>

                                    <div className="flex flex-col text-xs gap-2">
                                        <label htmlFor="oil-changers-plus-repair" className="flex gap-2 items-center">
                                            <input
                                                disabled={isLoadingStores}
                                                checked={isFilterSelected('Oil Changers + Repair')}
                                                type="checkbox"
                                                name="oil-changers-plus-repair"
                                                className="w-3 h-3"
                                                onChange={(e) => {
                                                    toggleLocationTypeFilter(e, 'Oil Changers + Repair');
                                                }}
                                            />
                                            <span
                                                title="Oil Changers + Repair"
                                                className={`text-wrap ${isLoadingStores ? 'pointer-events-none' : 'hover:underline'} cursor-pointer`}
                                                onClick={() => {
                                                    toggleLocationTypeFilter({ target: { checked: isFilterSelected('Oil Changers + Repair') } }, 'Oil Changers + Repair');
                                                }}
                                            >
                                                Oil Changers + Repair
                                            </span>
                                        </label>

                                        <label htmlFor="coming-soon" className="flex items-center justify-start gap-2">
                                            <input
                                                disabled={isLoadingStores}
                                                checked={isFilterSelected('Coming Soon')}
                                                type="checkbox"
                                                name="coming-soon"
                                                className="w-3 h-3"
                                                onChange={(e) => {
                                                    toggleLocationTypeFilter(e, 'Coming Soon');
                                                }}
                                            />
                                            <span
                                                title="Coming Soon"
                                                className={`text-wrap ${isLoadingStores ? 'pointer-events-none' : 'hover:underline'} cursor-pointer`}
                                                onClick={() => {
                                                    toggleLocationTypeFilter({ target: { checked: isFilterSelected('Coming Soon') } }, 'Coming Soon');
                                                }}
                                            >
                                                Coming Soon
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className="md:border-b border-solid border-gray-400 mt-2" />
                    }

                    {/* Map */}
                    <div className="flex-[4] md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-3">
                        <LocationFinderMap
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            userLocation={userLocation}
                            stores={stores}
                            isFetchingStores={isLoadingStores}
                        />
                    </div>

                    {/* Legend */}
                    <MapLegend className="text-[0.7rem] xs:text-sm leading-[0.9] text-left text-black flex justify-between px-4 py-2 gap-6 md:absolute md:mr-6 left-[23rem] top-[110px] md:bg-white md:shadow-[2px_2px_8px_-2px_rgba(0,0,0,0.2)]" />

                    {/* Results */}
                    <div className="col-start-1 col-span-1 relative z-10 flex flex-col overflow-auto">
                        {isLoadingStores ?
                            <div className="text-left text-black px-4 xs:px-3 mt-3">Loading...</div> :
                            stores.length > 0 ?
                                <div className="flex flex-col">
                                    {stores.map((store) => (
                                        <div key={store.id} className={`cursor-pointer hover:bg-gray-100 ${selectedLocation?.id === store.id ? 'bg-gray-100' : ''}`}
                                            ref={(element) => locationRefs.current[store.id] = element}
                                            onClick={() => setSelectedLocation(store)}>
                                            <div className="flex flex-col py-3 md:my-0 px-4">
                                                <SummarizedLocationCard {...store} className="xs:px-12 md:px-0" />
                                            </div>
                                            <div className="border-t border-gray-400 mt-3" />
                                        </div>
                                    ))}
                                </div> :

                                <div className="text-left text-sm mt-3 px-4 xs:px-3 h-full">
                                    {
                                        !cityOrZipCode && !canAccessCurrentUserLocation ?
                                            <div>
                                                We cannot find your current location. Please search for a location above.
                                            </div> :
                                            <div>
                                                No locations found within 50 miles of your location
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                </div>

                <LocationsByStateBrowser states={states} isLoading={isLoadingStates} />
            </div>
        </>
    );

}

export default LocationFinder;