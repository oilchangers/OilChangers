import React, { forwardRef, useState } from 'react';
import MagnifyingGlassIcon from '../Icons/MagnifyingGlassIcon';
import XIcon from '../Icons/XIcon';

const SearchBox = forwardRef((props, ref) => {

    return (
        <div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-sm p-1">
                <div className="pl-2 flex items-center justify-center">
                    <MagnifyingGlassIcon color="#808080" width="1.25rem" height="1.25rem" />
                </div>
                <input
                    ref={ref}
                    type="search"
                    className={`w-full outline-none py-2 pl-[0.25rem] pr-2 rounded-r-md placeholder:text-black ${props.className}`}
                    {...props}
                />

                {props.value && (
                    <div className="flex items-center justify-center pr-2">
                        <button
                            type="button"
                            onClick={() => props.onChange({ target: { value: '' } })}
                            className="flex items-center justify-center focus:outline-none active:outline-none"
                        >
                            <XIcon height="0.75rem" width="0.75rem" className="fill-gray-500 hover:fill-black" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
});

export default SearchBox;