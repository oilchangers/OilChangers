import Tooltip from "../Tooltip/Tooltip";
import InfoIcon from "../Icons/InfoIcon";
import ClockIcon from "../Icons/ClockIcon";

const WaitTime = (props) => {
    const getAvailabilityColor = (availability) => {
        switch (availability) {
            case 'Available':
                return 'text-green-600';
            case 'LittleToNoWait':
                return 'text-[#f2c31a]';
            case 'ModerateWait':
                return 'text-orange-400';
            case 'Busy':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getAvailabilityText = (availability) => {
        if (!availability) return '';

        // Insert a space before each capital letter (except the first one)
        const spaced = availability.replace(/([A-Z])/g, ' $1').trim();

        // Lowercase the whole string and capitalize the first letter
        return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
    }

    return (
        <div className="flex items-center gap-1.5">
            <ClockIcon />
            <div className={`${getAvailabilityColor(props.waitTime.availabilityStatus)} capitalize font-bold`}>
                {getAvailabilityText(props.waitTime.availabilityStatus)}
            </div>
            {props.waitTime.availabilityStatus === "Available" &&
                <Tooltip title="The location has an open bay and is ready to service your vehicle.">
                    <div>
                        <InfoIcon />
                    </div>
                </Tooltip>
            }
            {props.waitTime.availabilityStatus === "Indeterminate" &&
                <Tooltip title="The location availability is unknown.">
                    <div>
                        <InfoIcon />
                    </div>
                </Tooltip>
            }
            {props.waitTime.availabilityStatus === "Busy" &&
                <Tooltip title={`The location is currently busy. You will need to wait up to ${props.waitTime.maxWaitTimeMinutes} minutes.`}>
                    <div>
                        <InfoIcon />
                    </div>
                </Tooltip>
            }
            {props.waitTime.availabilityStatus !== "Available" &&
                props.waitTime.availabilityStatus !== "Indeterminate" &&
                props.waitTime.availabilityStatus !== "Busy" &&
                <Tooltip title={`Wait time is ${props.waitTime.minWaitTimeMinutes} to ${props.waitTime.maxWaitTimeMinutes} minutes.`}>
                    <div>
                        <InfoIcon />
                    </div>
                </Tooltip>
            }
        </div>
    );
}

export default WaitTime;