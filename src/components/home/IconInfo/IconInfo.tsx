import styles from './IconInfo.module.css';
import Image from "next/image";
export default function IconInfo() {
    const icons = [
        { id: 1, image: "/assets/home/iconInfo/replay.svg", desc: "14 gün ərzində geri qaytarma" },
        { id: 2, image: "/assets/home/iconInfo/fluent.svg", desc: "2 İllik Zəmanət" },
        { id: 3, image: "/assets/home/iconInfo/truck.svg", desc: "Sürətli Çatdırılma" },
        { id: 4, image: "/assets/home/iconInfo/card.svg", desc: "6 Ay %siz Kredit" },
    ];
    return (
        <>
            <div className={`${styles.iconInfo} flex items-center`}>
                {icons.map((icon) => (
                    <div key={icon.id} className={`${styles.icon_desc} flex flex-col items-center justify-center `}>
                        <Image
                            src={icon.image}
                            alt={`icon-${icon.id}`}
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                        <p>{icon.desc}</p>
                    </div>
                ))}
            </div>
        </>
    );
}