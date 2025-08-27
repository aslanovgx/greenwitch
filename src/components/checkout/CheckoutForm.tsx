// components/checkout/CheckoutForm.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useBag } from "@/context/BagContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./CheckoutForm.module.css";
import { AZERBAIJAN_CITIES } from "@/data/cities";
import PhoneInput from "../form/PhoneInput";
import { createOrder } from "@/lib/api/orders";

type FormData = {
  fullName: string;
  phoneNumber: string;
  mail: string;
  location: string;        // → customerAdress-ə map edəcəyik
  city: string;
  selectedStore: string;   // (istəsən additionalInfo-ya əlavə edə bilərsən)
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

export default function CheckoutForm() {
  const { bagItems, clearBag } = useBag();
  const router = useRouter();

  const DEFAULT_CITY = "Bakı";

  const [form, setForm] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    mail: "",
    location: "",
    city: DEFAULT_CITY,
    selectedStore: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<ErrorData>({
    fullName: false,
    phoneNumber: false,
    city: false,
    selectedStore: false,
  });
  const [errorMessages, setErrorMessages] = useState<ErrorMessageData>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [phone, setPhone] = useState({ prefix: "050", number: "" });
  const [submitting, setSubmitting] = useState(false);


  // Telefonu form state-ə yaz
  useEffect(() => {
    setForm((prev) => ({ ...prev, phoneNumber: phone.prefix + phone.number }));
  }, [phone]);

  // Telefon realtime validation
  useEffect(() => {
    const digitsOnly = (phone.prefix + phone.number).replace(/\D/g, "");
    if (digitsOnly.length === 10) {
      setErrors((prev) => ({ ...prev, phoneNumber: false }));
      setErrorMessages((prev) => ({ ...prev, phoneNumber: "" }));
    }
  }, [phone]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (name === "fullName" && value.trim()) {
      setErrors((prev) => ({ ...prev, fullName: false }));
      setErrorMessages((prev) => ({ ...prev, fullName: "" }));
    }
    if (name === "mail") {
      if (!value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        setErrorMessages((prev) => ({ ...prev, mail: "" }));
      }
    }
    if (name === "city" && value.trim()) {
      setErrors((prev) => ({ ...prev, city: false }));
      setErrorMessages((prev) => ({ ...prev, city: "" }));
    }
    if (name === "selectedStore" && value.trim()) {
      setErrors((prev) => ({ ...prev, selectedStore: false }));
      setErrorMessages((prev) => ({ ...prev, selectedStore: "" }));
    }
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
        let msg = "";
        if (!digitsOnly) {
          msg = "Telefon nömrəsi daxil edin.";
          setErrors((prev) => ({ ...prev, phoneNumber: true }));
        } else if (digitsOnly.length !== 10) {
          msg = "Telefon nömrəsi 10 rəqəmdən ibarət olmalıdır.";
          setErrors((prev) => ({ ...prev, phoneNumber: true }));
        } else {
          setErrors((prev) => ({ ...prev, phoneNumber: false }));
          msg = "";
        }
        setErrorMessages((prev) => ({ ...prev, phoneNumber: msg }));
      }, 0);
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

    setErrorMessages((prev) => ({ ...prev, [name]: message }));
  };

  const handleTextareaResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleSubmit = async () => {
    // Local validation
    const newErrors: ErrorData = {
      fullName: !form.fullName.trim(),
      phoneNumber: !form.phoneNumber.trim(),
      city: !form.city.trim(),
      selectedStore: false, // mağaza hələ tələb olunmur
    };
    const newErrorMessages: ErrorMessageData = {};

    if (!form.fullName.trim()) newErrorMessages.fullName = "Ad Soyad daxil edin.";

    const digitsOnly = form.phoneNumber.replace(/\D/g, "");
    if (!digitsOnly) newErrorMessages.phoneNumber = "Telefon nömrəsi daxil edin.";
    else if (digitsOnly.length !== 10) newErrorMessages.phoneNumber = "Telefon nömrəsi 10 rəqəmdən ibarət olmalıdır.";
    else if (!/^\d+$/.test(digitsOnly)) newErrorMessages.phoneNumber = "Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır.";

    if (form.mail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mail.trim()))
      newErrorMessages.mail = "Email düzgün formatda deyil.";

    if (!form.city.trim()) newErrorMessages.city = "Şəhər seçin.";

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    if (Object.keys(newErrorMessages).length > 0) {
      toast.error("Zəhmət olmasa tələb olunan sahələri düzgün doldurun.");
      return;
    }

    if (bagItems.length === 0) {
      toast.error("Səbət boşdur.");
      return;
    }

    // Payload-a map
    const payload = {
      fullName: form.fullName.trim(),
      phoneNumber: digitsOnly,                                            // backend-ə təmiz rəqəm göndərək
      mail: form.mail.trim(),
      customerAdress: form.location.trim(),                               // ← API-nin istədiyi ad
      city: form.city.trim(),
      additionalInfo: form.additionalInfo?.trim()
        ? `${form.additionalInfo.trim()}${form.selectedStore ? ` | Store: ${form.selectedStore}` : ""}`
        : (form.selectedStore ? `Store: ${form.selectedStore}` : ""),
      orderItems: bagItems.map((i) => ({ productId: i.id, count: i.quantity })),
    };

    try {
      setSubmitting(true);
      await createOrder(payload);
      toast.success("Sifarişiniz qeydə alındı!");
      clearBag();
      router.push("/thanks");
    } catch (err) {
      console.error(err);
      toast.error("Sifariş qeydə alınarkən xəta baş verdi.");
    } finally {
      setSubmitting(false);
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
          {errorMessages.fullName && <div className={styles.errorMessage}>{errorMessages.fullName}</div>}
        </div>

        <PhoneInput
          phone={phone}
          setPhone={setPhone}
          error={errorMessages.phoneNumber}
          onBlur={(e) => handleBlur(e)}
          isValid={!errorMessages.phoneNumber && (phone.prefix + phone.number).replace(/\D/g, "").length === 10}
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
          {errorMessages.mail && <div className={styles.errorMessage}>{errorMessages.mail}</div>}
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
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errorMessages.city && <div className={styles.errorMessage}>{errorMessages.city}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Ünvan</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Küçə, bina, mənzil və s."
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="additionalInfo">Əlavə məlumat</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            placeholder="Əlavə qeyd və s."
            onChange={(e) => { handleChange(e); handleTextareaResize(); }}
            onInput={handleTextareaResize}
            ref={textareaRef}
            rows={8}
          />
        </div>

        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Göndərilir..." : "Sifarişi təsdiqlə"}
        </button>
      </div>
    </>
  );
}
