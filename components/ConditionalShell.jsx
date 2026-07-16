"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalShell({ children }) {
 const pathname = usePathname();
 const isAdmin = pathname.startsWith("/admin");

 return (
 <>
 {!isAdmin && <Navbar />}
 <div id="main-content" role="main">
 {children}
 </div>
 {!isAdmin && <Footer />}
 </>
 );
}
