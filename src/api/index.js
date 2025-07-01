import { BASE_URL } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Hàm call API
export async function apiRequest(endpoint, options = {}) {
    const url = BASE_URL + endpoint;
    const { method = 'GET', data, headers = {} } = options;
    const platform = Platform.OS; // 'ios' hoặc 'android'
    const deviceId = await AsyncStorage.getItem('device_id');

    try {
        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-Device-ID': deviceId,
                'X-Platform': platform,
                ...headers,
                // ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
            },
        };

        if (data && method !== 'GET') {
            fetchOptions.body = JSON.stringify(data);
        }

        const response = await fetch(url, fetchOptions);
        const rawText = await response.text();

        let result;
        try {
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