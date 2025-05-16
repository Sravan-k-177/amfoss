"use client"
import List1 from '../components/list1';
import List2 from '../components/list2';
import SearchBar from '../components/searchbar';
import {useRouter} from 'next/navigation';

export default function HomePage() {
    const router = useRouter();
    return (
        <div>
        <header className="bg-black text-white p-5 items-center ml-[2%]">
            {/* <input className='bg-white text-gray-900 p-1 ' placeholder='Search' ></input> */}
            <div className='flex justify-around'>
            <img className='w-30' src="./favicon.ico" alt="" />
            <SearchBar />
            <button onClick={()=> router.push("/wishlisttesting")} className='text-black p-5 rounded-2xl  hover:bg-blue-500 bg-[#F5C518]'>Wishlist</button>
            </div>
        </header>
        <div>
            <List1 />
            <List2 />
        </div>
        </div>
    );
}
