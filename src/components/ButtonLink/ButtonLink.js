import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../Button/ButtonBase.css';

const ButtonLink = forwardRef(({
    href,
    children,
    variant = 'primary',
    className = '',
    onClick,
    ...props
}, ref) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;

    const buttonClasses = [
        baseClass,
        variantClass,
        className
    ].filter(Boolean).join(' ');

    const handleClick = (event) => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <a
            ref={ref}
            href={href}
            className={buttonClasses}
            onClick={handleClick}
            {...props}
        >
            {children}
        </a>
    );
});

ButtonLink.displayName = 'ButtonLink';

ButtonLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtonLink; 