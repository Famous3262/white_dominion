import Link from 'next/link';
import { Button } from '@/components/ui/button'; // We'll create a basic button later or use standard HTML for now

export function Navbar() {
    return (
        <nav className="w-full py-6 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="text-2xl font-serif font-bold tracking-tighter text-primary">
                <Link href="/">WHITE DOMINION</Link>
            </div>

            <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
                <Link href="/generate" className="hover:text-primary transition-colors">ATELIER</Link>
                <Link href="/wardrobe" className="hover:text-primary transition-colors">WARDROBE</Link>
                <Link href="/about" className="hover:text-primary transition-colors">PHILOSOPHY</Link>
            </div>

            <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm font-medium hover:text-primary">LOGIN</Link>
                <Link href="/signup" className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-none hover:bg-primary/90 transition-all">
                    JOIN
                </Link>
            </div>
        </nav>
    );
}
