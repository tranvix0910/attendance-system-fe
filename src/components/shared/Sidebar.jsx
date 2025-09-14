import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineLogout, HiX } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/constants/Sidebar'
import { Authenticator } from '@aws-amplify/ui-react'
import { useLanguage } from '../../contexts/LanguageContext'
import ptitLogo from '../../assets/images/ptit-bg.png'

const linkClass =
    'flex items-center gap-3 font-medium px-4 py-3 hover:bg-slate-700 hover:text-slate-100 hover:no-underline active:bg-slate-600 rounded-lg text-base transition-all duration-200 ease-in-out'

export default function Sidebar({ onClose }) {
    const { t } = useLanguage()
    
    return (
        <div className="bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 w-72 h-full p-4 flex flex-col shadow-2xl">
            {/* Mobile close button */}
            <div className="flex items-center justify-between mb-6 lg:justify-start">
                <div className="flex items-center gap-3 px-2 py-4 font-bold border-b border-slate-600 flex-1 lg:border-b-0">
                    <div className="bg-white p-2 rounded-lg shadow-lg">
                        <img 
                            src={ptitLogo} 
                            alt="PTIT Logo" 
                            className="w-7 h-7 object-contain"
                        />
                    </div>
                    <div className="text-white">
                        <div className="text-lg font-bold">
                            PTIT Attendance
                        </div>
                        <div className="text-sm text-slate-300">
                            Management System
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors duration-200"
                >
                    <HiX fontSize={24} />
                </button>
            </div>
            
            <div className="py-4 flex flex-1 flex-col gap-2 overflow-y-auto">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} onClose={onClose} />
                ))}
            </div>
            
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-600">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} onClose={onClose} />
                ))}
                <Authenticator>
                    {({ signOut }) => (
                        <div 
                            className={classNames(linkClass, 'cursor-pointer text-red-400 hover:bg-red-900/30 hover:text-red-300')} 
                            onClick={signOut}
                        >
                            <span className="text-xl">
                                <HiOutlineLogout />
                            </span>
                            {t('logout')}
                        </div>
                    )}
                </Authenticator>
            </div>
        </div>
    )
}

function SidebarLink({ link, onClose }) {
    const { pathname } = useLocation()
    const { t } = useLanguage()
    const isActive = pathname.startsWith(link.path)

    const handleClick = () => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <Link
            to={link.path}
            onClick={handleClick}
            className={classNames(
                isActive 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700/50', 
                linkClass
            )}
        >
            <span className="text-xl">{link.icon}</span>
            <span className="truncate">{t(link.labelKey)}</span>
        </Link>
    )
}

Sidebar.propTypes = {
    onClose: PropTypes.func
}

SidebarLink.propTypes = {
    link: PropTypes.shape({
        key: PropTypes.string.isRequired,
        labelKey: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired
    }).isRequired,
    onClose: PropTypes.func
}
