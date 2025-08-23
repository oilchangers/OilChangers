import React, { forwardRef, useMemo } from 'react';
import PhoneIcon from '../Icons/PhoneIcon';
import LocationPinIcon from '../Icons/LocationPinIcon';
import DirectionIcon from '../Icons/DirectionIcon';
import ButtonLink from '../ButtonLink/ButtonLink';
import WaitTime from '../WaitTime/WaitTime';
import { kebabCase } from 'change-case';
import XIcon from '../Icons/XIcon';
import { formatTime } from '../../utils/utils';

const LocationInfoWindow = forwardRef((props, ref) => {
    const today = useMemo(
        () => new Date().toLocaleDateString("en-US", { weekday: "long" }),
        []
    );

    const isOpenToday = useMemo(() => {
        return props.hours[today]?.open;
    }, [props.hours, today]);

    return (
        <div
            ref={ref}
            className={`flex flex-col gap-3 w-[275px] bg-white relative px-3 pb-3 pt-2 bottom-[55px] shadow-[0_3px_10px_-2px_rgba(0,0,0,0.6)] transform -translate-x-1/2 -translate-y-full ${props?.className}`}>
            <div className="flex flex-col justify-end gap-0">
                <div className="flex justify-end">
                    <button
                        title="Close"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onClose();
                        }}
                        className=":active:outline-none :focus:outline-none justify-self-start"
                    >
                        <XIcon height="1rem" width="1rem" className="pb-1 fill-gray-500 hover:fill-black" />
                    </button>
                </div>
                <div className="flex justify-between gap-2">
                    <h1 className="uppercase text-left text-sm text-wrap">{props.locationName}</h1>

                </div>
                <div className="text-[0.625rem] text-left text-gray-500 font-text">{props.locationType}</div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-1">
                                <LocationPinIcon height="0.625rem" width="0.625rem" />
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${props.addressLine1}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="hover:underline hover:text-primary"
                                >
                                    {props.addressLine1}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <PhoneIcon height="0.625rem" width="0.625rem" />
                            {props.phoneNumber ?
                                <a href={`tel:${props.phoneNumber}`}
                                    className="hover:underline hover:text-primary"
                                >
                                    {props.phoneNumber}
                                </a> :
                                <div>N/A</div>
                            }
                        </div>

                        <WaitTime waitTime={props.waitTime} />
                    </div>

                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${props.addressLine1}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center hover:no-underline hover:text-black">
                        <DirectionIcon width="1.25rem" height="1.25rem" />
                        <div>{props.distanceFromUserLocation ?
                            `${props.distanceFromUserLocation.value.toFixed(2)} ${props.distanceFromUserLocation.unit}` :
                            'N/A'}
                        </div>
                    </a>

                </div>

                <div className="text-sm text-left">
                    {isOpenToday ?
                        <div>
                            Open today from {formatTime(props.hours[today].open)} - {formatTime(props.hours[today].close)}
                        </div> :
                        <div>
                            Closed
                        </div>
                    }
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ButtonLink
                    href={`/locations/${props.state.toLowerCase()}/${props.city.toLowerCase()}/${kebabCase(props.addressLine1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1">
                    View Website
                </ButtonLink>
                <ButtonLink
                    href={`https://www.google.com/maps/dir/?api=1&destination=${props.addressLine1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1"
                >
                    Get Directions
                </ButtonLink>
            </div>

            <div
                className="absolute left-[46%] top-[99%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"
            />
        </div>
    );
});

export default LocationInfoWindow;
