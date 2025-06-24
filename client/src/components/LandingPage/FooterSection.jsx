import React from "react";

const Footer = () => {
    return (
        <>
             <footer className="bg-gray-800 text-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="sm:col-span-2 lg:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <span className="text-gray-800 font-bold text-xl">🛒</span>
                                </div>
                                <h4 className="text-xl sm:text-2xl font-bold">CravingCart</h4>
                            </div>
                            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                                Satisfying your food cravings with fresh, delicious meals delivered fast to your doorstep.
                                Experience the joy of great food, every single time.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-yellow-400">Quick Links</h5>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Corporate</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer ; 