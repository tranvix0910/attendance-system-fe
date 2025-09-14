import { useState, useEffect, useCallback } from 'react'
import { HiOutlineAcademicCap, HiOutlineUsers, HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineRefresh, HiOutlineArrowLeft, HiOutlineSearch, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { getAllSubjectsByTeacherId } from '../api/subject/getSubject'
import { getAllStudentsBySubjectId } from '../api/student/getStudent'
import { useLanguage } from '../contexts/LanguageContext'
import useUserAttributes from '../hooks/useUserAttributes'

const Subject = () => {
    const { t } = useLanguage()
    const [subjectData, setSubjectData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [studentsData, setStudentsData] = useState(null)
    const [studentsLoading, setStudentsLoading] = useState(false)
    const [studentsError, setStudentsError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const userAttributes = useUserAttributes()

    const fetchSubjects = useCallback(async () => {
        if (!userAttributes?.sub) return

        setLoading(true)
        setError(null)
        
        try {
            const response = await getAllSubjectsByTeacherId(userAttributes.sub)
            setSubjectData(response)
        } catch (error) {
            console.error('Error fetching teacher subjects:', error)
            setError(error.message || 'Failed to fetch subjects')
        } finally {
            setLoading(false)
        }
    }, [userAttributes])

    useEffect(() => {
        fetchSubjects()
    }, [fetchSubjects])

    const fetchStudentsForSubject = async (subjectId) => {
        setStudentsLoading(true)
        setStudentsError(null)
        
        try {
            const response = await getAllStudentsBySubjectId(subjectId)
            
            // Check if API returned an error response (but didn't throw)
            if (response && response.success === false && response.error && 
                response.error.includes('No students found for this subject')) {
                // Create empty response structure for empty class
                setStudentsData({
                    success: true,
                    subject: {
                        subject_id: response.subject_id || subjectId.toUpperCase(),
                        subject_name: selectedSubject?.subject_name || 'Unknown Subject'
                    },
                    data: [],
                    count: 0
                })
            } else if (response && response.success === false) {
                // Other API errors
                setStudentsError(response.error || 'Failed to fetch students')
            } else {
                // Successful response
                setStudentsData(response)
            }
        } catch (error) {
            console.error('Error fetching students for subject:', error)
            
            // Check if it's an empty class (not a real error)
            if (error.message && error.message.includes('No students found for this subject')) {
                // Create empty response structure for empty class
                setStudentsData({
                    success: true,
                    subject: {
                        subject_id: subjectId.toUpperCase(),
                        subject_name: selectedSubject?.subject_name || 'Unknown Subject'
                    },
                    data: [],
                    count: 0
                })
            } else {
                setStudentsError(error.message || 'Failed to fetch students')
            }
        } finally {
            setStudentsLoading(false)
        }
    }

    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject)
        fetchStudentsForSubject(subject.subject_id)
    }

    const handleBackToSubjects = () => {
        setSelectedSubject(null)
        setStudentsData(null)
        setStudentsError(null)
        setSearchTerm('')
    }

    const handleRefresh = () => {
        if (selectedSubject) {
            fetchStudentsForSubject(selectedSubject.subject_id)
        } else {
            fetchSubjects()
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-lg text-slate-600">{t('loadingSubjects')}</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <div className="text-red-600 text-lg font-medium mb-2">{t('errorLoadingSubjects')}</div>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={handleRefresh}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                    <HiOutlineRefresh className="mr-2" />
                    {t('tryAgain')}
                </button>
            </div>
        )
    }

    if (!subjectData) {
        return (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
                <HiOutlineBookOpen className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <p className="text-slate-600">{t('noSubjectsFound')}</p>
            </div>
        )
    }

    const { teacher, subjects, count } = subjectData

    // Filter students based on search term
    const filteredStudents = studentsData?.data?.filter(student =>
        student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    // If a subject is selected, show student detail view
    if (selectedSubject) {
        return (
            <div className="space-y-6">
                {/* Header with Back Button */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <button
                                onClick={handleBackToSubjects}
                                className="mr-4 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                            >
                                <HiOutlineArrowLeft className="h-6 w-6" />
                            </button>
                            <div className="flex items-center">
                                <div className="bg-indigo-100 p-3 rounded-full">
                                    <HiOutlineUsers className="h-8 w-8 text-indigo-600" />
                                </div>
                                <div className="ml-4">
                            <h1 className="text-2xl font-bold text-slate-900">{selectedSubject.subject_name}</h1>
                            <p className="text-slate-600">{t('subject')} ID: {selectedSubject.subject_id}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                            <HiOutlineRefresh className="mr-2 h-4 w-4" />
                            {t('refresh')}
                        </button>
                    </div>

                    {/* Subject Stats */}
                    {studentsData && (
                        <div className="bg-slate-50 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center">
                                    <HiOutlineUsers className="h-5 w-5 text-slate-600 mr-2" />
                                    <span className="text-sm text-slate-600">{t('totalStudents')}: </span>
                                    <span className="font-semibold text-slate-900 ml-1">{studentsData.count}</span>
                                </div>
                                <div className="flex items-center">
                                    <HiOutlineBookOpen className="h-5 w-5 text-slate-600 mr-2" />
                                    <span className="text-sm text-slate-600">{t('subject')}: </span>
                                    <span className="font-semibold text-slate-900 ml-1">{studentsData.subject?.subject_name}</span>
                                </div>
                                <div className="flex items-center">
                                    <HiOutlineClipboardList className="h-5 w-5 text-slate-600 mr-2" />
                                    <span className="text-sm text-slate-600">{t('showing')}: </span>
                                    <span className="font-semibold text-slate-900 ml-1">{filteredStudents.length} {t('students')}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                    <div className="relative">
                        <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('searchStudentsPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Students Loading/Error States */}
                {studentsLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <span className="ml-3 text-lg text-slate-600">{t('loadingStudents')}</span>
                    </div>
                )}

                {studentsError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <div className="text-red-600 text-lg font-medium mb-2">{t('errorLoadingStudents')}</div>
                        <p className="text-red-500 mb-4">{studentsError}</p>
                        <button
                            onClick={handleRefresh}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            <HiOutlineRefresh className="mr-2" />
                            {t('tryAgain')}
                        </button>
                    </div>
                )}

                {/* Students List */}
                {studentsData && !studentsLoading && !studentsError && (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-900">{t('studentsList')}</h2>
                            <p className="text-sm text-slate-600">
                                {filteredStudents.length} {t('of')} {studentsData.count} {t('students')}
                            </p>
                        </div>

                        {filteredStudents.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                {t('student')}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                {t('classes')}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                {t('contact')}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                {t('status')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {filteredStudents.map((student) => (
                                            <tr key={student.student_id} className="hover:bg-slate-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                                            {student.full_name.charAt(0)}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-slate-900">{student.full_name}</div>
                                                            <div className="text-sm text-slate-500">{student.student_id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-wrap gap-1">
                                                        {student.class_names ? student.class_names.split(',').map((className, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                                            >
                                                                {className.trim()}
                                                            </span>
                                                        )) : (
                                                            <span className="text-sm text-slate-500">{t('noClasses')}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-slate-900">
                                                        <div className="flex items-center mb-1">
                                                            <HiOutlineMail className="h-4 w-4 text-slate-400 mr-2" />
                                                            {student.email}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <HiOutlinePhone className="h-4 w-4 text-slate-400 mr-2" />
                                                            {student.phone_number}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        student.status === 1 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {student.status === 1 ? t('active') : t('inactive')}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <HiOutlineUsers className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                <h3 className="text-lg font-medium text-slate-900 mb-2">
                                    {searchTerm ? t('noStudentsFound') : t('emptyClass')}
                                </h3>
                                <p className="text-slate-600">
                                    {searchTerm 
                                        ? t('noStudentsMatch')
                                        : t('noStudentsEnrolled')}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }

    // Default subject list view
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="bg-indigo-100 p-3 rounded-full">
                            <HiOutlineAcademicCap className="h-8 w-8 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                            <h1 className="text-2xl font-bold text-slate-900">{t('mySubjects')}</h1>
                            <p className="text-slate-600">{t('manageSubjects')}</p>
                        </div>
                    </div>
                        <button
                        onClick={handleRefresh}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                        <HiOutlineRefresh className="mr-2 h-4 w-4" />
                        {t('refresh')}
                    </button>
                </div>

                {/* Teacher Info */}
                {teacher && (
                    <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="bg-slate-200 p-2 rounded-full">
                                <HiOutlineUsers className="h-5 w-5 text-slate-600" />
                            </div>
                            <div className="ml-3">
                                <h3 className="font-semibold text-slate-900">{teacher.teacher_name}</h3>
                                <p className="text-sm text-slate-600">{teacher.teacher_email}</p>
                                {teacher.teacher_phone && (
                                    <p className="text-sm text-slate-600">{teacher.teacher_phone}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <HiOutlineBookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-slate-600">{t('totalSubjects')}</p>
                            <p className="text-2xl font-bold text-slate-900">{count}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-full">
                            <HiOutlineClipboardList className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-slate-600">{t('activeSubjects')}</p>
                            <p className="text-2xl font-bold text-slate-900">{subjects?.length || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <HiOutlineAcademicCap className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-slate-600">{t('departments')}</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {new Set(subjects?.map(s => s.subject_id.substring(0, 3))).size || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subjects List */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">{t('subjectList')}</h2>
                    <p className="text-sm text-slate-600">{t('allSubjectsTeaching')}</p>
                </div>

                {subjects && subjects.length > 0 ? (
                    <div className="divide-y divide-slate-200">
                        {subjects.map((subject) => (
                            <div
                                key={subject.subject_id}
                                onClick={() => handleSubjectClick(subject)}
                                className="p-6 hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">
                                                    {subject.subject_id.substring(0, 3)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold text-slate-900">
                                                {subject.subject_name}
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                Subject ID: {subject.subject_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {t('active')}
                                        </span>
                                        <button className="ml-3 p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <HiOutlineBookOpen className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">{t('noSubjectsFound')}</h3>
                        <p className="text-slate-600">{t('noSubjectsAssigned')}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Subject
