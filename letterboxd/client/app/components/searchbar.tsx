'use client';

import { useState } from 'react';
import {useRouter} from "next/navigation";

export default function SearchBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Movies');
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const categories = ['Movies', 'TV Shows', 'Anime'];

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setDropdownOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Searching for "${searchTerm}" in "${selectedCategory}"`);
        router.push(`/searchresult/${searchTerm}`);
    };

    return (
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="flex relative">
                <button
                    type="button"
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                    {selectedCategory}
                    <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute top-full mt-1 left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <button
                                        type="button"
                                        onClick={() => handleCategorySelect(cat)}
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#F5C518] dark:hover:text-black"
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        required
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-black bg-[#F5C518] rounded-e-lg border border-blue-700 hover:bg-[#C89F14] focus:outline-none focus:ring-[#C89F14] dark:bg-[#F5C518] dark:hover:bg-[#C89F14]"
                    >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
}
