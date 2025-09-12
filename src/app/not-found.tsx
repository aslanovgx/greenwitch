
import Link from "next/link";
import "./Not-found.css";
import MoreButton from "@/components/ui/MoreButton";

export default function NotFound() {
  return (
    <div className="error_page flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-semibold">Səhifə tapılmadı</h2>
      <p className="text-gray-600">
        Axtardığınız səhifə mövcud deyil və ya silinib. Lütfən, ünvanı yoxlayın
        və ya ana səhifəyə qayıdın.
      </p>
      <Link
        href="/">
        <MoreButton>Ana Səhifəyə Qayıt</MoreButton>
      </Link>
    </div>
  );
}
