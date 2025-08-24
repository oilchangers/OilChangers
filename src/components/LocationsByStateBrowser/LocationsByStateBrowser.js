import ClipLoader from "react-spinners/ClipLoader";
import useBreakPoint from "../../utils/hooks/useBreakPointHook";
import { useEffect, useState } from "react";

const LocationsByStateBrowser = ({ states, isLoading }) => {
    const [numberOfColumns, setNumberOfColumns] = useState(1);
    const [numberOfRows, setNumberOfRows] = useState(states.length ?? 0);
    const breakpoint = useBreakPoint();

    useEffect(() => {
        let columns;
        if (breakpoint.xs) {
            columns = 2;
            setNumberOfColumns(columns);
        }
        setNumberOfRows(Math.ceil(states.length / columns));
    }, [breakpoint, states, numberOfColumns]);

    return (
        <div className="flex flex-col gap-12 py-[100px] px-3 justify-center items-center shadow-[0_-4px_8px_rgba(0,0,0,0.15)]">
            <h1 className="text-[2.5rem] uppercase">Browse locations by state</h1>
            {isLoading ?
                <div className="flex justify-center items-center">
                    <ClipLoader color="#fcca46" loading={isLoading} size={100} />
                </div> :
                <ul className={`grid grid-cols-${numberOfColumns} grid-rows-${numberOfRows} grid-flow-row gap-y-2 w-full px-3 font-avenir-condensed font-semibold`}>
                    {states.map((state) => (
                        <li
                            key={state.code}
                            className="flex justify-center w-full pb-1 border-b border-gray-300"
                        >
                            <a
                                className="hover:underline hover:text-primary text-center"
                                href={`locations/${state.code.toLowerCase()}`}>
                                {state.name}
                            </a>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default LocationsByStateBrowser;