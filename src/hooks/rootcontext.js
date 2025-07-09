import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiRequest } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { checkAndGetFcmToken } from '../firebase/firebaseNotification';

// Tạo context gốc
const RootContext = createContext(null);

// Provider cho context
export const RootProvider = ({ children }) => {
  const [deviceId, setDeviceId] = useState(null);

  // State lưu danh mục sản phẩm
  const [category, setCategory] = useState([]);
  // State lưu các banner image
  const [banner, setBanner] = useState([]);

  // State kiểm tra đăng nhập
  const [auth, setAuth] = useState(false);

  // State lưu thông tin user, address và token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [address, setAddress] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // State kiểm tra trạng thái loading khi xác thực

  // Khi app mở lại, load thông tin từ AsyncStorage và kiểm tra đăng nhập
  useEffect(() => {
    const loadStorage = async () => {
      // Lấy user và token từ AsyncStorage
      const storedToken = await AsyncStorage.getItem('auth_token');
      if (storedToken) {
        setToken(storedToken);

        // Gọi API kiểm tra token hợp lệ
        try {
          const res = await apiRequest('/profile', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
          });

          const { user, address } = res;
          setAuth(true);
          setUser(user);
          setAddress(address);
        } catch (err) {
          // console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
          setAuthLoading(false);
        }

      } else {
        setAuthLoading(false);
        // Ghi log để phân tích nếu chưa đăng nhập
        try {
          apiRequest('/access-log');
        } catch (err) {
        }
      }

      // Xin quyền thông báo và ghi
      checkAndGetFcmToken(storedToken);
    };
    loadStorage();
  }, []);

  // Hàm lưu thông tin user và token vào AsyncStorage
  const setUserInfo = async (info) => {
    const { token, user, address } = info;
    setAuth(true);
    setUser(user);
    setAddress(address);
    setToken(token);

    await AsyncStorage.setItem('auth_token', token);
  }

  // Logout
  const logoutAccount = async () => {
    await AsyncStorage.removeItem('auth_token');

    setAuth(false);
    setUser(null);
    setAddress(null);
    setToken(null);
  }

  // Lấy hoặc tạo ID thiết bị
  useEffect(() => {
    const loadDeviceId = async () => {
      try {
        const savedId = await AsyncStorage.getItem('device_id');

        if (savedId) {
          setDeviceId(savedId);
        } else {
          const newId = uuid.v4(); // Tạo UUID mới
          await AsyncStorage.setItem('device_id', newId);
          setDeviceId(newId);
        }
      } catch (error) {
        console.error('Lỗi khi lấy deviceId:', error);
      }
    };

    loadDeviceId();
  }, []);

  // Truyền các giá trị xuống các component con
  return (
    <RootContext.Provider value={{
      deviceId, category, banner,
      setCategory, setBanner, setUserInfo, setUser, setAddress, logoutAccount,
      user, address, token, auth, authLoading
    }}>
      {children}
    </RootContext.Provider>
  );
}

// Custom hook để sử dụng context
export const useRootContext = () => useContext(RootContext);