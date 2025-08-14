import React, { forwardRef } from 'react';
import PhoneIcon from '../Icons/PhoneIcon';
import LocationPinIcon from '../Icons/LocationPinIcon';
import DirectionIcon from '../Icons/DirectionIcon';
import ButtonLink from '../ButtonLink/ButtonLink';
import WaitTime from '../WaitTime/WaitTime';

const SummarizedLocationCard = forwardRef((props, ref) => {

    return (
        <div ref={ref} className={`flex flex-col gap-4 ${props?.className}`}>
            <div>
                <h1 style={{ fontSize: '1.5rem' }} className="uppercase text-left">{props.locationName}</h1>
                <div className="text-sm text-left text-gray-500 font-text">{props.locationType}</div>
            </div>

            <div className="flex gap-4 items-center justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-1">
                        <LocationPinIcon />
                        <div>{props.addressLine1}</div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <PhoneIcon />
                        <div>{props.phoneNumber ?? 'N/A'}</div>
                    </div>
                    <WaitTime waitTime={props.waitTime} />
                </div>

                <div className="flex flex-col items-center gap-1">
                    <DirectionIcon width="24px" height="24px" />
                    <div>{props.distanceFromUserLocation ?
                        `${props.distanceFromUserLocation.value.toFixed(2)} ${props.distanceFromUserLocation.unit}` :
                        'N/A'}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ButtonLink href={props.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                    View Website
                </ButtonLink>
                <ButtonLink href={`https://www.google.com/maps/dir/?api=1&destination=${props.addressLine1}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full"
                >
                    Get Directions
                </ButtonLink>
            </div>
        </div >
    );
});

SummarizedLocationCard.displayName = 'SummarizedLocationCard';

export default SummarizedLocationCard;
