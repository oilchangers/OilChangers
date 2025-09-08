import { GoogleMap, LoadScript, Marker, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { useState, useEffect, useCallback, useRef } from 'react';
import { DEFAULT_MAP_CENTER } from '../../utils/constants';
import LocationInfoWindow from '../SummarizedLocationCard/LocationInfoWindow';

const containerStyle = {
    width: '100%',
    height: '100%'
};


const lightGrayStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }
];

const CustomDivMarker = ({ position, children }) => {
    return (
        <OverlayViewF
            position={position}
            mapPaneName={OverlayView.MARKER_LAYER}
        >
            <div className="absolute pointer-events-none -translate-x-1/2 -translate-y-full transform">
                {children}
            </div>
        </OverlayViewF>
    );
};


const LocationFinderMap = (props) => {
    const [locations, setLocations] = useState(props.stores);
    const [center, setCenter] = useState(DEFAULT_MAP_CENTER);
    const [markers, setMarkers] = useState([]);
    const [zoom, setZoom] = useState(4);
    const [computingUserLocationCoordinates, setComputingUserLocationCoordinates] = useState(false);
    const mapRef = useRef(null);

    const onLoad = useCallback(async (map) => {
        try {
            mapRef.current = map;

            setComputingUserLocationCoordinates(true);
            getCoordinatesFromAddress(props.userLocation).then((coordinates) => {
                if (coordinates) {
                    setCenter(coordinates);
                }
            }).finally(() => {
                setComputingUserLocationCoordinates(false);
            })
        }
        catch (ignore) {
        }

    }, [props.userLocation]);

    useEffect(() => {
        if (props.stores) {
            setLocations(props.stores);
        }
    }, [props.stores]);

    useEffect(() => {
        setComputingUserLocationCoordinates(true);
        getCoordinatesFromAddress(props.userLocation)
            .then((coordinates) => {
                if (coordinates) {
                    setCenter(coordinates);
                    setZoom(11);
                }
            }).finally(() => {
                setComputingUserLocationCoordinates(false);
            });
    }, [props.userLocation]);

    function getCoordinatesFromAddress(address) {
        // Check if Google Maps is loaded
        if (typeof window.google === 'undefined' || typeof window.google.maps?.Geocoder !== 'function' || !address) {
            return Promise.resolve(null);
        }

        const geocoder = new window.google.maps.Geocoder();

        return new Promise((resolve) => {
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results[0]) {
                    resolve(results[0].geometry.location);
                }
                else {
                    resolve(null);
                }
            });
        });
    }

    useEffect(() => {
        if (locations) {
            setMarkers(locations.map((location) => {
                let markerColor = "../images/location_pin_yellow.png";

                switch (location.locationType) {
                    case "Oil Changers":
                        markerColor = "../images/location_pin_yellow.png";
                        break;
                    case "Oil Changer + Repair":
                        markerColor = "../images/location_pin_red.png";
                        break;
                    case "Oil Changers & Car Wash":
                        markerColor = "../images/location_pin_grey.png";
                        break;
                    case "Coming Soon":
                        markerColor = "../images/location_pin_black.png";
                        break;
                    default:
                        // Keep the default yellow dot
                        break;
                }

                return <Marker
                    key={location.id}
                    position={{
                        lat: location.coordinates.latitude,
                        lng: location.coordinates.longitude
                    }}
                    icon={{ url: markerColor }}
                    scaledSize={new window.google.maps.Size(40, 51)}
                    onClick={() => props.setSelectedLocation(location)}
                />
            }));
        }
    }, [locations]);

    useEffect(() => {
        if (!props.selectedLocation) {
            return;
        }

        if (mapRef.current) {
            mapRef.current.panTo({
                lat: props.selectedLocation.coordinates.latitude,
                lng: props.selectedLocation.coordinates.longitude
            })
            mapRef.current.panBy(0, -100);
        }
        else {
            // If the map is not loaded fall back to setting the center of the map to the location
            setCenter({
                lat: props.selectedLocation.coordinates.latitude,
                lng: props.selectedLocation.coordinates.longitude
            })
        }
    }, [props.selectedLocation]);

    const isDefaultLocation = (location) => {
        return location.lat === DEFAULT_MAP_CENTER.lat && location.lng === DEFAULT_MAP_CENTER.lng;
    }

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} >
            <GoogleMap
                id="map"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                options={{
                    styles: lightGrayStyle,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    zoomControlOptions: {
                        position: 23
                    },
                    gestureHandling: props.isFetchingStores ? "none" : "auto",
                    zoomControl: false,
                    draggable: !props.isFetchingStores,
                    cameraControlOptions: {
                        position: 20
                    },
                    streetViewControl: false,
                    keyboardShortcuts: false
                }}
                onLoad={onLoad}
            >
                {/* Display the markers for the stores */}
                {markers}

                {/* Display the info window for the selected location */}
                {!!props.selectedLocation &&
                    <OverlayViewF
                        className="h-fit w-fit p-4"
                        position={{ lat: props.selectedLocation.coordinates.latitude, lng: props.selectedLocation.coordinates.longitude }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div className="hidden md:block">
                            <LocationInfoWindow
                                onClose={() => props.setSelectedLocation(null)}
                                {...props.selectedLocation}
                                className="px-1 text-xs pt-0 max-w-[20rem]" />
                        </div>

                    </OverlayViewF>
                }

                {/* Display the user location pin */}
                {(center && !isDefaultLocation(center)) &&
                    < CustomDivMarker
                        position={center}
                    >
                        <div className="bg-[#008000] h-[20px] w-[20px] rounded-full opacity-50" />
                    </CustomDivMarker>
                }

                {/* Display an overlay when fetching stores or computing the user location coordinates */}
                {(props.isFetchingStores || computingUserLocationCoordinates) &&
                    <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none animate-fade-in" />
                }
            </GoogleMap>
        </LoadScript>
    );
};

export default LocationFinderMap;