import React from 'react';
import FacebookIcon from '../Icons/FacebookIcon';
import InstagramIcon from '../Icons/InstagramIcon';

function Header() {
    return (
        <div className="flex flex-col gap-5 pb-3 pt-3 md:pt-0  bg-white border-b-[1px] border-solid border-b-gray-300 shadow-[0px_0px_0.5px_0.5px_rgba(0,0,0,0.1)]">
            <div className="hidden md:block bg-[#232323]">
                <div className="flex w-full justify-between items-center max-h-fit py-2 px-5  lg:max-w-[80%] xl:max-w-[60%] mx-auto">
                    <div className="text-[#fcca46] text-[0.9rem] font-semibold">We are open 7 days a week, no appointment necessary!</div>
                    <div className="flex gap-5 items-center">
                        <div className="flex gap-2 items-center">
                            <a
                                href="https://facebook.com/oilchangersnearme"
                                className="bg-[#fcca46] hover:bg-white pl-[0.2rem] pt-[0.2rem] max-h-fit rounded-sm flex justify-end"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FacebookIcon width="0.71rem" height="0.72rem" className="fill-black" />
                            </a>
                            <a
                                href="https://www.instagram.com/oilchangers/?hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <InstagramIcon className="fill-[#fcca46] hover:fill-white" />
                            </a>
                        </div>
                        <a href="/contact" className="uppercase text-[#fcca46] hover:text-white text-[0.9rem] font-medium">
                            Contact
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center my-1 md:mt-0 pl-3 text-gray-600 font-avenir-condensed">
                <a href="/">
                    <img
                        src="https://cloudbackend.scdn7.secure.raxcdn.com/img/upload/oilchangers-big2x.png"
                        height="6.8rem"
                        width="200rem"
                        alt="Oil Changers Logo"
                    />
                </a>
            </div>
        </div>
    )
}
export default Header;