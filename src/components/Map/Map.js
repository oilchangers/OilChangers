import { GoogleMap, LoadScript, Marker, InfoWindow, OverlayView } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import SummarizedLocationCard from '../SummarizedLocationCard/SummarizedLocationCard';
import { DEFAULT_MAP_CENTER } from '../../utils/constants';

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
        <OverlayView
            position={position}
            mapPaneName={OverlayView.OVERLAY_LAYER}
        >
            <div className="absolute pointer-events-none -translate-x-1/2 -translate-y-full transform">
                {children}
            </div>
        </OverlayView>
    );
};


const Map = (props) => {
    const [locations, setLocations] = useState(props.stores);
    const [center, setCenter] = useState(DEFAULT_MAP_CENTER);
    const [markers, setMarkers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [zoom, setZoom] = useState(4);
    const [computingUserLocationCoordinates, setComputingUserLocationCoordinates] = useState(false);

    const legendHTML = `
    <div style="display: flex; gap: 12px; padding: 8px 1rem; background: white; box-shadow: 2px 2px 8px -2px rgba(0,0,0,0.2); font-family: sans-serif; font-size: 12px; margin: 24px;">
        <div style="display: flex; gap: 6px; align-items: center;">
            <img src="../../images/location_pin_yellow.png" alt="Oil Changers" width="12" />
            <span>Oil Changers</span>
        </div>

        <div style="display: flex; gap: 6px; align-items: center;">
            <img src="../../images/location_pin_grey.png" alt="OC & Car Wash" width="12" />
            <span>OC & Car Wash</span>
        </div>

        <div style="display: flex; gap: 6px; align-items: center;">
            <img src="../../images/location_pin_red.png" alt="OC + Repair" width="12" />
            <span>OC + Repair</span>
        </div>

        <div style="display: flex; gap: 6px; align-items: center;">
            <img src="../../images/location_pin_black.png" alt="Coming Soon" width="12" />
            <span>Coming Soon</span>
        </div>
    </div>
    `;

    const onLoad = useCallback(async (map) => {
        if (!map._legendInjected) {
            const legendDiv = document.createElement("div");
            legendDiv.innerHTML = legendHTML;
            map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(legendDiv);
            map._legendInjected = true;
        }

        setComputingUserLocationCoordinates(true);
        getCoordinatesFromAddress(props.selectedUserLocation).then((coordinates) => {
            if (coordinates) {
                setCenter(coordinates);
            }
        }).finally(() => {
            setComputingUserLocationCoordinates(false);
        })

    }, [legendHTML, props.selectedUserLocation]);


    useEffect(() => {
        if (props.stores) {
            setLocations(props.stores);
        }
    }, [props.stores]);

    useEffect(() => {
        setComputingUserLocationCoordinates(true);
        getCoordinatesFromAddress(props.selectedUserLocation)
            .then((coordinates) => {
                if (coordinates) {
                    setCenter(coordinates);
                    setZoom(11);
                }
            }).finally(() => {
                setComputingUserLocationCoordinates(false);
            });
    }, [props.selectedUserLocation]);


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
                    onClick={() => setSelectedLocation(location)}
                />
            }));
        }
    }, [locations]);

    const isDefaultLocation = (location) => {
        return location.lat === DEFAULT_MAP_CENTER.lat && location.lng === DEFAULT_MAP_CENTER.lng;
    }

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} >
            <GoogleMap
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
                {!!selectedLocation &&
                    <InfoWindow
                        position={{ lat: selectedLocation.coordinates.latitude, lng: selectedLocation.coordinates.longitude }}
                        onCloseClick={() => setSelectedLocation(null)}
                    >
                        <SummarizedLocationCard {...selectedLocation} className="py-2 px-1 text-[11px]" />
                    </InfoWindow>
                }

                {/* Display the user location pin */}
                {(center && !isDefaultLocation(center)) &&
                    < CustomDivMarker
                        position={center}
                    >
                        <div style={{ height: "20px", width: "20px", borderRadius: "50%", backgroundColor: "#008000", opacity: 0.5 }}>
                        </div>
                    </CustomDivMarker>
                }

                {/* Display an overlay when fetching stores or computing the user location coordinates */}
                {(props.isFetchingStores || computingUserLocationCoordinates) &&
                    <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none animate-fade-in" />
                }
            </GoogleMap>
        </LoadScript >
    );
};

export default Map;