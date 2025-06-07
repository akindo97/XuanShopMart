import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiRequest } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo context gốc
const RootContext = createContext(null);

// Provider cho context
export const RootProvider = ({ children }) => {
  const [deviceId, setDeviceId] = useState('999999999');

  // State lưu danh mục sản phẩm
  const [category, setCategory] = useState([]);

  // State kiểm tra đăng nhập
  const [auth, setAuth] = useState(false);

  // State lưu thông tin user và token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // State kiểm tra trạng thái loading khi xác thực

  // Khi app mở lại, load thông tin từ AsyncStorage và kiểm tra đăng nhập
  useEffect(() => {
    const loadStorage = async () => {
      // Lấy user và token từ AsyncStorage
      const storedUser = await AsyncStorage.getItem('auth_user');
      const storedToken = await AsyncStorage.getItem('auth_token');
      if (storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);

        // Gọi API kiểm tra token hợp lệ
        try {
          const res = await apiRequest('/profile', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
          });
          console.log(res);
          const { user } = res;
          setAuth(true);
          setUser(user);
        } catch (err) {
          console.log(err.message || 'Đã có lỗi xảy ra');
        } finally {
          setAuthLoading(false);
        }

      } else {
        setAuthLoading(false);
      }
    };
    loadStorage();
  }, []);

  // Hàm lưu thông tin user và token vào AsyncStorage
  const setUserInfo = async (info) => {
    const { token, user } = info;
    setAuth(true);
    setUser(user);
    setToken(token);

    await AsyncStorage.setItem('auth_user', JSON.stringify(user));
    await AsyncStorage.setItem('auth_token', token);
  }

  // Logout
  const logoutAccount = async () => {
    await AsyncStorage.removeItem('auth_user');
    await AsyncStorage.removeItem('auth_token');

    setAuth(false);
    setUser(null);
    setToken(null);
  }

  // Truyền các giá trị xuống các component con
  return (
    <RootContext.Provider value={{
      deviceId, category, setCategory,
      setUserInfo, setUser, logoutAccount,
      user, token, auth, authLoading
    }}>
      {children}
    </RootContext.Provider>
  );
}

// Custom hook để sử dụng context
export const useRootContext = () => useContext(RootContext);