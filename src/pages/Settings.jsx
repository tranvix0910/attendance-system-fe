import { useState } from 'react'
import PropTypes from 'prop-types'
import { useLanguage } from '../contexts/LanguageContext'
import { 
    HiOutlineBell, 
    HiOutlineGlobe, 
    HiOutlineMoon, 
    HiOutlineSun, 
    HiOutlineShieldCheck, 
    HiOutlineDatabase,
    HiOutlineMail,
    HiOutlineDeviceMobile,
    HiOutlineEye,
    HiOutlineDownload,
    HiOutlineTrash,
    HiOutlineRefresh,
    HiOutlineCheck,
    HiOutlineX
} from 'react-icons/hi'

const Settings = () => {
    const { language, changeLanguage, t } = useLanguage()
    
    const [settings, setSettings] = useState({
        // Notification settings
        emailNotifications: true,
        pushNotifications: true,
        attendanceAlerts: true,
        weeklyReports: false,
        
        // Appearance settings
        darkMode: false,
        language: language,
        
        // Privacy settings
        profileVisible: true,
        showEmail: false,
        
        // System settings
        autoBackup: true,
        dataRetention: '12',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const handleToggle = async (key) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setSettings(prev => ({
                ...prev,
                [key]: !prev[key]
            }))
            setIsLoading(false)
            showSuccess()
        }, 300)
    }

    const handleSelectChange = async (key, value) => {
        setIsLoading(true)
        // Handle language change specially
        if (key === 'language') {
            changeLanguage(value)
        }
        
        // Simulate API call
        setTimeout(() => {
            setSettings(prev => ({
                ...prev,
                [key]: value
            }))
            setIsLoading(false)
            showSuccess()
        }, 300)
    }

    const showSuccess = () => {
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 2000)
    }

    const handleResetToDefault = () => {
        if (window.confirm(t('confirmResetSettings'))) {
            setIsLoading(true)
            setTimeout(() => {
                setSettings({
                    emailNotifications: true,
                    pushNotifications: true,
                    attendanceAlerts: true,
                    weeklyReports: false,
                    darkMode: false,
                    language: 'vi',
                    profileVisible: true,
                    showEmail: false,
                    autoBackup: true,
                    dataRetention: '12',
                })
                changeLanguage('vi')
                setIsLoading(false)
                showSuccess()
            }, 500)
        }
    }

    const handleDeleteAllData = () => {
        if (window.confirm(t('confirmDeleteData'))) {
            if (window.confirm(t('confirmDeleteDataFinal'))) {
                alert(t('demoNotImplemented'))
            }
        }
    }

    const ToggleSwitch = ({ enabled, onChange, loading = false }) => (
        <button
            onClick={onChange}
            disabled={loading || isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                enabled ? 'bg-indigo-600' : 'bg-slate-300'
            } ${loading || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
            aria-label={enabled ? t('disable') : t('enable')}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
            {(loading || isLoading) && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </button>
    )

    // Add PropTypes for ToggleSwitch
    ToggleSwitch.propTypes = {
        enabled: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        loading: PropTypes.bool
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in-right">
                        <HiOutlineCheck className="text-lg" />
                        <span className="text-sm font-medium">{t('settingsSaved')}</span>
                    </div>
                )}

                {/* Header */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 rounded-xl">
                                    <HiOutlineDatabase className="text-indigo-600 text-2xl" />
                                </div>
                                {t('systemSettings')}
                            </h1>
                            <p className="text-slate-600 mt-2 ml-14">{t('systemSettingsDesc')}</p>
                        </div>
                        <button 
                            onClick={handleResetToDefault}
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                        >
                            <HiOutlineRefresh className={`text-lg ${isLoading ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">{t('resetToDefault')}</span>
                            <span className="sm:hidden">Reset</span>
                        </button>
                    </div>
                </div>

                {/* Notifications Settings */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-100 rounded-xl">
                                <HiOutlineBell className="text-indigo-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{t('notifications')}</h2>
                                <p className="text-slate-600 mt-1">{t('notificationsDesc')}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineMail className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('emailNotifications')}</p>
                                    <p className="text-sm text-slate-500">{t('emailNotificationsDesc')}</p>
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.emailNotifications}
                                onChange={() => handleToggle('emailNotifications')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineDeviceMobile className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('pushNotifications')}</p>
                                    <p className="text-sm text-slate-500">{t('pushNotificationsDesc')}</p>
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.pushNotifications}
                                onChange={() => handleToggle('pushNotifications')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineBell className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('attendanceAlerts')}</p>
                                    <p className="text-sm text-slate-500">{t('attendanceAlertsDesc')}</p>
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.attendanceAlerts}
                                onChange={() => handleToggle('attendanceAlerts')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineDownload className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('weeklyReports')}</p>
                                    <p className="text-sm text-slate-500">{t('weeklyReportsDesc')}</p>
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.weeklyReports}
                                onChange={() => handleToggle('weeklyReports')}
                            />
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                {settings.darkMode ? (
                                    <HiOutlineMoon className="text-purple-600 text-xl" />
                                ) : (
                                    <HiOutlineSun className="text-purple-600 text-xl" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{t('appearance')}</h2>
                                <p className="text-slate-600 mt-1">{t('appearanceDesc')}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineMoon className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('darkMode')}</p>
                                    <p className="text-sm text-slate-500">{t('darkModeDesc')}</p>
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.darkMode}
                                onChange={() => handleToggle('darkMode')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineGlobe className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('language')}</p>
                                    <p className="text-sm text-slate-500">{t('languageDesc')}</p>
                                </div>
                            </div>
                            <select
                                value={language}
                                onChange={(e) => handleSelectChange('language', e.target.value)}
                                disabled={isLoading}
                                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white text-sm font-medium min-w-[120px]"
                            >
                                <option value="vi">🇻🇳 Tiếng Việt</option>
                                <option value="en">🇺🇸 English</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-emerald-100 rounded-xl">
                                <HiOutlineShieldCheck className="text-emerald-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{t('privacy')}</h2>
                                <p className="text-slate-600 mt-1">{t('privacyDesc')}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineEye className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('profileVisible')}</p>
                                    <p className="text-sm text-slate-500">{t('profileVisibleDesc')}</p>
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.profileVisible}
                                onChange={() => handleToggle('profileVisible')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineMail className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('showEmail')}</p>
                                    <p className="text-sm text-slate-500">{t('showEmailDesc')}</p>
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.showEmail}
                                onChange={() => handleToggle('showEmail')}
                            />
                        </div>
                    </div>
                </div>

                {/* System Settings */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <HiOutlineDatabase className="text-amber-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{t('system')}</h2>
                                <p className="text-slate-600 mt-1">{t('systemDesc')}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineDatabase className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('autoBackup')}</p>
                                    <p className="text-sm text-slate-500">{t('autoBackupDesc')}</p>
                                </div>
                            </div>
                            <ToggleSwitch 
                                enabled={settings.autoBackup}
                                onChange={() => handleToggle('autoBackup')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <HiOutlineTrash className="text-slate-500 text-xl" />
                                <div>
                                    <p className="font-medium text-slate-900">{t('dataRetention')}</p>
                                    <p className="text-sm text-slate-500">{t('dataRetentionDesc')}</p>
                                </div>
                            </div>
                            <select
                                value={settings.dataRetention}
                                onChange={(e) => handleSelectChange('dataRetention', e.target.value)}
                                disabled={isLoading}
                                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white text-sm font-medium min-w-[120px]"
                            >
                                <option value="3">{t('months3')}</option>
                                <option value="6">{t('months6')}</option>
                                <option value="12">{t('months12')}</option>
                                <option value="24">{t('months24')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-xl border-2 border-red-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 border-b border-red-200">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-xl">
                                <HiOutlineTrash className="text-red-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-red-900">{t('dangerZone')}</h2>
                                <p className="text-red-600 mt-1">{t('dangerZoneDesc')}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-2 border-red-200 rounded-xl bg-red-50">
                            <div className="flex items-start gap-3">
                                <HiOutlineX className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-red-900">{t('deleteAllData')}</p>
                                    <p className="text-sm text-red-600 mt-1">{t('deleteAllDataDesc')}</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleDeleteAllData}
                                disabled={isLoading}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium whitespace-nowrap shadow-sm hover:shadow-md"
                            >
                                {t('delete')}
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-2 border-red-200 rounded-xl bg-red-50">
                            <div className="flex items-start gap-3">
                                <HiOutlineRefresh className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-red-900">{t('resetSettings')}</p>
                                    <p className="text-sm text-red-600 mt-1">{t('resetSettingsDesc')}</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleResetToDefault}
                                disabled={isLoading}
                                className="border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium whitespace-nowrap"
                            >
                                {t('resetToDefault')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center py-6">
                    <p className="text-sm text-slate-500">
                        {t('systemVersion')}
                    </p>
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-40">
                    <div className="bg-white rounded-xl p-6 shadow-2xl flex items-center gap-3">
                        <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-slate-700 font-medium">{t('savingSettings')}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Settings 