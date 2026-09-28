import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                <Link
                    href="/"
                    className="font-bold"
                >
                    Event Ticket
                </Link>

                <div className="flex gap-4">

                    <Link href="/">
                        Events
                    </Link>

                    <Link href="/tickets">
                        Tickets
                    </Link>

                    <Link href="/statistics">
                        Statistics
                    </Link>

                </div>

            </div>
        </nav>
    );
}