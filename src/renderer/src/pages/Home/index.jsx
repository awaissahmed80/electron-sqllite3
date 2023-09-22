export default function Home(){
    return(
        <div className="h-screen flex-1 format max-w-full block bg-slate-200 dark:bg-zinc-800">
            {               
                <>
                <table className="w-full border  text-sm text-left  text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">                    
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
                </>
            }
        </div>
    )
}