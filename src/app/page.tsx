import Link from "next/link";

export default function Home() {
    return (
        <div className="w-full flex flex-col h-[80%] justify-center gap-10">
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-8xl font-semibold my-2">Uniblox</h1>
                <h2 className="text-xl font-light text-gray-400">1M+ Products, 10M+ Users, 100M+ Transactions</h2>
            </div>
            <div className="">
                <div className="w-full flex justify-center gap-4">
                    <Link href="/products">
                    <button className="bg-gradient-to-r from-violet-400 to-blue-400 text-white font-bold py-2 px-4 rounded-full">
                        Products
                    </button>
                    </Link>
                    <Link href="#">
                    <button className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full">
                        Learn More
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
