import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

/**
 * Get all attendance records
 * GET /api/attendance
 */
export const getAllAttendance = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/attendance`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching all attendance:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

/**
 * Get attendance records by class ID
 * GET /api/attendance/:class_id
 */
export const getAllAttendanceByClassId = async (classId) => {
    try {
        if (!classId) throw new Error('Class ID is required')
        const response = await axios.get(`${API_BASE_URL}/api/attendance/${classId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching attendance by class ID:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

/**
 * Get students summary by subject ID (attendance perspective)
 * GET /api/attendance/:subject_id
 */
export const getAllStudentsBySubjectId = async (subjectId) => {
    try {
        if (!subjectId) throw new Error('Subject ID is required')
        const response = await axios.get(`${API_BASE_URL}/api/attendance/${subjectId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching students by subject ID:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

/**
 * Get attendance records by student ID
 * GET /api/attendance/:student_id
 */
export const getAllAttendanceByStudentId = async (studentId) => {
    try {
        if (!studentId) throw new Error('Student ID is required')
        const response = await axios.get(`${API_BASE_URL}/api/attendance/${studentId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching attendance by student ID:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

export default {
    getAllAttendance,
    getAllAttendanceByClassId,
    getAllStudentsBySubjectId,
    getAllAttendanceByStudentId
}


