import React, { forwardRef } from "react";

const MapLegend = forwardRef((props, ref) => {
    return (
        <div
            ref={ref}
            className={`flex gap-6 px-4 py-2 bg-white text-xs xs:text-sm font-sans ${props.className}`}
            {...props}
        >
            <div className="flex gap-1.5 items-center">
                <img src="../../images/location_pin_yellow.png" alt="Oil Changers" width={14} />
                <span>Oil Changers</span>
            </div>

            <div className="flex gap-1.5 items-center">
                <img src="../../images/location_pin_grey.png" alt="OC & Car Wash" width={14} />
                <span>OC & Car Wash</span>
            </div>

            <div className="flex gap-1.5 items-center">
                <img src="../../images/location_pin_red.png" alt="OC + Repair" width={14} />
                <span>OC + Repair</span>
            </div>

            <div className="flex gap-1.5 items-center">
                <img src="../../images/location_pin_black.png" alt="Coming Soon" width={14} />
                <span>Coming Soon</span>
            </div>
        </div>
    );
});

MapLegend.displayName = "MapLegend";

export default MapLegend;
