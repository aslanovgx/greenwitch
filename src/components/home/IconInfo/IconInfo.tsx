import styles from './IconInfo.module.css';
// import Image from "next/image";
import Replay from './../../../../public/assets/home/iconInfo/replay.svg'
import Fluent from './../../../../public/assets/home/iconInfo/fluent.svg'
import Truck from './../../../../public/assets/home/iconInfo/truck.svg'
import Card from './../../../../public/assets/home/iconInfo/card.svg'
export default function IconInfo() {
    const icons = [
        { id: 1, image: <Replay />, desc: "14 gün ərzində geri qaytarma", },
        { id: 2, image: <Fluent />, desc: "2 İllik Zəmanət", },
        { id: 3, image: <Truck />, desc: "Sürətli Çatdırılma", },
        { id: 4, image: <Card />, desc: "6 Ay %siz Kredit", }

    ];
    return (
        <>
            <div className={`${styles.iconInfo} flex items-center`}>
                {icons.map((icon) => (
                    <div key={icon.id} className={`${styles.icon_desc} flex flex-col items-center justify-center `}>
                        <span>
                            {icon.image}
                        </span>
                        <p>{icon.desc}</p>
                    </div>
                ))}
            </div>
        </>
    );
}