export default function Header() {
    return (
        <header className="relative overflow-hidden border-b border-[#c9a77a]/30 bg-gradient-to-br from-[#5a1f28] via-[#6d2430] to-[#3f141b] text-[#f8f1e7]">
            <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_55%)]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="mb-3 inline-block rounded-full border border-[#f3d7b0]/25 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-[#f3d7b0]">
                            Bakery • Café • Restaurant
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            The White Woods
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-[#f8e9da]/85 sm:text-base">
                            Explore the menu, tap any dish to view details, and build the
                            bill instantly with GST calculation.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#f3d7b0]">
                                Contact
                            </p>
                            <p className="mt-2 text-lg font-semibold">6395798187</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#f3d7b0]">
                                Location
                            </p>
                            <p className="mt-2 text-lg font-semibold">Gharat Road, Kotdwar</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}