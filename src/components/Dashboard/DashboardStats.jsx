import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { IoBookOutline, IoBan } from 'react-icons/io5'
import { PiStudent, PiCheck } from 'react-icons/pi'
import { getAllStudents } from '../../api/student/getStudent'
import { getAllSubjectsByTeacherId } from '../../api/subject/getSubject'
import { getAllAttendance } from '../../api/attendance/getAttendance'
import { useLanguage } from '../../contexts/LanguageContext'
import useUserAttributes from '../../hooks/useUserAttributes'

export default function DashboardStatsGrid() {
    const { t } = useLanguage()
    const [studentCount, setStudentCount] = useState('—')
    const [classCount, setClassCount] = useState('—')
    const [todayAttendance, setTodayAttendance] = useState('—')
    const [todayAbsent, setTodayAbsent] = useState('—')
    const userAttributes = useUserAttributes()

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await getAllStudents()
                setStudentCount(res?.count?.toString() || '0')
            } catch (e) {
                setStudentCount('0')
            }
        }
        fetchCount()
    }, [])

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                if (!userAttributes?.sub) return
                const res = await getAllSubjectsByTeacherId(userAttributes.sub)
                // API returns count as total subjects
                setClassCount(res?.count?.toString() || (res?.subjects?.length?.toString() || '0'))
            } catch (e) {
                setClassCount('0')
            }
        }
        fetchClasses()
    }, [userAttributes])

    useEffect(() => {
        const fetchTodayAttendance = async () => {
            try {
                const res = await getAllAttendance()
                if (res?.success && res?.data) {
                    const today = new Date()
                    const todayStr = today.toISOString().split('T')[0] // YYYY-MM-DD format
                    
                    // Filter today's attendance records
                    const todayRecords = res.data.filter(record => {
                        if (record.attended_at) {
                            const recordDate = new Date(record.attended_at).toISOString().split('T')[0]
                            return recordDate === todayStr
                        }
                        return false
                    })
                    
                    // Calculate attendance stats
                    const totalToday = todayRecords.length
                    const presentToday = todayRecords.filter(record => record.status === 'PRESENT').length
                    const absentToday = todayRecords.filter(record => record.status === 'ABSENT').length
                    
                    if (totalToday > 0) {
                        const attendanceRate = ((presentToday / totalToday) * 100).toFixed(1)
                        setTodayAttendance(`${attendanceRate}%`)
                    } else {
                        setTodayAttendance('0%')
                    }
                    
                    setTodayAbsent(absentToday.toString())
                } else {
                    setTodayAttendance('0%')
                    setTodayAbsent('0')
                }
            } catch (e) {
                console.error('Error fetching attendance:', e)
                setTodayAttendance('0%')
                setTodayAbsent('0')
            }
        }
        fetchTodayAttendance()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatsCard
                title={t('totalStudentsCount')}
                value={studentCount}
                changeType="positive"
                icon={<PiStudent className="text-xl sm:text-2xl text-white" />}
                bgColor="bg-gradient-to-r from-indigo-500 to-indigo-600"
            />
            <StatsCard
                title={t('currentClasses')}
                value={classCount}
                changeType="positive"
                icon={<IoBookOutline className="text-xl sm:text-2xl text-white" />}
                bgColor="bg-gradient-to-r from-emerald-500 to-emerald-600"
            />
            <StatsCard
                title={t('todayAttendance')}
                value={todayAttendance}
                changeType="positive"
                icon={<PiCheck className="text-xl sm:text-2xl text-white" />}
                bgColor="bg-gradient-to-r from-teal-500 to-teal-600"
            />
            <StatsCard
                title={t('todayAbsent')}
                value={todayAbsent}
                changeType="negative"
                icon={<IoBan className="text-xl sm:text-2xl text-white" />}
                bgColor="bg-gradient-to-r from-rose-500 to-rose-600"
            />
        </div>
    )
}

function StatsCard({ title, value, change, changeType, icon, bgColor, description }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1 truncate">{title}</p>
                    <div className="flex items-baseline flex-wrap gap-1">
                        <p className="text-xl sm:text-2xl font-bold text-slate-900">{value}</p>
                        <span className={`text-xs sm:text-sm font-medium ${
                            changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                            {change}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 truncate">{description}</p>
                </div>
                <div className={`${bgColor} p-2 sm:p-3 rounded-lg shadow-md flex-shrink-0 ml-3`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    change: PropTypes.string.isRequired,
    changeType: PropTypes.oneOf(['positive', 'negative']).isRequired,
    icon: PropTypes.node.isRequired,
    bgColor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

function BoxWrapper({ children }) {
    return (
        <div className="p-4 flex-1 rounded-sm border border-stroke bg-white py-7.5 px-6 shadow-default">{children}</div>
    )
}

BoxWrapper.propTypes = {
    children: PropTypes.node.isRequired
}
