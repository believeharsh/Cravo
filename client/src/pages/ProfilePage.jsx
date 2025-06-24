import React, { useState } from "react";
import {
    ShoppingBag,
    Crown,
    Heart,
    CreditCard,
    MapPin,
    Settings,
    Edit3,
    User,
    Mail,
    Phone,
    Calendar,
    ChevronRight,
    Bell,
    Shield,
    HelpCircle,
    LogOut,
    Menu,
    X
} from "lucide-react";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: "Harsh Sharma",
        email: "harsh.sharma@example.com",
        phone: "+91 98765 43210",
        joinDate: "January 2023",
        avatar: null
    });

    const [activeSection, setActiveSection] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sidebarOptions = [
        { id: "dashboard", title: "Dashboard", icon: User, color: "text-yellow-400" },
        { id: "orders", title: "Orders", icon: ShoppingBag, color: "text-yellow-400", count: "12" },
        { id: "favourites", title: "Favourites", icon: Heart, color: "text-red-500", count: "8" },
        { id: "payments", title: "Payments", icon: CreditCard, color: "text-green-400" },
        { id: "addresses", title: "Addresses", icon: MapPin, color: "text-blue-500", count: "3" },
        { id: "settings", title: "Settings", icon: Settings, color: "text-gray-600" }
    ];

    const additionalOptions = [
        { id: "help", title: "Help & Support", icon: HelpCircle, color: "text-blue-500" },
        { id: "logout", title: "Logout", icon: LogOut, color: "text-red-500" }
    ];

    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
        setIsSidebarOpen(false);
    };

    const getCurrentSectionTitle = () => {
        const section = [...sidebarOptions, ...additionalOptions].find(opt => opt.id === activeSection);
        return section ? section.title : 'Dashboard';
    };

    const renderDashboardContent = () => (
        <div className="p-6"> {/* Add padding for layout */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to your Dashboard, {user.name.split(' ')[0]}</h2>
            <p className="text-gray-600">This is your main dashboard content.</p>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard": return renderDashboardContent();
            case "orders": return <div className="p-6">📦 Orders section</div>;
            case "swiggy-one": return <div className="p-6">🌟 Premium features</div>;
            case "favourites": return <div className="p-6">❤️ Favourite items</div>;
            case "payments": return <div className="p-6">💳 Payment methods</div>;
            case "addresses": return <div className="p-6">📍 Your addresses</div>;
            case "settings": return <div className="p-6">⚙️ Settings</div>;
            case "notifications": return <div className="p-6">🔔 Notifications</div>;
            case "privacy": return <div className="p-6">🔒 Privacy Settings</div>;
            case "help": return <div className="p-6">❓ Help Center</div>;
            default: return renderDashboardContent();
        }
    };

    return (
        <>


            <Navbar />
            <div className="min-h-screen flex bg-gray-50">
                {/* Sidebar */}
                <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                  

                    <nav className="p-4 space-y-2 overflow-y-auto">
                        {[...sidebarOptions, ...additionalOptions].map(({ id, title, icon: Icon, color, count, badge }) => (
                            <button
                                key={id}
                                onClick={() => handleSectionChange(id)}
                                className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 ${activeSection === id ? "bg-gray-100" : ""}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`${color}`} size={20} />
                                    <span className="text-gray-800">{title}</span>
                                    {badge && <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">{badge}</span>}
                                </div>
                                {count && <span className="text-sm text-gray-500">{count}</span>}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Mobile Header */}
                    <header className="lg:hidden sticky top-0 bg-white p-4 flex items-center justify-between border-b border-gray-200">
                        <button onClick={() => setIsSidebarOpen(true)}><Menu size={24} /></button>
                        <h1 className="text-lg font-semibold text-gray-800">{getCurrentSectionTitle()}</h1>
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">🛒</div>
                    </header>

                    {/* Content */}
                    {renderContent()}
                </main>
            </div>
        </>
    );
};

export default ProfilePage;
