import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

export const getAllStudents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/student`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching all students:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

export const getAllStudentsByClassId = async (classId) => {
    try {
        if (!classId) {
            throw new Error('Class ID is required')
        }

        const response = await axios.get(`${API_BASE_URL}/api/student/${classId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching students by class ID:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

/**
 * Get all students by subject ID
 * GET /api/student/:subject_id/students
 */
export const getAllStudentsBySubjectId = async (subjectId) => {
    try {
        if (!subjectId) {
            throw new Error('Subject ID is required')
        }

        const response = await axios.get(`${API_BASE_URL}/api/student/${subjectId}/students`, {
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

export default { getAllStudents, getAllStudentsByClassId, getAllStudentsBySubjectId }


