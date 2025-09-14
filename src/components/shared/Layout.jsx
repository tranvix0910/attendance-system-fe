import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="bg-slate-50 h-screen w-screen overflow-hidden flex flex-row">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <div className="flex-1 p-3 sm:p-4 lg:p-6 min-h-0 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
