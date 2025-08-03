import SearchBox from '../SearchBox/SearchBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LocationCard from '../LocationCard/LocationCard';
import Button from '../Button/Button';
import MyLocationIcon from '../Icons/MyLocationIcon';
import { STORE_API_BASE_URL, STORE_API_KEY } from '../../constants/apiConstants';
import Map from '../Map/Map';

const LocationFinder = () => {
    const [stores, setStores] = useState([]);
    const [cityOrZipCode, setCityOrZipCode] = useState('');
    const [isFetchingStores, setIsFetchingStores] = useState(false);
    const [selectedLocationTypes, setSelectedLocationTypes] = useState([]);
    const [locationTypesQueryParamsString, setLocationTypesQueryParamsString] = useState([]);
    const [canAccessCurrentUserLocation, setCanAccessCurrentUserLocation] = useState(false);
    const [search, setSearch] = useState(false);
    const [selectedUserLocation, setSelectedUserLocation] = useState('');
    const [isCurrentLocationSelectionVisible, setIsCurrentLocationSelectionVisible] = useState(true);
    const [hasUserRequestedCurrentLocation, setHasUserRequestedCurrentLocation] = useState(false);

    const handleSearch = async (cityOrZipCode) => {
        if (!cityOrZipCode) {
            return;
        }

        setIsFetchingStores(true);

        let url = `${STORE_API_BASE_URL}stores?cityOrZipCode=${cityOrZipCode}${locationTypesQueryParamsString}`;

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
            url = `${STORE_API_BASE_URL}stores?cityOrZipCode=${cityOrZipCode}${locationTypesQueryParamsString}`;
        }
        else {
            url = `${STORE_API_BASE_URL}stores${locationTypesQueryParamsString}`;
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
                if (hasUserRequestedCurrentLocation) {
                    setIsCurrentLocationSelectionVisible(false);
                }
            });
    }

    return (
        <div className="flex w-[100vw] h-[100vh]" >
            <div className="flex flex-col shadow-black shadow-md w-[20%]">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center text-4xl uppercase font-bold">Find an Oil Changers</h1>
                        <div className="flex flex-col gap-2 px-5">
                            <SearchBox
                                onChange={(e) => setCityOrZipCode(e.target.value)}
                                value={cityOrZipCode}
                                placeholder="Enter city or zip code"

                            />
                            <Button onClick={() => {
                                handleSearch(cityOrZipCode);
                                setSearch(true);
                            }}>Find locations</Button>
                        </div>


                        {isCurrentLocationSelectionVisible &&
                            <div className="flex items-center gap-2 px-5">
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

                    <div>
                        <div className="border-t border-gray-400 mb-3"></div>

                        <div className="text-left font-bold mb-2 px-5">Filter locations</div>

                        <div className="flex flex-wrap items-center justify-between gap-5 px-5">
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="oil-changers" className="w-4 h-4" onChange={(e) => handleGetStoresByLocationType(e, 'Oil Changers')} />
                                <label htmlFor="oil-changers">Oil Changers</label>
                            </div>

                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="oil-changers-plus-repair" className="w-4 h-4" onChange={(e) => handleGetStoresByLocationType(e, 'Oil Changers + Repair')} />
                                <label htmlFor="oil-changers-plus-repair">Oil Changers + Repair</label>
                            </div>

                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="car-wash" className="w-4 h-4" onChange={(e) => handleGetStoresByLocationType(e, 'Oil Changers & Car Wash')} />
                                <label htmlFor="car-wash">Car Wash</label>
                            </div>

                            <div className="flex items-center justify-start gap-2">
                                <input type="checkbox" name="coming-soon" className="w-4 h-4" onChange={(e) => handleGetStoresByLocationType(e, 'Coming Soon')} />
                                <label htmlFor="coming-soon">Coming Soon</label>
                            </div>
                        </div>

                        <div className="border-t border-gray-400 mt-3"></div>
                    </div>
                </div>

                {isFetchingStores ?
                    <div className="text-left px-3 mt-3">Loading...</div> :
                    stores.length > 0 ?
                        <div className="flex flex-col gap-2 overflow-y-scroll max-h-[500px]">
                            {stores.map((store) => (
                                <div key={store.id}>
                                    <div className="m-3 px-4">
                                        <LocationCard {...store} className="px-3" />
                                    </div>
                                    <div className="border-t border-gray-400 mt-3" />
                                </div>
                            ))}
                        </div> :
                        !cityOrZipCode && !canAccessCurrentUserLocation ?
                            <div className="text-left text-sm mt-3 text-gray-500 px-3">
                                We cannot find your current location. Please search for a location above.
                            </div> :
                            <div className="text-left text-sm mt-3 text-gray-500 px-3">
                                No locations found within 50 miles of your location
                            </div>
                }
            </div>

            <Map selectedUserLocation={selectedUserLocation} stores={stores} isFetchingStores={isFetchingStores} />
        </div >
    );

}

export default LocationFinder;