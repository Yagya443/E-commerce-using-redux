import React, { useEffect, useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cardSlice";

const Home = () => {
    
    const [shoppingItems, setShoppingItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    async function fetchShoppingItems() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");

            const data = await response.json();
            // console.log(data?.category);
            console.log(data);
            setShoppingItems(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchShoppingItems();
    }, []);

    useEffect(() => {
        const categoryList = shoppingItems.reduce(
            (acc, item) => {
                if (!acc.includes(item.category)) {
                    acc.push(item.category);
                }
                return acc;
            },
            ["All"],
        );

        setCategories(categoryList);
        // console.log(categoryList);
    }, [shoppingItems]);

    const filteredList = () => {
        return shoppingItems.filter((item) => {
            const matchesSearch = item.description
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                activeCategory === "All" ||
                item.category.toLowerCase() === activeCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    };

    return (
        <div className="min-h-screen bg-slate-100">
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
                        onClick={() => setOpen(true)}
                        className="relative bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        <ShoppingCart size={22} />

                        <span className="absolute -top-2 -right-2 bg-red-500 h-6 w-6 rounded-full flex items-center justify-center text-sm">
                            {cartItems.length}
                        </span>
                    </button>
                </div>
            </nav>

            <section className="max-w-7xl mx-auto mt-10 flex gap-4 flex-wrap">
                {categories?.map((items) => (
                    <button
                        key={items.id}
                        onClick={() => setActiveCategory(items)}
                        className={`px-6 py-2 rounded-full font-medium transition
            ${
                activeCategory === items
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
            }`}
                    >
                        {items.toUpperCase()}
                    </button>
                ))}
            </section>

            <section className="max-w-7xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredList()?.map((product) => (
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

                                <button
                                    onClick={() => dispatch(addToCart(product))}
                                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {open && <Cart setOpen={setOpen} />}
        </div>
    );
};

export default Home;
