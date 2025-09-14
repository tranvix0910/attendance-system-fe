import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

/**
 * Get all classes with student counts
 * GET /api/class
 */
export const getAllClasses = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/class`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching all classes:', error.response?.data || error.message)
        throw {
            message: error.response?.data?.error || error.message,
            status: error.response?.status || 500,
            data: error.response?.data || null
        }
    }
}

export default {
    getAllClasses
}
