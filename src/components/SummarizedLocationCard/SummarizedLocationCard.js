import React, { forwardRef } from 'react';
import PhoneIcon from '../Icons/PhoneIcon';
import LocationPinIcon from '../Icons/LocationPinIcon';
import DirectionIcon from '../Icons/DirectionIcon';
import ButtonLink from '../ButtonLink/ButtonLink';
import WaitTime from '../WaitTime/WaitTime';
import { kebabCase } from 'change-case';

const SummarizedLocationCard = forwardRef((props, ref) => {

    return (
        <div ref={ref} className={`flex flex-col gap-3 ${props?.className}`}>
            <div>
                <h1 className="uppercase text-left text-lg">{props.locationName}</h1>
                <div className="text-[0.625rem] text-left text-gray-500 font-text">{props.locationType}</div>
            </div>

            <div className="flex justify-between text-sm">
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

            <div className="flex items-center gap-4 text-[1rem]">
                <ButtonLink
                    href={`/locations/${props.state.toLowerCase()}/${props.city.toLowerCase()}/${kebabCase(props.addressLine1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2">
                    View Website
                </ButtonLink>
                <ButtonLink
                    href={`https://www.google.com/maps/dir/?api=1&destination=${props.addressLine1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2"
                >
                    Get Directions
                </ButtonLink>
            </div>
        </div >
    );
});

SummarizedLocationCard.displayName = 'SummarizedLocationCard';

export default SummarizedLocationCard;
