"use client";

import Link from "next/link";

export default function ThanksPage() {
    return (
        <div className=" flex flex-col items-center justify-center pb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Təşəkkür edirik!</h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-md mb-5">
                Sifarişiniz uğurla qeydə alındı. Tezliklə sifarişiniz işlənəcək və göstərilən ünvana göndəriləcək.
            </p>
            <Link href="/" className="bg-black text-xl text-white px-6 py-3 rounded  transition">
                Ana səhifəyə qayıt
            </Link>
        </div>
    );
}
