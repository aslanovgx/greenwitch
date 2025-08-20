import { useState, useEffect } from "react";
import { useBag } from "@/context/BagContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./CheckoutForm.module.css"
import { useRef } from "react";
import { AZERBAIJAN_CITIES } from "@/data/cities";
import PhoneInput from "../form/PhoneInput";

export default function CheckoutForm() {

    type FormData = {
        fullName: string;
        phoneNumber: string;
        mail: string;
        location: string;
        city: string;
        selectedStore: string; // 🔹 Əlavə olundu
        additionalInfo: string;
    };

    type ErrorData = {
        fullName: boolean;
        phoneNumber: boolean;
        city: boolean;
        selectedStore: boolean;
    };

    type ErrorMessageData = {
        fullName?: string;
        phoneNumber?: string;
        mail?: string;
        city?: string;
        selectedStore?: string;
    };

    const [form, setForm] = useState<FormData>({
        fullName: "",
        phoneNumber: "",
        mail: "",
        location: "",
        city: "",
        selectedStore: "",
        additionalInfo: "",
    });

    const [errors, setErrors] = useState<ErrorData>({
        fullName: false,
        phoneNumber: false,
        city: false,
        selectedStore: false,
    });

    const { clearBag } = useBag();
    const [errorMessages, setErrorMessages] = useState<ErrorMessageData>({});
    const router = useRouter();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [phone, setPhone] = useState({ prefix: "050", number: "" });

    useEffect(() => {
        setForm((prev) => ({
            ...prev,
            phoneNumber: phone.prefix + phone.number
        }));
    }, [phone]);

    useEffect(() => {
        const digitsOnly = (phone.prefix + phone.number).replace(/\D/g, "");

        if (digitsOnly.length === 10) {
            setErrors((prev) => ({ ...prev, phoneNumber: false }));
            setErrorMessages((prev) => ({ ...prev, phoneNumber: "" }));
        }
    }, [phone]);


    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Real-time error validation
        if (name === "fullName") {
            if (value.trim()) {
                setErrors((prev) => ({ ...prev, fullName: false }));
                setErrorMessages((prev) => ({ ...prev, fullName: "" }));
            }
        }

        if (name === "mail") {
            if (!value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                setErrorMessages((prev) => ({ ...prev, mail: "" }));
            }
        }

        if (name === "city") {
            if (value.trim()) {
                setErrors((prev) => ({ ...prev, city: false }));
                setErrorMessages((prev) => ({ ...prev, city: "" }));
            }
        }

        if (name === "selectedStore") {
            if (value.trim()) {
                setErrors((prev) => ({ ...prev, selectedStore: false }));
                setErrorMessages((prev) => ({ ...prev, selectedStore: "" }));
            }
        }
    };


    const handleSubmit = async () => {
        const newErrors: ErrorData = {
            fullName: !form.fullName.trim(),
            phoneNumber: !form.phoneNumber.trim(),
            city: !form.city.trim(),
            selectedStore: !form.selectedStore.trim(),
        };

        const newErrorMessages: ErrorMessageData = {};

        if (!form.fullName.trim()) newErrorMessages.fullName = "Ad Soyad daxil edin.";

        const digitsOnly = form.phoneNumber.replace(/\D/g, ""); // boşluqları və qeyri-rəqəmləri sil

        if (!digitsOnly) {
            newErrorMessages.phoneNumber = "Telefon nömrəsi daxil edin.";
        } else if (digitsOnly.length !== 10) {
            newErrorMessages.phoneNumber = "Telefon nömrəsi 10 rəqəmdən ibarət olmalıdır.";
        } else if (!/^\d+$/.test(digitsOnly)) {
            newErrorMessages.phoneNumber = "Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır.";
        }

        if (form.mail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail.trim()))
            newErrorMessages.mail = "Email düzgün formatda deyil.";

        if (!form.city.trim()) newErrorMessages.city = "Şəhər seçin.";

        // if (!form.selectedStore.trim()) newErrorMessages.selectedStore = "Mağaza seçin.";

        setErrors(newErrors);
        setErrorMessages(newErrorMessages);

        if (Object.keys(newErrorMessages).length > 0) {
            toast.error("Zəhmət olmasa bütün tələb olunan sahələri doldurun.");
            return;
        }

        await new Promise((res) => setTimeout(res, 1000));
        toast.success("Sifarişiniz qeydə alındı!");
        clearBag();
        router.push("/thanks");
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let message = "";

        if (name === "fullName") {
            if (!value.trim()) {
                message = "Ad Soyad daxil edin.";
                setErrors((prev) => ({ ...prev, fullName: true }));
            } else {
                setErrors((prev) => ({ ...prev, fullName: false }));
            }
        }

        if (name === "phoneNumber") {
            setTimeout(() => {
                const digitsOnly = (phone.prefix + phone.number).replace(/\D/g, "");
                let message = "";

                if (!digitsOnly) {
                    message = "Telefon nömrəsi daxil edin.";
                    setErrors((prev) => ({ ...prev, phoneNumber: true }));
                } else if (digitsOnly.length !== 10) {
                    message = "Telefon nömrəsi 10 rəqəmdən ibarət olmalıdır.";
                    setErrors((prev) => ({ ...prev, phoneNumber: true }));
                } else {
                    setErrors((prev) => ({ ...prev, phoneNumber: false }));
                    message = "";
                }

                setErrorMessages((prev) => ({ ...prev, phoneNumber: message }));
            }, 0); // ✅ Asinxron yeniləməni gözləmək üçün
        }

        if (name === "mail") {
            if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                message = "Email düzgün formatda deyil.";
            }
        }

        if (name === "city") {
            if (!value.trim()) {
                message = "Şəhər seçin.";
                setErrors((prev) => ({ ...prev, city: true }));
            } else {
                setErrors((prev) => ({ ...prev, city: false }));
            }
        }

        // if (name === "selectedStore") {
        //     if (!value.trim()) {
        //         message = "Mağaza seçin.";
        //         setErrors((prev) => ({ ...prev, selectedStore: true }));
        //     } else {
        //         setErrors((prev) => ({ ...prev, selectedStore: false }));
        //     }
        // }

        setErrorMessages((prev) => ({ ...prev, [name]: message }));
    };

    const handleTextareaResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // sıfırla
            textarea.style.height = textarea.scrollHeight + "px"; // uyğun ölçünü al
        }
    };

    return (
        <>
            <div className={styles.checkoutTitle}>
                <h1>Sifariş Formu</h1>
            </div>

            <div className={styles.checkoutForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="fullName">Ad Soyad</label>
                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        placeholder="Ad Soyad"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.fullName
                                ? styles.errorField
                                : form.fullName && !errorMessages.fullName
                                    ? styles.successField
                                    : ""
                        }
                    />
                    {errorMessages.fullName && (
                        <div className={styles.errorMessage}>{errorMessages.fullName}</div>
                    )}
                </div>

                <PhoneInput
                    phone={phone}
                    setPhone={setPhone}
                    error={errorMessages.phoneNumber}
                    onBlur={(e) => handleBlur(e)}
                    isValid={
                        !errorMessages.phoneNumber &&
                        (phone.prefix + phone.number).replace(/\D/g, "").length === 10
                    }
                />

                <div className={styles.formGroup}>
                    <label htmlFor="mail">Email</label>
                    <input
                        id="mail"
                        type="email"
                        name="mail"
                        placeholder="example@mail.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errorMessages.mail
                                ? styles.errorField
                                : form.mail && !errorMessages.mail
                                    ? styles.successField
                                    : ""
                        }

                    />
                    {errorMessages.mail && (
                        <div className={styles.errorMessage}>{errorMessages.mail}</div>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="city">Şəhər</label>
                    <select
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.city
                                ? styles.errorField
                                : form.city && !errorMessages.city
                                    ? styles.successField
                                    : ""
                        }
                        required
                    >
                        <option value="" disabled hidden>Şəhər seçin</option>
                        {AZERBAIJAN_CITIES.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    {errorMessages.city && (
                        <div className={styles.errorMessage}>{errorMessages.city}</div>
                    )}
                </div>

                {/* <div className={styles.formGroup}>
                    <label htmlFor="selectedStore">Mağaza seçin</label>
                    <select
                        id="selectedStore"
                        name="selectedStore"
                        value={form.selectedStore}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.selectedStore
                                ? styles.errorField
                                : form.selectedStore && !errorMessages.selectedStore
                                    ? styles.successField
                                    : ""
                        }
                        required
                    >
                        <option value="" disabled hidden>Mağaza seçin</option>
                        <option value="28 Mall">28 Mall</option>
                        <option value="Gənclik Mall">Gənclik Mall</option>
                        <option value="Nizami Küçəsi">Nizami Küçəsi</option>
                        <option value="Deniz Mall">Deniz Mall</option>
                        <option value="Metropark">Metropark</option>
                    </select>
                    {errorMessages.selectedStore && (
                        <div className={styles.errorMessage}>{errorMessages.selectedStore}</div>
                    )}
                </div> */}

                <div className={styles.formGroup}>
                    <label htmlFor="additionalInfo">Əlavə məlumat</label>
                    <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        placeholder="Əlavə qeyd və ms."
                        onChange={(e) => {
                            handleChange(e);
                            handleTextareaResize(); // hündürlüyü dəyiş
                        }}
                        onInput={handleTextareaResize} // istifadəçi yazdıqca
                        ref={textareaRef}
                        rows={8}
                    />

                </div>

                <button onClick={handleSubmit}>Sifarişi təsdiqlə</button>
            </div>
        </>
    );
}
