import axios from 'axios'

const API_URL = 'http://localhost:4000/subject'

const getSubjectClasses = async (subject_id) => {
    try {
        const url = `${API_URL}/${subject_id}`
        const response = await axios.post(url, {}, { headers: { 'Content-Type': 'application/json' } })
        return response.data
    } catch (error) {
        console.error('Error fetching teacher subjects:', error.response?.data || error.message)
        throw error
    }
}

export default getSubjectClasses
