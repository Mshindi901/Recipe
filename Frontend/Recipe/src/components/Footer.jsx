function Footer(){
    return(
        <>
            <div className="w-screen h-fit p-6 bg-slate-800 text-white">
                <footer className="flex justify-center items-center h-fit">
                    <div className="md:w-3/4 w-full flex flex-col">
                        <div className="flex md:flex-row md:justify-evenly flex-col md:gap-1 gap-6 justify-center border-b border-white p-6">
                            <div className="flex flex-col gap-4 w-1/2">
                                <p className="text-slate-100 text-lg">Built By:</p>
                                <h1 className="text-3xl">Emmanuel Mshindi</h1>
                            </div>

                            <div className="flex flex-col">
                                <ul className="text-xl text-slate-200 flex flex-col">
                                    <li>emmanuelmshindi68@gmail.com</li>
                                    <li>TEl: +254 746157811</li>
                                    <li>Kenya, Mazeras</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center items-center">
                            <p>© 2025 Emmanuel Mshindi. All Rights Reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer;