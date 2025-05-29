import styles from './Contact.module.css';
// import Image from "next/image";

export default function Contact() {

    return (

        <>
            <div className={`${styles.contactSection}`}>
                <div className={`${styles.contactBox} flex gap-[40px] justify-between`}>
                    <div className={`${styles.leftSide}`}>
                        <h1>Əlavə məlumat və ya dəstək üçün bizimlə birbaşa əlaqə saxlayın.</h1>
                        <p>Ən qısa zamanda cavab almaq üçün formu doldurun və göndərin.</p>
                    </div>
                    <div className={`${styles.rightSide} flex justify-center items-center`}>
                        <div className={`${styles.sendEmail} flex h-[66px] justify-center`}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={` placeholder-white outline-none`}
                            />
                            <button className='hover:bg-gray-950 transition cursor-pointer'>
                                Göndər
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}