import React, { forwardRef, useState } from 'react';
import MagnifyingGlassIcon from '../Icons/MagnifyingGlassIcon';
import XIcon from '../Icons/XIcon';

const SearchBox = forwardRef((props, ref) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div ref={ref} {...props}>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
                <div className="pl-2 flex items-center justify-center">
                    <MagnifyingGlassIcon color="#808080" width="1.25rem" height="1.25rem" />
                </div>
                <input
                    type="search"
                    placeholder="Enter city or zip code"
                    className="w-full outline-none py-1 pl-[0.25rem] pr-0 rounded-r-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <div className="pr-2 flex items-center justify-center">
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="flex items-center justify-center focus:outline-none active:outline-none"
                        >
                            <XIcon color="#000000" width="0.75rem" height="0.75rem" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
});

export default SearchBox;