import { useState, useEffect } from "react";

const breakpoints = {
    xs: 520,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

const useBreakPoint = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return Object.entries(breakpoints).reduce((acc, [key, value]) => {
        acc[key] = width >= value;
        return acc;
    }, {});
}

export default useBreakPoint;