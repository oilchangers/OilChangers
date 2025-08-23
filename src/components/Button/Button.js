import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './ButtonBase.css';

const Button = forwardRef(({
    children,
    variant = 'primary',
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    ...props
}, ref) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;

    const buttonClasses = [
        baseClass,
        variantClass
    ].filter(Boolean).join(' ');

    const handleClick = (event) => {
        if (onClick && !disabled) {
            onClick(event);
        }
    };

    return (
        <button
            ref={ref}
            type={type}
            className={`${buttonClasses} ${className}`}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
};

export default Button;
