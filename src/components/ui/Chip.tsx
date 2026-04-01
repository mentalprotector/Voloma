import styles from "./chip.module.css";

interface ChipProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export function Chip({ label, active, disabled, onClick, ariaLabel }: ChipProps) {
  return (
    <button
      aria-label={ariaLabel ?? label}
      aria-pressed={active}
      className={[styles.chip, active ? styles.active : "", disabled ? styles.disabled : ""]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
}

