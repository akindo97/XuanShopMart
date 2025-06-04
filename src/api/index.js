import { BASE_URL } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Hàm call API
export async function apiRequest(endpoint, options = {}) {
    const url = BASE_URL + endpoint;
    const { method = 'GET', data, headers = {} } = options;

    try {
        const token = await AsyncStorage.getItem('token');

        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...headers,
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        };

        if (data && method !== 'GET') {
            fetchOptions.body = JSON.stringify(data);
        }

        const response = await fetch(url, fetchOptions);
        const rawText = await response.text();

        let result;
        try {
            console.log('rawText.length', rawText.length);
            result = rawText ? JSON.parse(rawText) : null;
        } catch (parseError) {
            throw new Error('Response is not valid JSON');
        }

        if (!response.ok) {
            const errorMsg = result?.message || 'API Error';
            const errorData = result?.errors || null;
            throw { message: errorMsg, errors: errorData };
        }

        return result;
    } catch (error) {
        console.error('API error:', error.message);
        throw error;
    }
}