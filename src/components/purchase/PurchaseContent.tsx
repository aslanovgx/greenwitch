"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./PurchaseContent.module.css"
import { useBag } from "@/context/BagContext";
import Image from "next/image";

export default function PurchaseContent() {
    const { bagItems, removeFromBag, updateQuantity, clearBag } = useBag();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const totalPrice = bagItems.reduce((total, item) => {
        const price = Number(item.price);
        return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

    const handleOrderSubmit = async () => {
        if (bagItems.length === 0) {
            alert("Səbət boşdur.");
            return;
        }

        setLoading(true);
        try {
            // API olmadığı üçün sadəcə uğurlu kimi qəbul edirik
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 saniyəlik loading effekti

            clearBag(); // səbəti təmizlə
            alert("Sifarişiniz uğurla qeydə alındı!"); // uğur bildirişi
            router.push("/thanks"); // təşəkkür səhifəsinə yönləndir
        } catch (error) {
            console.error(error);
            alert("Xəta baş verdi.");
        } finally {
            setLoading(false);
        }
    };

    // const handleOrderSubmit = async () => {
    //     if (bagItems.length === 0) {
    //         alert("Səbət boşdur.");
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         const res = await fetch("/api/orders", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 items: bagItems,
    //                 total: totalPrice,
    //                 createdAt: new Date(),
    //             }),
    //         });

    //         if (res.ok) {
    //             clearBag(); // səbəti təmizlə
    //             alert("Sifarişiniz qeydə alındı!");
    //             router.push("/thanks"); // təşəkkür səhifəsinə yönləndir
    //         } else {
    //             alert("Sifariş qeydə alınarkən xəta baş verdi.");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         alert("Server xətası baş verdi.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <section className={`${styles.purchaseContent}`}>
            {/* Səbət Məhsulları */}
            <div className={`${styles.leftSide}`}>
                <h2 className="">Alış-veriş çantanız</h2>
                {bagItems.length === 0 ? (
                    <h3 className={styles.emptyBag}>Səbət boşdur.</h3>
                ) : (
                    bagItems.map((item) => (
                        <div key={item.id} className={`${styles.itemBag}`}>
                            <Image src={item.image} alt={item.title} width={250} height={334} className="rounded" />
                            <div className={`${styles.itemBox}`}>
                                <div className={`${styles.itemDesc}`}>
                                    <h1 className="font-medium uppercase text-sm">{item.title}</h1>
                                    <p>Rəng: <span>gümüş</span></p>
                                    {/* <p>Ölçü: Bir Ölçü</p> */}
                                    <p className="">Qiyməti: <span>{item.price}₼</span></p>
                                    <p className="">Miqdar: <span>{item.quantity}</span></p>
                                </div>
                                <div className={`${styles.itemButtons}`}>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className=" bg-gray-200 rounded text-sm"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className=" bg-gray-200 rounded text-sm"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() => removeFromBag(item.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Ümumi Baxış və Checkout */}
            <div className={`${styles.rightSide}`}>
                <div>
                    <h2 className="">Ümumi Baxış</h2>
                    <div className={`${styles.generalMoney}`}>
                        <span>Cəmi:</span>
                        <span>{totalPrice.toFixed(2)}₼</span>
                    </div>
                    <div className={`${styles.transportPart} mb-4`}>
                        <span>
                            Standart Çatdırılma:
                            <span>5-6 İş Günü Ərzində</span>
                        </span>
                        <span>Pulsuz</span>
                    </div>
                </div>
                <div className={styles.buttonDiv}>
                    <button
                        onClick={handleOrderSubmit}
                        disabled={loading}
                        className="">
                        {/* Sifarişi Qeydə Alın */}
                        {loading ? "Göndərilir..." : "Alış-verişi tamamla"}
                    </button>
                </div>
            </div>
        </section>
    );
}
