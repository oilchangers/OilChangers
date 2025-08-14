import { GoogleMap, LoadScript, InfoWindow, OverlayView, Marker } from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import LocationCard from '../SummarizedLocationCard/SummarizedLocationCard';
import { GOOGLE_MAPS_API_KEY } from '../../constants/apiConstants';

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

const GenericMap = ({ locations, center, showLegend = false, canBeInteractedWith = true, showCenterMarker = true }) => {
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [zoom, setZoom] = useState(12);
    const legendRef = useRef(null);

    const onLoad = useCallback(async (map) => {
        // if (!map._legendInjected) {
        //     const legendDiv = document.createElement("div");
        //     legendDiv.innerHTML = legendHTML;
        //     map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(legendDiv);
        //     map._legendInjected = true;

        // }

    }, [legendHTML]);

    useEffect(() => {
        if (locations && locations.length > 0) {
            setMarkers(locations.map((location) => {
                let markerIcon = "/images/location_pin_yellow.png";

                switch (location.locationType) {
                    case "Oil Changers":
                        markerIcon = "/images/location_pin_yellow.png";
                        break;
                    case "Oil Changer + Repair":
                        markerIcon = "/images/location_pin_red.png";
                        break;
                    case "Oil Changers & Car Wash":
                        markerIcon = "/images/location_pin_grey.png";
                        break;
                    case "Coming Soon":
                        markerIcon = "/images/location_pin_black.png";
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
                    icon={{
                        url: markerIcon
                    }}
                    onClick={() => setSelectedLocation(location)}
                />
            }));
        }
    }, [locations]);

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} >
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
                    gestureHandling: canBeInteractedWith ? "auto" : "none",
                    zoomControl: false,
                    draggable: canBeInteractedWith,
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
                        <LocationCard {...selectedLocation} className="py-2 px-1 text-[11px]" />
                    </InfoWindow>
                }

                {/* Display the user location pin */}
                {(center && showCenterMarker) &&
                    < CustomDivMarker
                        position={center}
                    >
                        <div style={{ height: "20px", width: "20px", borderRadius: "50%", backgroundColor: "#008000", opacity: 0.5 }}>
                        </div>
                    </CustomDivMarker>
                }

                {/* Display an overlay when fetching stores or computing the user location coordinates */}
                {(!canBeInteractedWith) &&
                    <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none animate-fade-in" />
                }

                {showLegend &&
                    <div id="legend" ref={legendRef} >
                        {legendHTML}
                    </div>}
            </GoogleMap>
        </LoadScript >
    );
}

export default GenericMap;