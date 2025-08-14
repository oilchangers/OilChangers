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

const DetailedLocationCard = ({ store, className }) => {

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

    return (
        <div className={`flex flex-col absolute w-[50%] justify-start border shadow-xl ${className}`}>
            <div className="flex">
                <div className="w-full border-r border-b border-solid border-gray-400 flex flex-col text-left justify-center p-3">
                    <h1 className="text-4xl uppercase">{store.locationName}</h1>
                    <div className="text-sm font-bold text-gray-400">{store.locationType}</div>
                </div>
                <div className="flex gap-5 items-center border-b border-solid border-gray-400 p-4">
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
                        <div className="text-[10px]">({store.rating.userRatingsTotal} Reviews)</div>
                    </div>
                </div>
            </div>

            <div className="flex w-full h-full overflow-y-hidden">
                <div className="flex flex-col w-full">
                    <div className="col-span-2 row-span-2 flex flex-col gap-4 border-r border-b border-solid  border-gray-400 pt-3 px-3 justify-center">
                        <p className="font-bold text-left">Location Details</p>
                        <div className="flex items-center gap-1">
                            <LocationPinIcon />
                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${store.addressLine1}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer hover:no-underline"
                            >
                                {store.addressLine1}
                            </a>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <PhoneIcon />
                            {store.phoneNumber ?
                                <a href={`tel:${store.phoneNumber}`} className="cursor-pointer hover:no-underline">{store.phoneNumber}</a> :
                                <div>N/A</div>
                            }
                        </div>

                        <WaitTime waitTime={store.waitTime} />

                        <div className="w-[50%]">
                            <ButtonLink href={`https://www.google.com/maps/dir/?api=1&destination=${store.addressLine1}`}
                                target="_blank" rel="noopener noreferrer"
                                className=""
                            >
                                Get Directions
                            </ButtonLink>
                        </div>

                    </div>

                    <div className="w-full border-r h-full border-solid border-gray-400 p-3">
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

                <div className="w-full h-full text-left p-3 overflow-y-auto">
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

        </div>
    )
}

export default DetailedLocationCard;