// src/components/button.tsx
import React from 'react';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: 'solid' | 'outline';
    onClick?: () => void;
    icon?: React.ElementType;
    disabled?: boolean;
    [x: string]: any;
}

const Button: React.FunctionComponent<Props> = (props) => {
    const {
        variant = 'outline',
        onClick,
        icon: Icon,
        disabled = false,
        children,
        ...rest
    } = props;

    const baseStyles = 'px-16 py-2 rounded text-sm flex items-center';
    const solidStyles = 'bg-blue-500 text-white';
    const outlineStyles = 'border border-blue-500 text-blue-500';
    const buttonStyles = variant === 'solid' ? solidStyles : outlineStyles;

    return (
        <button
            className={`${baseStyles} ${buttonStyles}`}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {Icon && <Icon className="mr-2" />}
            {children}
        </button>
    );
}

export default Button;