import styles from './Button.module.scss';
import React, { ElementType, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type ElementPropType<
  E extends ElementType,
  K extends keyof ComponentPropsWithoutRef<E>
> = ComponentPropsWithoutRef<E>[K];

type ButtonPropType<K extends keyof ComponentPropsWithoutRef<'button'>> =
  ElementPropType<'button', K>;

type CustomButtonProps = {
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: ButtonPropType<'type'>;
  variant?: 'basic' | 'primary' | 'danger';
  onClick?: ButtonPropType<'onClick'>;
  onFocus?: ButtonPropType<'onFocus'>;
  onBlur?: ButtonPropType<'onBlur'>;
  onMouseEnter?: ButtonPropType<'onMouseEnter'>;
  onMouseLeave?: ButtonPropType<'onMouseLeave'>;
  disabled?: ButtonPropType<'disabled'>;
  className?: string;
};

export const Button: React.FC<CustomButtonProps> = ({
  children,
  size = 'small',
  variant = 'basic',
  disabled,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[size],
        styles[variant],
        {
          [styles.disabled]: disabled,
        },
        className
      )}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
