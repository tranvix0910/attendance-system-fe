import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineAcademicCap, HiOutlineUsers, HiOutlineClipboardList, HiOutlineChartBar, HiOutlineMenu, HiX, HiOutlineCheckCircle, HiOutlineStar } from 'react-icons/hi'
import { useState } from 'react'
import bgImage from '../assets/images/bg.png'
import ptitLogo from '../assets/images/ptit-bg.png'

const Home = () => {
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogin = () => {
        navigate('/login')
    }

    const features = [
        {
            icon: <HiOutlineUsers className="text-2xl sm:text-3xl text-indigo-600" />,
            title: "Student Management",
            description: "Efficiently manage student profiles, enrollment, and academic records with our comprehensive student management system."
        },
        {
            icon: <HiOutlineAcademicCap className="text-2xl sm:text-3xl text-emerald-600" />,
            title: "Class Management",
            description: "Organize and manage classes, schedules, and academic sessions with intuitive tools designed for educational institutions."
        },
        {
            icon: <HiOutlineClipboardList className="text-2xl sm:text-3xl text-purple-600" />,
            title: "Smart Attendance",
            description: "Advanced attendance tracking with automated features, real-time monitoring, and accurate reporting capabilities."
        },
        {
            icon: <HiOutlineChartBar className="text-2xl sm:text-3xl text-amber-600" />,
            title: "Detailed Reports",
            description: "Generate comprehensive reports and analytics to track attendance patterns, student performance, and institutional metrics."
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200 fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center">
                                    <div className="p-2">
                                        <img 
                                            src={ptitLogo} 
                                            alt="PTIT Logo" 
                                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                                        />
                                    </div>
                                    <span className="ml-3 text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent truncate">
                                        <span className="hidden sm:inline">PTIT Attendance System</span>
                                        <span className="sm:hidden">PTIT</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Desktop menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={handleLogin}
                                className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-2.5 rounded-full hover:from-slate-800 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Login
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
                            >
                                {mobileMenuOpen ? <HiX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm">
                        <div className="px-4 py-3 space-y-2">
                            <button
                                onClick={handleLogin}
                                className="w-full text-left bg-gradient-to-r from-slate-700 to-slate-900 text-white px-4 py-2.5 rounded-full hover:from-slate-800 hover:to-black transition-all duration-300"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div 
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.8) 100%), url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-ping"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <HiOutlineStar className="text-yellow-300 mr-2" />
                            <span className="text-white text-sm font-medium">Smart Attendance System</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Revolutionize Your
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> 
                                Attendance Management
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
                            Experience the future of educational administration with our intelligent attendance tracking system designed for modern institutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
                            <button
                                onClick={handleLogin}
                                className="group w-full sm:w-auto bg-white text-slate-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                            >
                                <span className="flex items-center justify-center">
                                    Get Started
                                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>
                            <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300 transform hover:scale-105">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                        <div className="text-white/80">
                            <div className="text-3xl font-bold">99%</div>
                            <div className="text-sm">Accuracy</div>
                        </div>
                        <div className="text-white/80">
                            <div className="text-3xl font-bold">24/7</div>
                            <div className="text-sm">Support</div>
                        </div>
                        <div className="text-white/80">
                            <div className="text-3xl font-bold">1000+</div>
                            <div className="text-sm">Schools</div>
                        </div>
                        <div className="text-white/80">
                            <div className="text-3xl font-bold">5★</div>
                            <div className="text-sm">Rating</div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-slate-100 text-slate-700 rounded-full px-4 py-2 mb-4">
                            <HiOutlineCheckCircle className="mr-2" />
                            <span className="text-sm font-medium">Key Features</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                            Powerful Features for Modern Education
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Discover comprehensive tools designed to streamline attendance management and enhance educational administration efficiency.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 h-full">
                                    <div className="flex justify-center mb-6">
                                        <div className="bg-gradient-to-r from-slate-600 to-slate-800 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                            {React.cloneElement(feature.icon, { className: "text-3xl text-white" })}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-center">
                                        {feature.description}
                                    </p>
                                </div>
                                {/* Gradient border effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-slate-700 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-white p-3 rounded-xl shadow-lg">
                                <img 
                                    src={ptitLogo} 
                                    alt="PTIT Logo" 
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent">
                                PTIT Attendance System
                            </span>
                        </div>
                        <p className="text-slate-400 text-lg mb-8">
                            Version 2024 - Advanced Educational Technology
                        </p>
                        <div className="border-t border-slate-700 pt-8">
                            <p className="text-slate-500">
                                © 2024 PTIT Attendance System. All rights reserved.
                            </p>
                            <p className="text-slate-500">
                                Tran Dai Vi - PTIT
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
