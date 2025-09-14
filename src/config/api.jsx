// API Configuration
// You can set the API base URL through environment variables
// For development: VITE_API_BASE_URL=http://localhost:4000
// For production: VITE_API_BASE_URL=https://your-api-domain.com

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export default {
    API_BASE_URL
}
