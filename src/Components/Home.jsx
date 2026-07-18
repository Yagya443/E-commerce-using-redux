import React, { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";

const products = [
    {
        id: 1,
        title: "Nike Air Max",
        category: "Shoes",
        price: 3999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
        id: 2,
        title: "Apple Watch",
        category: "Watches",
        price: 24999,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    },
    {
        id: 3,
        title: "Headphones",
        category: "Electronics",
        price: 2999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
    {
        id: 4,
        title: "Backpack",
        category: "Fashion",
        price: 1899,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    },
    {
        id: 5,
        title: "Gaming Mouse",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    },
    {
        id: 6,
        title: "White Sneakers",
        category: "Shoes",
        price: 2799,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    },
];

const categories = ["All", "Shoes", "Electronics", "Fashion", "Watches"];

const Home = ({ cartCount = 0, openCart }) => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = products.filter((product) => {
        const matchCategory =
            activeCategory === "All" || product.category === activeCategory;

        const matchSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Navbar */}

            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
                    <h1 className="text-3xl font-bold text-blue-600">
                        ShopEase
                    </h1>

                    <div className="relative w-[420px] hidden md:block">
                        <Search
                            className="absolute left-3 top-3 text-gray-500"
                            size={20}
                        />

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full border rounded-xl py-2 pl-11 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={openCart}
                        className="relative bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        <ShoppingCart size={22} />

                        <span className="absolute -top-2 -right-2 bg-red-500 h-6 w-6 rounded-full flex items-center justify-center text-sm">
                            {cartCount}
                        </span>
                    </button>
                </div>
            </nav>

            {/* Hero */}

            <section className="max-w-7xl mx-auto mt-10 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-20 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h2 className="text-5xl font-bold leading-tight">
                        Summer Collection
                    </h2>

                    <p className="mt-5 text-lg text-blue-100 max-w-lg">
                        Discover premium products with amazing discounts.
                        Upgrade your lifestyle with modern essentials.
                    </p>

                    <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
                        Shop Now
                    </button>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
                    className="w-[350px] mt-10 md:mt-0 rounded-3xl shadow-2xl"
                />
            </section>

            {/* Categories */}

            <section className="max-w-7xl mx-auto mt-10 flex gap-4 flex-wrap">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 rounded-full font-medium transition
            ${
                activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
            }`}
                    >
                        {category}
                    </button>
                ))}
            </section>

            {/* Products */}

            <section className="max-w-7xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition"
                    >
                        <img
                            src={product.image}
                            className="h-64 w-full object-cover"
                        />

                        <div className="p-6">
                            <span className="text-sm text-gray-500">
                                {product.category}
                            </span>

                            <h2 className="text-xl font-bold mt-2">
                                {product.title}
                            </h2>

                            <div className="flex justify-between items-center mt-6">
                                <h3 className="text-2xl font-bold text-blue-600">
                                    ₹{product.price}
                                </h3>

                                <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;
