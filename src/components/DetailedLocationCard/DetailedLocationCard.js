import PhoneIcon from '../Icons/PhoneIcon';
import LocationPinIcon from '../Icons/LocationPinIcon';
import ButtonLink from '../ButtonLink/ButtonLink';
import { formatTime } from '../../utils/utils';
import OilChangeIcon from '../Icons/OilChangeIcon';
import StateInspectionsIcon from '../Icons/StateInspectionsIcon';
import CoolantFluidExchangeIcon from '../Icons/CoolantFluidExchangeIcon';
import TransmissionFluidExchangeIcon from '../Icons/TransmissionFluidExchangeIcon';
import GearBoxFluidExchangeIcon from '../Icons/GearBoxFluidIcon';
import CabinAirFilterReplacementIcon from '../Icons/CabinAirFilterReplacementIcon';
import WiperBladeReplacementIcon from '../Icons/WiperBladeReplacementIcon';
import CarWashIcon from '../Icons/CarWashIcon';
import AutoRepairIcon from '../Icons/AutoRepairIcon';
import BrakeServiceIcon from '../Icons/BrakeServiceIcon';
import HighMileageOilChangeIcon from '../Icons/HighMileageOilChangeIcon';
import WaitTime from '../WaitTime/WaitTime';
import Rating from "@mui/material/Rating";
import ClipLoader from "react-spinners/ClipLoader";
import { useMemo } from 'react';

const DetailedLocationCard = ({ store, className, isLoading }) => {

    const resolveServiceIcon = (service) => {
        // eslint-disable-next-line default-case
        switch (service) {
            case 'Oil Change Service':
                return <OilChangeIcon />;
            case 'High Mileage Motor Oil Change':
                return <HighMileageOilChangeIcon />;
            case 'State Inspection':
                return <StateInspectionsIcon />;
            case 'Coolant Fluid Exchange':
                return <CoolantFluidExchangeIcon />;
            case 'Transmission Fluid Exchange':
                return <TransmissionFluidExchangeIcon />;
            case 'Gear Box Fluid':
                return <GearBoxFluidExchangeIcon />;
            case 'Cabin Air Filter Replacement':
                return <CabinAirFilterReplacementIcon />;
            case 'Wiper Blade Replacement':
                return <WiperBladeReplacementIcon />;
            case '24 Hour Car Wash':
                return <CarWashIcon />;
            case 'Auto Repair':
                return <AutoRepairIcon />;
            case 'Brake Service':
                return <BrakeServiceIcon />;
        }
    }

    const isOpenToday = useMemo(() => {
        const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
        return store?.hours[today]?.open && store?.hours[today]?.close;
    }, [store?.hours]);

    return (
        <div className={`w-full ${className}`}>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[60vh]">
                    <ClipLoader color="#fcca46" loading={true} size={100} />
                </div>
            ) :
                (<div className={`grid grid-rows[auto_auto_auto_auto] grid-cols-[auto] lg:grid-cols-[auto_auto] w-full`}>
                    {/* Location Name and Rating */}
                    <div className="lg:col-span-2 flex border-b border-solid border-gray-400">
                        <div className="w-full border-r border-solid border-gray-400 flex flex-col text-left justify-center p-3">
                            <h1 className="text-[2.5rem] uppercase">{store.locationName}</h1>
                            <div className="text-[1.125rem] font-bold text-gray-400">{store.locationType}</div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-center gap-5 items-center border-solid  border-gray-400 p-4">
                            <div>
                                <img src="https://cloudbackend.scdn7.secure.raxcdn.com/img/upload/oilchangers-google_icon.png" width="57" height="19" alt="Google Icon" />
                                <div>
                                    Reviews
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">{store.rating.rating}</div>
                                <Rating
                                    name="read-only"
                                    value={store.rating.rating}
                                    precision={0.1}
                                    readOnly
                                    sx={{ color: "#fcca46", fontSize: "1rem" }}
                                />
                                <div className="text-[0.625rem]">({store.rating.userRatingsTotal} Reviews)</div>
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="row-start-2  lg:col-span-1 flex flex-col gap-4 border-r border-solid  border-gray-400 p-3 justify-center">
                        <p className="font-bold text-left">Location Details</p>
                        <div className="flex items-center gap-1">
                            <LocationPinIcon />
                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${store.addressLine1}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer hover:text-primary"
                            >
                                {store.addressLine1}
                            </a>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <PhoneIcon />
                            {store.phoneNumber ?
                                <a href={`tel:${store.phoneNumber}`} className="cursor-pointer hover:text-primary">{store.phoneNumber}</a> :
                                <div>N/A</div>
                            }
                        </div>

                        {isOpenToday && <WaitTime waitTime={store.waitTime} />}

                        <ButtonLink href={`https://www.google.com/maps/dir/?api=1&destination=${store.addressLine1}`}
                            target="_blank" rel="noopener noreferrer"
                            className="py-2 md:max-w-[25%] lg:max-w-[50%]"
                        >
                            Get Directions
                        </ButtonLink>

                    </div>

                    {/* Working Hours */}

                    <div className="col-start-1 row-start-3 lg:col-span-1 flex flex-col w-full border-t lg:border-r border-gray-400">
                        <div className="w-full h-full p-3">
                            <p className="font-bold text-left mb-2">Working Hours</p>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-left [&>tr:nth-child(even)]:bg-gray-100">
                                    {Object.entries(store.hours).map(([day, hours]) =>
                                        <tr key={day}>
                                            <td>
                                                {day}
                                            </td>
                                            <td className="text-right">
                                                {formatTime(hours.open)} - {formatTime(hours.close)}
                                            </td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Services */}

                    <div className="w-full h-full text-left p-3 overflow-y-auto col-start-1 row-start-4 lg:row-start-2 lg:row-span-2 lg:col-start-2 border-t lg:border-t-0 border-solid border-gray-400">
                        <p className="font-bold text-left mb-2">Services</p>
                        <ul className="flex flex-col gap-2">
                            {store.services.map(service =>
                                <li key={service} className="flex items-center gap-2">
                                    <div className="flex items-center justify-center p-1 w-8 h-8 rounded-full bg-[#fcca46]">
                                        {resolveServiceIcon(service)}
                                    </div>
                                    <span>{service}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                )}
        </div>
    )
}

export default DetailedLocationCard;