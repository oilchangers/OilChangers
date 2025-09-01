import ClipLoader from "react-spinners/ClipLoader";
import useBreakPoint from "../../utils/hooks/useBreakPointHook";
import { useEffect, useState } from "react";
import { gridClass } from "../../utils/utils";

const LocationsByStateBrowser = ({ states, isLoading }) => {
    const [numberOfColumns, setNumberOfColumns] = useState(1);
    const [numberOfRows, setNumberOfRows] = useState(1);
    const breakpoint = useBreakPoint();

    useEffect(() => {
        let columns;
        if (breakpoint === "xs") {
            columns = 1;
            setNumberOfColumns(columns);
        }
        if (breakpoint === "sm") {
            columns = 2;
            setNumberOfColumns(columns);
        }
        if (breakpoint === "md") {
            columns = 3;
            setNumberOfColumns(columns);
        }
        if (breakpoint === "lg") {
            columns = 4;
            setNumberOfColumns(columns);
        }
        if (breakpoint === "xl") {
            columns = 4;
            setNumberOfColumns(columns);
        }
        if (breakpoint === "2xl") {
            columns = 4;
            setNumberOfColumns(columns);
        }
        setNumberOfRows(Math.ceil(states.length / columns));
    }, [breakpoint, states, numberOfColumns]);

    return (
        <section className="flex flex-col gap-12 py-[100px] px-6 justify-center items-center shadow-[0_-4px_8px_rgba(0,0,0,0.15)]">
            <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[3.755rem] uppercase">Browse locations by state</h1>
            {isLoading ?
                <div className="flex justify-center items-center">
                    <ClipLoader color="#fcca46" loading={isLoading} size={100} />
                </div> :
                <ul className={`grid grid-flow-col ${gridClass("grid-cols", numberOfColumns, 5)} ${gridClass("grid-rows", numberOfRows, 10)} grid-flow-row gap-y-2 px-6 xl:px-96 w-full text-base font-semibold`}>
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
        </section>
    )
}

export default LocationsByStateBrowser;