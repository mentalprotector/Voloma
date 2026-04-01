import type { Route } from "next";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface SharedProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    SharedProps {
  href?: undefined;
}

interface ButtonAsLinkProps extends SharedProps {
  href: Route;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function getClassName(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const resolvedClassName = getClassName(variant, size, className);

  if ("href" in props && props.href) {
    return (
      <Link className={resolvedClassName} href={props.href} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={resolvedClassName} type="button" {...props}>
      {children}
    </button>
  );
}
