import React from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../Redux/cardSlice";

const Cart = ({ setOpen }) => {
    // const totalPrice = cartItems.reduce(
    //     (total, item) => total + item.price * item.quantity,
    //     0,
    // );

    // const totalItems = cartItems.reduce(
    //     (total, item) => total + item.quantity,
    //     0,
    // );

    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    return (
        <>
            {/* Overlay */}
            <div
                className={
                    `fixed inset-0 bg-black/40 z-40 transition-all duration-300 
                    `
                    // ${ isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                }
                // onClick={onClose}
            />

            {/* Drawer */}

            <div
                className={`fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col
                    `}
                //  ${ isOpen ? "translate-x-0" : "translate-x-full"}
            >
                {/* Header */}

                <div className="flex items-center justify-between px-6 py-5 border-b">
                    <div>
                        <h2 className="text-2xl font-bold">Shopping Cart</h2>
                        <p className="text-gray-500 text-sm">
                            {/* {totalItems} Items */}
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="hover:bg-gray-100 p-2 rounded-full"
                    >
                        <X />
                    </button>
                </div>

                {/* Cart Items */}

                <div className="flex-1 overflow-y-auto px-5 py-5">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <ShoppingBag size={80} className="text-gray-300" />

                            <h2 className="text-2xl font-semibold mt-5">
                                Your Cart is Empty
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Add products to start shopping.
                            </p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 mb-6 border-b pb-5"
                            >
                                <img
                                    src={item.image}
                                    className="w-24 h-24 rounded-xl object-cover"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">
                                        {item.title}
                                    </h3>

                                    <p className="text-blue-600 font-bold mt-1">
                                        ₹{item.price}
                                    </p>

                                    <div className="flex items-center gap-3 mt-4">
                                        <button
                                            onClick={() =>
                                                dispatch(decreaseQuantity(item.id))
                                            }
                                            className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex justify-center items-center"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span className="font-semibold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                dispatch(increaseQuantity(item.id))
                                            }
                                            className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex justify-center items-center"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>dispatch(removeFromCart(item.id))}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}

                {/* {cartItems.length > 0 && (
                    <div className="border-t p-6">
                        <div className="flex justify-between text-gray-500 mb-3">
                            <span>Items</span>
                            <span>{totalItems}</span>
                        </div>

                        <div className="flex justify-between text-gray-500 mb-3">
                            <span>Delivery</span>
                            <span className="text-green-600">FREE</span>
                        </div>

                        <div className="flex justify-between text-2xl font-bold mb-6">
                            <span>Total</span>
                           <span>₹{totalPrice}</span>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition">
                            Proceed To Checkout
                        </button>
                    </div>
                )} */}
            </div>
        </>
    );
};

export default Cart;
