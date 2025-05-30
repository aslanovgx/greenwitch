import styles from './Contact.module.css';
import EmailForm from '@/components/ui/EmailForm';
export default function Contact() {

    return (
        <>
            <div className={`${styles.contactSection}`}>
                <div className={`${styles.contactBox} flex gap-[40px] justify-evenly`}>
                    <div className={`${styles.leftSide}`}>
                        <h1>Əlavə məlumat və ya dəstək üçün bizimlə birbaşa əlaqə saxlayın.</h1>
                        <p>Ən qısa zamanda cavab almaq üçün formu doldurun və göndərin.</p>
                    </div>
                    <div className={`${styles.rightSide} flex justify-center items-center`}>
                        <EmailForm className={styles.sendEmail} />
                    </div>
                </div>
            </div>
        </>
    );
}