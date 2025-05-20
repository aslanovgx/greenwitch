import Image from 'next/image'
import '@/components/layout/Navbar.css';
import { Heart } from 'lucide-react';
export default function Navbar() {
    return (
        <nav className="w-full bg-white">
            <div className="row-1 w-full bg-darkBg text-center flex justify-center items-center">
                <Image
                    src={'/assets/icons/vector.svg'}
                    alt='vector-icon'
                    width={21}
                    height={21}
                    className="object-contain"
                />

                <p>100% Sertifikatlı Orijinal </p>
            </div>

            <div className="row-2 mx-auto px-4 py-3 flex items-center justify-between">
                {/* Search */}
                <div className="row-2-search flex items-center">
                    {/* <Search size={24} className="text-gray-600" /> */}
                    <Image
                        src={'/assets/icons/search.svg'}
                        alt='vector-icon'
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    <input
                        type="text"
                        placeholder="Axtar..."
                        className="border rounded px-2 py-1 text-sm focus:outline-none"
                    />
                </div>

                {/* Logo */}
                <div className="text-xl font-bold text-gray-800">Greenwitch</div>

                {/* Favorite Icon */}
                <button className="relative">
                    <Heart size={22} className="text-gray-700" />
                    {/* Favorit sayı badge-lə əlavə oluna bilər */}
                </button>
            </div>

        </nav>
    );
}