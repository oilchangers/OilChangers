import SearchBox from '../SearchBox/SearchBox';
import axios from 'axios';
import { useState } from 'react';
import LocationCard from '../LocationCard/LocationCard';
import Button from '../Button/Button';
import MyLocationIcon from '../Icons/MyLocationIcon';
import { STORE_API_BASE_URL } from '../../constants/apiConstants';

const LocationFinder = () => {
    const [stores, setStores] = useState([]);
    const [query, setQuery] = useState('');
    const [isFetchingStores, setIsFetchingStores] = useState(false);

    const handleSearch = async (query) => {
        setIsFetchingStores(true);
        await axios.get(`${STORE_API_BASE_URL}stores/search/${query}`, {
            headers: {
                'x-api-key': ''
            }
        }).then(response => {
            if (response.status === 200) {
                setStores(response.data);
            }
        }).catch(() => {
        }).finally(() => {
            setIsFetchingStores(false);
        });
    };

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center text-4xl uppercase font-bold">Find an Oil Changers</h1>
                        <div className="flex flex-col gap-2">
                            <SearchBox
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                                placeholder="Enter city or zip code"

                            />
                            <Button onClick={() => handleSearch(query)}>Find locations</Button>
                        </div>


                        <div className="flex items-center gap-2">
                            <MyLocationIcon width="1rem" height="1rem" />
                            <div className="underline cursor-pointer">Use my current location</div>
                        </div>
                    </div>

                    <div>
                        <div class="border-t border-gray-400 mb-3"></div>

                        <div className="text-left font-bold mb-2">Filter locations</div>

                        <div className="flex flex-wrap items-center justify-between gap-5">
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="oil-changers" class="w-4 h-4" />
                                <label htmlFor="oil-changers">Oil Changers</label>
                            </div>

                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="oil-changers-plus-repair" class="w-4 h-4" />
                                <label htmlFor="oil-changers-plus-repair">Oil Changers + Repair</label>
                            </div>

                            <div className="flex gap-2 items-center">
                                <input type="checkbox" name="car-wash" class="w-4 h-4" />
                                <label htmlFor="car-wash">Car Wash</label>
                            </div>

                            <div className="flex items-center justify-start gap-2">
                                <input type="checkbox" name="coming-soon" class="w-4 h-4" />
                                <label htmlFor="coming-soon">Coming Soon</label>
                            </div>
                        </div>

                        <div class="border-t border-gray-400 mt-3"></div>
                    </div>
                </div>


                {isFetchingStores ?
                    <div className="text-left px-3 mt-3">Loading...</div> :
                    stores.length > 0 ?
                        <div className="flex flex-col gap-2 overflow-y-scroll max-h-[500px]">
                            {stores.map((store) => (
                                <div>
                                    <div className="m-3">
                                        <LocationCard key={store.id} {...store} className="px-3" />

                                    </div>
                                    <div class="border-t border-gray-400 mt-3" />
                                </div>
                            ))}
                        </div> :
                        <div className="text-left text-sm mt-3 text-gray-500 px-3">
                            No locations found within 50 miles of your location
                        </div>
                }
            </div>
        </div >
    );
};

export default LocationFinder;