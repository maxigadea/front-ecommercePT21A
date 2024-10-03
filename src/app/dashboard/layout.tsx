import Link from "next/link";


export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <nav>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/orders">
                    <label>Orders</label>
                </Link>
            </nav>
            <main>
                {children}
            </main>
        </>
    )

}