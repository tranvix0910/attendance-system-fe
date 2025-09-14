import React, { useState, useEffect } from 'react'
import { HiOutlineCalendar, HiOutlineAcademicCap, HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi'
import { getScheduleByTeacherId } from '../api/schedule/getSchedule'
import { useLanguage } from '../contexts/LanguageContext'
import useUserAttributes from '../hooks/useUserAttributes'

const Schedule = () => {
    const { t } = useLanguage()
    const [scheduleData, setScheduleData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedWeek, setSelectedWeek] = useState(null)

    // Get user attributes to extract teacher ID
    const userAttributes = useUserAttributes()
    const teacherId = userAttributes?.sub

    // Function to transform API data to UI format
    const transformScheduleData = React.useCallback((apiData) => {
        return apiData.map((item) => {
            const dayOfWeekMap = {
                '2': 'Thứ 2',
                '3': 'Thứ 3', 
                '4': 'Thứ 4',
                '5': 'Thứ 5',
                '6': 'Thứ 6',
                '7': 'Thứ 7'
            }

            // Format time from HH:mm:ss to HH:mm
            const formatTime = (timeStr) => {
                if (!timeStr) return ''
                return timeStr.substring(0, 5)
            }

            return {
                id: `${item.subject_id}-${item.day}-${item.month}-${item.year}`,
                subject_id: item.subject_id,
                subject: item.subject_name,
                teacher: item.teacher_name,
                teacher_email: item.teacher_email,
                room: item.room,
                day: dayOfWeekMap[item.day_of_week] || `Thứ ${item.day_of_week}`,
                day_of_week: item.day_of_week,
                time: `${formatTime(item.start_time)} - ${formatTime(item.end_time)}`,
                start_time: item.start_time,
                end_time: item.end_time,
                date: `${item.day}/${item.month}/${item.year}`,
                full_date: new Date(item.year, item.month - 1, item.day),
                status: item.status,
                week: Math.ceil((item.day + new Date(item.year, item.month - 1, 1).getDay()) / 7)
            }
        })
    }, [])

    // Fetch schedule data
    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await getScheduleByTeacherId(teacherId)
                
                if (response.success && response.data) {
                    const transformedData = transformScheduleData(response.data)
                    setScheduleData(transformedData)
                    
                    // Set initial selected week to the first available week
                    if (transformedData.length > 0 && selectedWeek === null) {
                        const weeks = [...new Set(transformedData.map(item => item.week))].sort((a, b) => a - b)
                        setSelectedWeek(weeks[0])
                    }
                } else {
                    setError(t('errorLoadingSchedule'))
                }
            } catch (err) {
                console.error('Error fetching schedule:', err)
                setError(err.message || t('errorLoadingSchedule'))
            } finally {
                setLoading(false)
            }
        }

        if (teacherId) {
            fetchScheduleData()
        }
    }, [teacherId, transformScheduleData, selectedWeek, t])

    const timeSlots = ['07:00 - 10:15', '13:00 - 16:15']
    const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

    // Get available weeks with date ranges
    const getWeekInfo = () => {
        const weekMap = new Map()
        
        scheduleData.forEach(item => {
            if (!weekMap.has(item.week)) {
                // Find all dates for this week
                const weekDates = scheduleData
                    .filter(scheduleItem => scheduleItem.week === item.week)
                    .map(scheduleItem => scheduleItem.full_date)
                    .sort((a, b) => a - b)
                
                if (weekDates.length > 0) {
                    const startDate = weekDates[0]
                    const endDate = weekDates[weekDates.length - 1]
                    
                    const formatDate = (date) => {
                        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`
                    }
                    
                    weekMap.set(item.week, {
                        week: item.week,
                        startDate: startDate,
                        endDate: endDate,
                        displayText: `${t('week')} ${item.week} - ${t('from')} ${formatDate(startDate)} ${t('to')} ${formatDate(endDate)}`
                    })
                }
            }
        })
        
        return Array.from(weekMap.values()).sort((a, b) => a.week - b.week)
    }

    const availableWeeks = getWeekInfo()

    // Get schedule for selected week
    const selectedWeekSchedule = scheduleData.filter(item => item.week === selectedWeek)

    // Get today's schedule
    const todaySchedule = scheduleData.filter(item => {
        const today = new Date()
        return item.full_date && item.full_date.toDateString() === today.toDateString()
    })

    // Get current selected week info
    const selectedWeekInfo = availableWeeks.find(w => w.week === selectedWeek)

    // Loading state
    if (loading || !userAttributes || selectedWeek === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-lg text-slate-600">
                        {!userAttributes ? 'Đang tải thông tin người dùng...' : 'Đang tải lịch học...'}
                    </p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-lg mb-2">⚠️ Có lỗi xảy ra</div>
                    <p className="text-slate-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4">
            <div className="max-w-7xl mx-auto space-y-4">
                {/* Header */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">{t('mySchedule')}</h1>
                            <p className="text-sm text-slate-600">{t('weeklySchedule')}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                value={selectedWeek}
                                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm min-w-[280px]"
                            >
                                {availableWeeks.map(weekInfo => (
                                    <option key={weekInfo.week} value={weekInfo.week}>
                                        {weekInfo.displayText}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex items-center">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <HiOutlineCalendar className="text-indigo-600 text-lg" />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs font-medium text-slate-600">Hôm nay</p>
                                <p className="text-xl font-bold text-slate-900">{todaySchedule.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex items-center">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <HiOutlineAcademicCap className="text-indigo-600 text-lg" />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs font-medium text-slate-600">{t('week')} {selectedWeek}</p>
                                <p className="text-xl font-bold text-slate-900">{selectedWeekSchedule.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex items-center">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <HiOutlineClock className="text-indigo-600 text-lg" />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs font-medium text-slate-600">Tổng môn</p>
                                <p className="text-xl font-bold text-slate-900">
                                    {[...new Set(scheduleData.map(item => item.subject_id))].length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weekly Schedule Grid */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-900">
                            {selectedWeekInfo ? selectedWeekInfo.displayText : `${t('week')} ${selectedWeek}`}
                        </h2>
                    </div>
                    
                    {selectedWeekSchedule.length > 0 ? (
                        <div className="overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-24">
                                            Giờ
                                        </th>
                                        {days.map((day) => (
                                            <th key={day} className="px-2 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {timeSlots.map((timeSlot) => (
                                        <tr key={timeSlot} className="hover:bg-slate-50">
                                            <td className="px-3 py-2 text-xs font-medium text-slate-900 align-top">
                                                {timeSlot}
                                            </td>
                                            {days.map((day) => {
                                                const scheduleItems = selectedWeekSchedule.filter(item => 
                                                    item.time === timeSlot && item.day === day
                                                )
                                                return (
                                                    <td key={`${timeSlot}-${day}`} className="px-2 py-2 align-top">
                                                        <div className="space-y-1">
                                                            {scheduleItems.map((item) => (
                                                                <div
                                                                    key={item.id}
                                                                    className="bg-indigo-500 text-white p-2 rounded text-xs hover:bg-indigo-600 transition-colors duration-200 cursor-pointer"
                                                                    title={`${item.subject} - ${item.teacher} - ${item.room}`}
                                                                >
                                                                    <div className="font-semibold truncate">{item.subject_id}</div>
                                                                    <div className="opacity-90 truncate">{item.room}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <HiOutlineCalendar className="mx-auto h-12 w-12 text-slate-400" />
                            <h3 className="mt-2 text-sm font-medium text-slate-900">{t('noScheduleData')}</h3>
                            <p className="mt-1 text-sm text-slate-500">{t('week')} {selectedWeek} {t('noClassToday')}.</p>
                        </div>
                    )}
                </div>

                {/* Schedule Details */}
                {selectedWeekSchedule.length > 0 && (
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                        <div className="p-4 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {t('schedule')} - {selectedWeekInfo ? selectedWeekInfo.displayText : `${t('week')} ${selectedWeek}`}
                            </h3>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedWeekSchedule.map((item) => (
                                    <div key={item.id} className="border border-slate-200 rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="bg-indigo-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                {item.subject}
                                            </div>
                                            <span className="text-xs text-slate-500">{item.time}</span>
                                        </div>
                                        <h4 className="font-semibold text-sm text-slate-900 mb-2">{item.subject_id}</h4>
                                        <div className="space-y-1 text-xs text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <HiOutlineCalendar className="text-slate-400" />
                                                <span>{item.day} - {item.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <HiOutlineLocationMarker className="text-slate-400" />
                                                <span>{item.room}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Schedule