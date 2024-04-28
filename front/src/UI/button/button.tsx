import React, { forwardRef } from "react";
import { Button } from "react-bootstrap";
import "./button.scss";

interface OutlineButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const OutlineButton = forwardRef<HTMLButtonElement, OutlineButtonProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <Button
        className={`btn__outline btn ${className}`}
        {...restProps}
        ref={ref}
      >
        {children}
      </Button>
    );
  }
);

export const OutlineButtonWidth: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <Button className={`btn__outline btn w-100 ${className}`} {...restProps}>
      {children}
    </Button>
  );
};

export const OutlineButtonSubmit: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <Button className={`submit-btn btn ${className}`} {...restProps}>
      {children}
    </Button>
  );
};

export const OutlineButtonDanger: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <Button className={`danger-btn btn ${className}`} {...restProps}>
      {children}
    </Button>
  );
};

