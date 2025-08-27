"use client";
import { useRouter } from "next/navigation";
import styles from "./PurchaseContent.module.css";
import { useBag } from "@/context/BagContext";
import Image from "next/image";

export default function PurchaseContent() {
  const { bagItems, removeFromBag, updateQuantity } = useBag();
  const router = useRouter();

  // Endirimi nəzərə alaraq vahid qiymət
  const getUnitPrice = (item: any) => {
    const price = Number(item.price ?? 0);
    const dp = typeof item.discountPrice === "number" ? item.discountPrice : null;
    const hasDiscount = dp !== null && dp < price;
    return hasDiscount ? dp : price;
  };

  // Ümumi məbləğ
  const totalPrice = bagItems.reduce((total, item) => {
    const unit = getUnitPrice(item);
    return total + unit * item.quantity;
  }, 0);

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
            <button onClick={() => router.push("/")} className="...">
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
                  className="rounded object-cover"
                />

                <div className={styles.itemBox}>
                  <div className={styles.itemDesc}>
                    <h1 className="font-medium uppercase text-sm">
                      {item.name}
                    </h1>

                    {/* Əlavə detalları bura bağlaya bilərsən (rəng/ölçü seçimi gələcəkdə olacaqsa) */}
                    {/* <p>Rəng: <span>gümüş</span></p> */}

                    {/* Qiymət görünüşü */}
                    {hasDiscount ? (
                      <p className="">
                        Qiyməti:{" "}
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

                    <p className="">Miqdar: <span>{item.quantity}</span></p>
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
          <button onClick={() => router.push("/checkout")} className="...">
            Alış-verişi tamamla
          </button>
        </div>
      </div>
    </section>
  );
}
