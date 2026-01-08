import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

type ButtonSize = 'sm' | 'small' | 'lg' | 'large' | 'medium' | null;
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'link';
type ButtonPosition = 'start' | 'end' | 'center' | null;

interface ButtonProps {
  size?: ButtonSize;
  outline?: boolean;
  variant?: ButtonVariant;
  block?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  link?: string;
  label: string;
  position?: ButtonPosition;
}

const sizeMap: Record<string, string | null> = {
  sm: 'sm',
  small: 'sm',
  lg: 'lg',
  large: 'lg',
  medium: null,
};

const positionMap: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
};

// Build the Button component with the specified props
const Button = ({
    size = null,
    outline = false,
    variant = 'primary',
    block = false,
    disabled = false,
    className,
    style,
    link,
    label,
    position = null
}: ButtonProps) => {
    const buttonSize = size ? sizeMap[size] : '';
    const sizeClass = buttonSize ? `button--${buttonSize}` : '';
    const outlineClass = outline ? 'button--outline' : '';
    const variantClass = variant ? `button--${variant}` : '';
    const blockClass = block ? 'button--block' : '';
    const disabledClass = disabled ? 'disabled' : '';
    // If the button is disabled, set the destination to undefined.
    const destination = disabled ? undefined : link;

    const button = (
        <Link to={destination}>
            <button
                className={clsx('button', sizeClass, outlineClass, variantClass, blockClass, disabledClass, className)}
                style={style}
                role="button"
                aria-disabled={disabled}
            >
                {label}
            </button>
        </Link>
    );

    if (position && position in positionMap) {
        return (
            <div style={{ display: 'flex', justifyContent: positionMap[position], gap: '10px' }}>
                {button}
            </div>
        );
    }

    return button;
};

export default Button;
