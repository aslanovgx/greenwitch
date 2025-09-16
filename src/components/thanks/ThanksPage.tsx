// components/thanks/ThanksPage.tsx
import Link from "next/link";
import './ThanksPage.css';
import MoreButton from "../ui/MoreButton";

export default function ThanksPage() {


    return (
        <>
            <div className="thanksBox">
                <h1>Təşəkkür edirik!</h1>
                <p>
                    Sifarişiniz uğurla qeydə alındı. Tezliklə sifarişiniz işlənəcək və göstərilən ünvana göndəriləcək.
                </p>
                <Link href="/" className="homeButton">
                    <MoreButton>Ana səhifəyə qayıt</MoreButton>
                </Link>
            </div>
        </>
    );
}
