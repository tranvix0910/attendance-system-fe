import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

export const getAllSubjectsByTeacherId = async (teacherId) => {
    try {
        if (!teacherId) {
            throw new Error('Teacher ID is required')
        }

        const response = await axios.get(`${API_BASE_URL}/api/subject/${teacherId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.data
    } catch (error) {
        console.error('Error fetching subjects by teacher ID:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

export const getSubjectById = async (subjectId) => {
    try {
        if (!subjectId) {
            throw new Error('Subject ID is required')
        }

        const response = await axios.get(`${API_BASE_URL}/api/subject/${subjectId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.data
    } catch (error) {
        console.error('Error fetching subject by ID:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

export const getSubjectStudent = async (subjectId) => {
    try {
        if (!subjectId) {
            throw new Error('Subject ID is required')
        }

        const response = await axios.get(`${API_BASE_URL}/api/subject/${subjectId}/students`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.data
    } catch (error) {
        console.error('Error fetching students of subject:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

export default {
    getAllSubjectsByTeacherId,
    getSubjectById,
    getSubjectStudent
}
