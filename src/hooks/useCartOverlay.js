import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

const CartUIContext = createContext();

// Hàm tạo context cho CartUI
export const CartUIProvider = ({ children }) => {
  // State để quản lý trạng thái đã tải dữ liệu
  const [isLoaded, setIsLoaded] = useState(false);
  // State lưu trữ thông tin các sản phẩm trong giỏ hàng
  const [cartItems, setCartItems] = useState([]);
  // State để quản lý trạng thái hiển thị giỏ hàng
  const [visible, setVisible] = useState(false);
  // State để lưu thông tin chi tiết sản phẩm
  const [productDetail, setproductDetail] = useState();
  // State để lưu tổng số lượng sản phẩm trong giỏ hàng
  const [totalQuantity, setTotalQuantity] = useState(0);
  // State để lưu tổng giá trị giỏ hàng
  const [totalPrice, setTotalPrice] = useState(0);
  // State để lưu điểm có thể nhận được
  const [getbonusPoint, setGetBonusPoint] = useState(0);
  // State để tổng cân nặng
  const [totalWeight, setTotalWeight] = useState(0);
  // 
  const [selectId, setSelectId] = useState(0);

  // Hàm hiển thị thông tin sản phẩm để thêm vào giỏ hàng
  const addToCartShow = (productDetail) => {
    setproductDetail(productDetail);
    setVisible(true);
  };

  // Hàm ẩn thông tin sản phẩm
  const addToCartHide = () => {
    setVisible(false);
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (quantity, productDetail) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === productDetail.id);
      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        return prevItems.map(item =>
          item.id === productDetail.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // Nếu sản phẩm chưa có, thêm mới với số lượng 1
      return [...prevItems, { ...productDetail, quantity: quantity }];
    });
    // Ẩn thông tin sản phẩm sau khi thêm vào giỏ hàng
    addToCartHide();
    // Hiển thị thông báo đã thêm vào giỏ hàng
    showMessage({
      message: 'Đã thêm vào giỏ hàng',
      type: "info",
    });
  };

  // Hàm thay đổi số lượng sản phẩm trong giỏ hàng
  const changeQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (!isLoaded) return;
    // Tính tổng số lượng và tổng giá trị giỏ hàng mỗi khi cartItems thay đổi
    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(totalQty);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(totalPrice);
    // Tính điểm nhận được mỗi khi thay đổi
    const totalPoint = cartItems.reduce((sum, item) => sum + (item.bonus_point * item.quantity), 0);
    setGetBonusPoint(totalPoint);
    // Tính cân nặng mỗi khi thay đổi
    const totalWei = cartItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    setTotalWeight(totalWei);

    // Lưu giỏ hàng vào AsyncStorage
    // chưa xử lý lỗi
    AsyncStorage.setItem('cartItems', JSON.stringify(cartItems)).catch(console.error);
    console.log('Giỏ hàng đã được lưu vào AsyncStorage:', cartItems);
  }, [cartItems]);


  // Hàm xóa toàn bộ sản phẩm khỏi giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  }

  // Hàm load giỏ hàng từ AsyncStorage khi component mount
  useEffect(() => {
    console.log('Loading cart from AsyncStorage...');
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cartItems');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (e) {
        console.error('Lỗi khi load giỏ hàng:', e);
      } finally {
        setIsLoaded(true); // Đánh dấu đã load xong
      }
    };

    loadCart();
  }, []);

  return (
    <CartUIContext.Provider value={{
      visible, productDetail, addToCartShow, addToCartHide,
      cartItems, totalQuantity, totalPrice, getbonusPoint, totalWeight,
      setCartItems, addToCart, changeQuantity, removeFromCart, clearCart,
      selectId, setSelectId
    }}>
      {children}
    </CartUIContext.Provider>
  );
};

export const useCartUI = () => useContext(CartUIContext);
