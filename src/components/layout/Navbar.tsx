import Image from 'next/image'
import '@/components/layout/Navbar.css';
// import { Heart } from 'lucide-react';
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

            <div className="row-2 relative mx-auto flex items-center justify-between">
                {/* Search */}
                <div className="row-2-search flex items-center">
                    {/* <Search size={24} className="text-gray-600" /> */}
                    <Image
                        src={'/assets/icons/search.svg'}
                        alt='search-icon'
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                    <input
                        type="text"
                        placeholder="Axtar..."
                        className="border rounded px-2 py-1 text-sm focus:outline-none"
                    />
                </div>

                {/* Logo */}
                <Image
                    src={'/assets/icons/logo.png'}
                    alt='logo-png'
                    width={200}
                    height={30}
                    className="logo"
                />

                {/* Favorite Icon */}
                <div className='row-2-icons flex items-center justify-center'>
                    <Image
                        src={'/assets/icons/shopping.svg'}
                        alt='shopping-icon'
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                    <Image
                        src={'/assets/icons/heart.svg'}
                        alt='heart-icon'
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                    <Image
                        src={'/assets/icons/account.svg'}
                        alt='account-icon'
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                    {/* Favorit sayı badge-lə əlavə oluna bilər */}
                </div>
            </div>
        </nav>
    )
}