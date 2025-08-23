import ClipLoader from "react-spinners/ClipLoader";

const LocationsByStateBrowser = ({ states, isLoading }) => {

    return (
        <div className="p-[100px] flex flex-col gap-12 justify-center items-center shadow-[5px_2px_5px_2px_rgba(0,0,0,0.6)]">
            <h1 className="text-5xl uppercase">Browse locations by state</h1>
            {isLoading ?
                <div className="w-[70%] flex justify-center items-center">
                    <ClipLoader color="#fcca46" loading={isLoading} size={100} />
                </div> :
                <div className="w-[70%] font-avenir-condensed font-semibold">
                    <ul className={`grid grid-cols-4 grid-rows-5 grid-flow-col gap-y-2`}>
                        {states.map((state) => (
                            <div className="flex justify-center items-center w-full pb-1 border-b border-gray-300">
                                <li
                                    key={state.code}
                                    className={`flex text-sm text-center}`}
                                >
                                    <a
                                        className="hover:underline hover:text-primary"
                                        href={`locations/${state.code.toLowerCase()}`}>
                                        {state.name}
                                    </a>
                                </li>
                            </div>
                        ))}
                    </ul>

                </div>}
        </div>
    )
}

export default LocationsByStateBrowser;