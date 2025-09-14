import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineAcademicCap, HiOutlinePencil, HiOutlineCamera, HiOutlineKey } from 'react-icons/hi'
import useUserAttributes from '../hooks/useUserAttributes'

const Profile = () => {
    const { t } = useLanguage()
    const userAttributes = useUserAttributes()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        birthdate: '',
        position: '',
        department: '',
        experience: '',
        education: ''
    })

    // Update form data when userAttributes changes
    useEffect(() => {
        if (userAttributes) {
            setFormData({
                name: userAttributes.name || userAttributes.preferred_username || '',
                email: userAttributes.email || '',
                phone: userAttributes.phone_number || '',
                address: userAttributes.address || '',
                birthdate: userAttributes.birthdate || '',
                position: userAttributes.custom_position || '',
                department: userAttributes.custom_department || '',
                experience: userAttributes.custom_experience || '',
                education: userAttributes.custom_education || ''
            })
        }
    }, [userAttributes])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = () => {
        // TODO: Implement save logic to update user attributes
        console.log('Saving user data:', formData)
        setIsEditing(false)
        // Here you would typically call an API to update the user attributes
    }

    const handleCancel = () => {
        setIsEditing(false)
        if (userAttributes) {
            setFormData({
                name: userAttributes.name || userAttributes.preferred_username || '',
                email: userAttributes.email || '',
                phone: userAttributes.phone_number || '',
                address: userAttributes.address || '',
                birthdate: userAttributes.birthdate || '',
                position: userAttributes.custom_position || '',
                department: userAttributes.custom_department || '',
                experience: userAttributes.custom_experience || '',
                education: userAttributes.custom_education || ''
            })
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return t('notProvided') || 'Chưa cung cấp'
        try {
            return new Date(dateString).toLocaleDateString(
                t('language') === 'vi' ? 'vi-VN' : 'en-US'
            )
        } catch {
            return dateString
        }
    }

    const getDisplayValue = (value, fallback = null) => {
        return value || fallback || (t('notProvided') || 'Chưa cung cấp')
    }

    const getUserInitial = () => {
        if (formData.name) return formData.name.charAt(0).toUpperCase()
        if (userAttributes?.preferred_username) return userAttributes.preferred_username.charAt(0).toUpperCase()
        if (userAttributes?.name) return userAttributes.name.charAt(0).toUpperCase()
        return 'U'
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t('userProfile')}</h1>
                    <p className="text-sm sm:text-base text-slate-600 mt-1">{t('userProfileDesc')}</p>
                </div>
                <div className="flex items-center gap-3">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base"
                        >
                            <HiOutlinePencil className="text-lg" />
                            <span className="hidden sm:inline">{t('edit')}</span>
                            <span className="sm:hidden">{t('edit')}</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCancel}
                                className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 text-sm"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                onClick={handleSave}
                                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm"
                            >
                                {t('save')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto mb-4">
                                    {getUserInitial()}
                                </div>
                                <button className="absolute bottom-3 right-0 bg-white rounded-full p-2 shadow-md border border-slate-200 hover:bg-slate-50 transition-colors duration-200">
                                    <HiOutlineCamera className="text-slate-600 text-sm" />
                                </button>
                            </div>
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
                                {getDisplayValue(formData.name)}
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 mb-2">
                                {getDisplayValue(formData.position)}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-500">
                                {getDisplayValue(formData.department)}
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg">
                                        <HiOutlineAcademicCap className="text-slate-600 text-lg" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-slate-500">{t('education')}</p>
                                        <p className="text-sm font-medium text-slate-900 truncate">
                                            {getDisplayValue(formData.education)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg">
                                        <HiOutlineCalendar className="text-slate-600 text-lg" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-slate-500">{t('experience')}</p>
                                        <p className="text-sm font-medium text-slate-900">
                                            {getDisplayValue(formData.experience)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6">{t('personalInfo')}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlineUser className="inline mr-2" />
                                    {t('fullName')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder={t('enterFullName')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {getDisplayValue(formData.name)}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlineMail className="inline mr-2" />
                                    Email
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t('enterEmail')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {getDisplayValue(formData.email)}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlinePhone className="inline mr-2" />
                                    {t('phoneNumber')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder={t('enterPhoneNumber')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {getDisplayValue(formData.phone)}
                                    </p>
                                )}
                            </div>

                            {/* Birthdate */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlineCalendar className="inline mr-2" />
                                    {t('birthDate')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        name="birthdate"
                                        value={formData.birthdate}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {formData.birthdate ? formatDate(formData.birthdate) : getDisplayValue(null)}
                                    </p>
                                )}
                            </div>

                            {/* Position */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlineAcademicCap className="inline mr-2" />
                                    {t('position')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        placeholder={t('enterPosition')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {getDisplayValue(formData.position)}
                                    </p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlineAcademicCap className="inline mr-2" />
                                    {t('department')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        placeholder={t('enterDepartment')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {getDisplayValue(formData.department)}
                                    </p>
                                )}
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlineCalendar className="inline mr-2" />
                                    {t('experience')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        placeholder={t('enterExperience')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {getDisplayValue(formData.experience)}
                                    </p>
                                )}
                            </div>

                            {/* Education */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlineAcademicCap className="inline mr-2" />
                                    {t('education')}
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        placeholder={t('enterEducation')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {getDisplayValue(formData.education)}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <HiOutlineLocationMarker className="inline mr-2" />
                                    {t('address')}
                                </label>
                                {isEditing ? (
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows={2}
                                        placeholder={t('enterAddress')}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base resize-none"
                                    />
                                ) : (
                                    <p className="text-sm sm:text-base text-slate-900 py-2">
                                        {getDisplayValue(formData.address)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">{t('accountSecurity')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg">
                                <HiOutlineKey className="text-slate-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{t('changePassword')}</p>
                                <p className="text-xs text-slate-500">{t('updatePassword')}</p>
                            </div>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                            {t('change')}
                        </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg">
                                <HiOutlineMail className="text-slate-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{t('twoFactorAuth')}</p>
                                <p className="text-xs text-slate-500">{t('enhanceSecurity')}</p>
                            </div>
                        </div>
                        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                            {t('enable')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Debug Info - Remove in production */}
            {/* eslint-disable-next-line no-undef */}
            {process.env.NODE_ENV === 'development' && userAttributes && (
                <div className="bg-slate-100 rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Debug: User Attributes</h3>
                    <pre className="text-xs bg-white p-3 rounded border overflow-auto">
                        {JSON.stringify(userAttributes, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    )
}

export default Profile