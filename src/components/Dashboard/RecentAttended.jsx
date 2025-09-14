import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock } from 'react-icons/hi'
import { getAllAttendance } from '../../api/attendance/getAttendance'
import { useLanguage } from '../../contexts/LanguageContext'

const getStatusIcon = (status) => {
    switch (status) {
        case 'PRESENT':
            return <HiOutlineCheckCircle className="text-green-500" />
        case 'ABSENT':
            return <HiOutlineXCircle className="text-red-500" />
        case 'LATE':
            return <HiOutlineClock className="text-yellow-500" />
        default:
            return <HiOutlineClock className="text-gray-500" />
    }
}

const getStatusText = (status, t) => {
    switch (status) {
        case 'PRESENT':
            return t('onTime')
        case 'ABSENT':
            return t('absentStatus')
        case 'LATE':
            return t('lateStatus')
        default:
            return t('notCheckedIn')
    }
}

const getStatusColor = (status) => {
    switch (status) {
        case 'PRESENT':
            return 'text-green-600 bg-green-50'
        case 'ABSENT':
            return 'text-red-600 bg-red-50'
        case 'LATE':
            return 'text-yellow-600 bg-yellow-50'
        default:
            return 'text-gray-600 bg-gray-50'
    }
}

export default function RecentAttendance() {
    const { t } = useLanguage()
    const [attendanceData, setAttendanceData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRecentAttendance = async () => {
            try {
                setLoading(true)
                const res = await getAllAttendance()
                
                if (res?.success && res?.data) {
                    // Sort by attended_at descending and take first 10 records
                    const sortedData = res.data
                        .filter(record => record.attended_at) // Only records with attendance time
                        .sort((a, b) => new Date(b.attended_at) - new Date(a.attended_at))
                        .slice(0, 10)
                    
                    setAttendanceData(sortedData)
                } else {
                    setAttendanceData([])
                }
            } catch (error) {
                console.error('Error fetching attendance data:', error)
                setAttendanceData([])
            } finally {
                setLoading(false)
            }
        }

        fetchRecentAttendance()
    }, [])

    if (loading) {
        return (
            <div className="bg-white px-6 pt-6 pb-6 rounded-xl border border-gray-200 shadow-sm flex-1">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('recentAttendance')}</h3>
                    <p className="text-sm text-gray-600">{t('latestAttendanceList')}</p>
                </div>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-600">{t('loading')}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white px-6 pt-6 pb-6 rounded-xl border border-gray-200 shadow-sm flex-1">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('recentAttendance')}</h3>
                <p className="text-sm text-gray-600">{t('latestAttendanceList')}</p>
            </div>
            <div className="overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 rounded-lg">
                        <tr className="text-sm font-medium text-gray-600">
                            <th className="p-3 text-left">{t('studentName')}</th>
                            <th className="p-3 text-left">{t('class')}</th>
                            <th className="p-3 text-left">{t('subjectName')}</th>
                            <th className="p-3 text-left">{t('statusLabel')}</th>
                            <th className="p-3 text-left">{t('time')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {attendanceData.length > 0 ? attendanceData.map((attendance) => (
                            <tr key={attendance.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="p-3">
                                    <div>
                                        <div className="font-medium text-gray-900">{attendance.student_name}</div>
                                        <div className="text-sm text-gray-500">#{attendance.student_id}</div>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {attendance.class_name}
                                    </span>
                                </td>
                                <td className="p-3 text-sm text-gray-600">{attendance.subject || 'N/A'}</td>
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(attendance.status)}
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attendance.status)}`}>
                                            {getStatusText(attendance.status, t)}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-3 text-sm text-gray-600">
                                    {format(new Date(attendance.attended_at), 'dd/MM/yyyy HH:mm')}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    {t('noRecentAttendance')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                    to="/attendance" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                >
                    {t('viewAllAttendance')} →
                </Link>
            </div>
        </div>
    )
}
