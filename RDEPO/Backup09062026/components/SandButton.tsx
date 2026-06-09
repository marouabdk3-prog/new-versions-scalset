"use client";

import Link from "next/link";

export default function SandButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="btn-shiny">
            {children}
        </Link>
    );
}
