"use client";

import ArrowIcon from "@/components/icons/ArrowIcon";
import styles from "./../products/FilterSection/FilterSection.module.css";
import { IoClose } from "react-icons/io5";
import { Option } from "@/types/Option";

type Props = {
  title: string;
  options: Option[];
  selectedId?: number;
  onSelect: (option: Option) => void;
  onClear: () => void;
  isOpen: boolean;
  toggle: () => void;
  isTwoColumn?: boolean;
};

export default function FilterItem({
  title,
  options,
  selectedId,
  onSelect,
  onClear,
  isOpen,
  toggle,
  isTwoColumn = false,
}: Props) {
  const selected = options.find(o => o.id === selectedId);

  return (
    <li className={styles.filterTitle} onClick={() => {
      if (!selected) toggle();
    }}>
      {selected ? (
        <span className={styles.badge} onClick={(e) => e.stopPropagation()}>
          {selected.name}
          <span
            className={styles.badgeClose}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
              toggle();
            }}
          >
            <IoClose size={20} color="black" className={styles.removeIcon} />
          </span>
        </span>
      ) : (
        <span>{title}</span>
      )}

      {!selected && <ArrowIcon isOpen={isOpen} />}

      {isOpen && (
        isTwoColumn ? (
          <div className={styles.brandDropdown} onClick={(e) => e.stopPropagation()}>
            <ul className={styles.column}>
              {options.slice(0, Math.ceil(options.length / 2)).map(option => (
                <li key={option.id} onClick={() => onSelect(option)}>
                  {option.name}
                </li>
              ))}
            </ul>
            <ul className={styles.column}>
              {options.slice(Math.ceil(options.length / 2)).map(option => (
                <li key={option.id} onClick={() => onSelect(option)}>
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
            {options.map(option => (
              <li key={option.id} onClick={() => onSelect(option)}>
                {option.name}
              </li>
            ))}
          </ul>
        )
      )}
    </li>
  );
}
