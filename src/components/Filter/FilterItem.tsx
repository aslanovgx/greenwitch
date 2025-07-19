"use client";

import ArrowIcon from "@/components/icons/ArrowIcon";
import styles from "./../products/FilterSection/FilterSection.module.css";
import { IoClose } from "react-icons/io5";

type Props = {
    title: string;
    options: string[];
    selected: string | undefined;
    onSelect: (value: string) => void;
    onClear: () => void;
    isOpen: boolean;
    toggle: () => void;
    isTwoColumn?: boolean;
};

export default function FilterItem({
    title,
    options,
    selected,
    onSelect,
    onClear,
    isOpen,
    toggle,
    isTwoColumn = false,
}: Props) {
    return (
        <li className={styles.filterTitle} onClick={() => {
            if (!selected) toggle();
        }}>
            {selected ? (
                <span className={styles.badge} onClick={(e) => e.stopPropagation()}>
                    {selected}
                    <span
                        className={styles.badgeClose}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClear();
                            toggle();
                        }}
                    >
                        <IoClose
                            size={20}
                            color="red"
                            className={styles.removeIcon}
                        />
                        {/* <Image
                            src="/assets/icons/remove.svg"
                            alt="remove icon"
                            width={16}
                            height={16}
                        /> */}
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
                                <li key={option} onClick={() => onSelect(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                        <ul className={styles.column}>
                            {options.slice(Math.ceil(options.length / 2)).map(option => (
                                <li key={option} onClick={() => onSelect(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <ul className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                        {options.map(option => (
                            <li key={option} onClick={() => onSelect(option)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                )
            )}

        </li>
    );
}
