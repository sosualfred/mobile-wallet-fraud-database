import React from 'react';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: 'solid' | 'outline';
    onClick?: () => void;
    icon?: React.ElementType;
    disabled?: boolean;
    className?: string;
    [x: string]: any;
}

const Button: React.FunctionComponent<Props> = (props) => {
    const {
        variant = 'outline',
        onClick,
        icon: Icon,
        disabled = false,
        children,
        className = '',
        ...rest
    } = props;

    const baseStyles = 'px-4 py-2 rounded text-sm flex items-center justify-center w-full sm:w-auto';
    const solidStyles = 'bg-blue-500 text-white hover:bg-blue-600';
    const outlineStyles = 'border border-blue-500 text-blue-500 hover:bg-blue-50';
    const buttonStyles = variant === 'solid' ? solidStyles : outlineStyles;

    return (
        <button
            className={`${baseStyles} ${buttonStyles} ${className}`}
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