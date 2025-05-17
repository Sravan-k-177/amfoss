"use client"
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link"
import { usePathname } from "next/navigation";


export const Navigation = () => {
    const pathname = usePathname();
    return (
        <nav>
            <Link href="/" className ={pathname === "/" ? "font-bold mr-4":"mr-4 text-blue-500" }>Home</Link>
            <Link href="/loginpage" className ={pathname === "/loginpage" ? "font-bold mr-4":"mr-4 text-blue-500" }>Loginin</Link>
            <Link href="/signuppage" className ={pathname === "/signuppage" ? "font-bold mr-4":"mr-4 text-blue-500" }>Signup</Link>
            <Link href="/products/iphone" className ={pathname.startsWith("/products/") ? "font-bold mr-4":"mr-4 text-blue-500" }>Porduct1</Link>
            <SignInButton mode="modal" />
        </nav>
    )
}