import { useRef } from "react";
import styles from "./../checkout/CheckoutForm.module.css";

const PREFIXES = ["070", "077", "050", "051", "055", "099", "010"];

type Props = {
    phone: {
        prefix: string;
        number: string;
    };
    setPhone: (value: { prefix: string; number: string }) => void;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    isValid?: boolean; // 🔹 BUNU ƏLAVƏ ET
};


export default function PhoneInput({ phone, setPhone, error, onBlur, isValid }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPhone({ ...phone, prefix: e.target.value });
        inputRef.current?.focus();
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const digitsOnly = raw.replace(/\D/g, "").slice(0, 7);
        setPhone({ ...phone, number: digitsOnly });
        // ❌ Blur tetiklenmir artıq burada
    };


    const formatForDisplay = (value: string) => {
        const clean = value.replace(/\D/g, "").slice(0, 7);
        const len = clean.length;

        if (len <= 3) return clean;
        if (len <= 5) return `${clean.slice(0, 3)} ${clean.slice(3)}`;
        return `${clean.slice(0, 3)} ${clean.slice(3, 5)} ${clean.slice(5)}`;
    };
    

    return (
        <div className={styles.formGroup}>
            <label htmlFor="phone">Telefon nömrəsi</label>

            <div className={styles.phoneInputWrapper}>
                <select
                    value={phone.prefix}
                    onChange={handlePrefixChange}
                    className={styles.prefixSelect}
                >
                    {PREFIXES.map((prefix) => (
                        <option key={prefix} value={prefix}>
                            {prefix}
                        </option>
                    ))}
                </select>

                <input
                    ref={inputRef}
                    id="phone"
                    name="phoneNumber"
                    type="tel"
                    placeholder="123 45 67"
                    value={formatForDisplay(phone.number)}
                    onChange={handleNumberChange}
                    onBlur={onBlur} // bu blur CheckoutForm-da handleBlur tetikleyecek
                    className={[
                        styles.phoneNumberInput,
                        error
                            ? styles.errorField
                            : isValid
                                ? styles.successField
                                : ""
                    ].join(" ")}
                />

            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
}
