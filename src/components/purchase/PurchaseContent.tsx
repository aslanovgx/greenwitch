"use client";
import { useRouter } from "next/navigation";
import styles from "./PurchaseContent.module.css";
import { useBag } from "@/context/BagContext";
import Image from "next/image";
import type { Product } from "@/types/Product";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PurchaseContent() {
  const { bagItems, removeFromBag, updateQuantity } = useBag();
  const router = useRouter();

  // —— API kökünü sabitlə (iki dəfə /api problemini aradan qaldırır)
  const RAW_API = (process.env.API_SAAT_BASE_URL ?? "").trim();
  const API_ROOT = RAW_API.replace(/\/$/, "");
  const API_BASE = API_ROOT.replace(/\/api$/i, "");
  const productUrl = (id: number) => `${API_BASE}/api/Product/${id}`;

  // —— Real stok oxuyucu (backend-də field adı fərqli ola bilər)
  async function readStockById(id: number): Promise<number> {
    try {
      const res = await fetch(productUrl(id), {
        cache: "no-store",
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (!res.ok) return 0;
      const data = await res.json();
      const stockCandidate = [data?.stock, data?.quantityInStock, data?.quantity].find(
        (v) => typeof v === "number"
      );
      return typeof stockCandidate === "number" ? Math.max(0, stockCandidate) : 0;
    } catch {
      return 0;
    }
  }

  // —— Endirimi nəzərə alaraq vahid qiymət
  const getUnitPrice = (item: Product & { quantity: number }) => {
    const price = Number(item.price ?? 0);
    const dp = typeof item.discountPrice === "number" ? item.discountPrice : null;
    const hasDiscount = dp !== null && dp < price;
    return hasDiscount ? dp : price;
  };

  // —— Ümumi məbləğ
  const totalPrice = bagItems.reduce((total, item) => {
    const unit = getUnitPrice(item);
    return total + unit * item.quantity;
  }, 0);

  // —— Checkout-dan əvvəl stok yoxlaması
  const [checking, setChecking] = useState(false);

  async function handleCheckoutClick() {
    if (checking) return;
    setChecking(true);

    // Hamısını paralel yoxla
    const results = await Promise.all(
      bagItems.map(async (it) => {
        const have = await readStockById(it.id);
        return { id: it.id, name: it.name, want: it.quantity, have, ok: it.quantity <= have };
      })
    );

    const insufficient = results.filter((r) => !r.ok);

    if (insufficient.length > 0) {
      insufficient.forEach((x) => {
        toast.error(
          `${x.name ?? "Məhsul"} üçün stok kifayət etmir.\nSeçilən: ${x.want} - Mövcud: ${x.have}`
        );
      });
      setChecking(false);
      return; // keçidi saxlayırıq
    }

    router.push("/checkout");
    setChecking(false);
  }

  if (bagItems.length === 0) {
    return (
      <section className={styles.purchaseContent}>
        <div className={styles.leftSide}>
          <h2>Alış-veriş çantanız</h2>
          <h3 className={styles.emptyBag}>Səbət boşdur.</h3>
        </div>

        <div className={styles.rightSide}>
          <div>
            <h2>Ümumi Baxış</h2>
            <div className={styles.generalMoney}>
              <span>Cəmi:</span>
              <span>0.00₼</span>
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
            <button onClick={() => router.push("/products")} className="...">
              Məhsullara qayıt
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.purchaseContent}>
      {/* Səbət Məhsulları */}
      <div className={styles.leftSide}>
        <h2>Alış-veriş çantanız</h2>

        <div className={styles.itemsContainer}>
          {bagItems.map((item) => {
            const unit = getUnitPrice(item);
            const hasDiscount =
              typeof item.discountPrice === "number" &&
              item.discountPrice < Number(item.price ?? 0);

            return (
              <div key={item.id} className={styles.itemBag}>
                <Image
                  src={item.images?.[0] ?? "/assets/placeholders/product.png"}
                  alt={item.name ?? "Product"}
                  width={250}
                  height={334}
                  className="rounded object-contain"
                />

                <div className={styles.itemBox}>
                  <div className={styles.itemDesc}>
                    <h1 className="font-medium uppercase text-sm">
                      {item.brandName || "Greenwich"} - {item.name}
                    </h1>

                    {/* Əlavə detalları bura bağlaya bilərsən (rəng/ölçü seçimi gələcəkdə olacaqsa) */}
                    {/* <p>Rəng: <span>gümüş</span></p> */}

                    {/* Qiymət görünüşü */}
                    {hasDiscount ? (
                      <p className="">
                        Qiymət:{" "}
                        <span className="line-through opacity-60 mr-2">
                          {Number(item.price ?? 0).toFixed(2)}₼
                        </span>
                        <span>{Number(item.discountPrice).toFixed(2)}₼</span>
                      </p>
                    ) : (
                      <p className="">
                        Qiyməti: <span>{Number(unit).toFixed(2)}₼</span>
                      </p>
                    )}

                    <p className="">
                      Miqdar: <span>{item.quantity}</span>
                    </p>
                  </div>

                  <div className={styles.itemButtons}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 rounded text-sm"
                      aria-label="Miqdarı artır"
                    >
                      +
                    </button>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 rounded text-sm"
                      disabled={item.quantity <= 1}
                      aria-label="Miqdarı azalt"
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
            );
          })}
        </div>
      </div>

      {/* Ümumi Baxış və Checkout */}
      <div className={styles.rightSide}>
        <div>
          <h2>Ümumi Baxış</h2>

          <div className={styles.generalMoney}>
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
            onClick={handleCheckoutClick}
            className="..."
            disabled={checking}
            aria-busy={checking ? "true" : "false"}
          >
            {checking ? "Yoxlanılır..." : "Alış-verişi tamamla"}
          </button>
        </div>
      </div>
    </section>
  );
}
