import { Chip } from "@/components/ui/Chip";

import styles from "./option-selector.module.css";

interface SelectorOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface OptionSelectorProps {
  title: string;
  description?: string;
  options: SelectorOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export function OptionSelector({
  title,
  description,
  options,
  selectedValue,
  onChange,
}: OptionSelectorProps) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{title}</legend>
      {description ? <p className={styles.description}>{description}</p> : null}
      <div className={styles.options}>
        {options.map((option) => (
          <Chip
            key={option.value}
            active={option.value === selectedValue}
            ariaLabel={`${title}: ${option.label}`}
            disabled={option.disabled}
            label={option.label}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}

