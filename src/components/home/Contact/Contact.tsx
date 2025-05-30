'use client';
import { toast } from 'react-toastify';
import styles from './Contact.module.css';

export default function Contact() {
    const handleSubmit = () => {
        toast.success("Mesaj göndərildi ✅");
    };
    return (

        <>
            <div className={`${styles.contactSection}`}>
                <div className={`${styles.contactBox} flex gap-[40px] justify-evenly`}>
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
                            <button
                                // onClick={() => alert("Mesaj göndərildi ✅")}
                                onClick={handleSubmit}
                                className='hover:bg-gray-950 transition cursor-pointer'>
                                Göndər
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}