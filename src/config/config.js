// URL API
export const BASE_URL = 'https://api.xuanshopvietnhatmart.com/api'; // Product
// export const BASE_URL = 'http://127.0.0.1:8000/api'; // Test

// URL ảnh
export const IMAGE_URL = 'https://api.xuanshopvietnhatmart.com'; // Product
// export const IMAGE_URL = 'http://127.0.0.1:8000'; // Test

// Số lượng item hiển thị khi tạo list ngang
export const MAX_ITEM = 10;

// Tổng cân nặng có thể vận chuyển
export const MAX_WEIGHT = 24.5;

// ID messenger FB
export const FB_ID = '449307281591006';

// URL App Store
export const AppStore = 'https://apps.apple.com/app/XuanShopVietNhat';
// URL CH Play
export const CHPlay = 'https://play.google.com/store/apps/details?id=com.anonymous.XuanShopMart';


// Thời gian nhận hàng
export const DELIVERY_TIME = [
    { label: 'Không yêu cầu', value: 'Không yêu cầu' },
    { label: '9h ~ 12h', value: '9h ~ 12h' },
    { label: '12h ~ 14h', value: '12h ~ 14h' },
    { label: '14h ~ 16h', value: '14h ~ 16h' },
    { label: '16h ~ 18h', value: '16h ~ 18h' },
    { label: '18h ~ 20h', value: '18h ~ 20h' },
    { label: '19h ~ 21h', value: '19h ~ 21h' },
];

// Hình thức thanh toán
export const PAY_METHOD = {
    transfer: {
        key: 'bank_info',
        label: 'Chuyển khoản ngân hàng',
        value: 'Chuyển khoản ngân hàng',
        shorten: 'Chuyển khoản'
    },
    cod: {
        key: 'cod_info',
        label: 'Thanh toán khi nhận hàng (Daibiki)',
        value: 'Thanh toán khi nhận hàng',
        shorten: 'ship Daibiki'
    }
}

// Trạng thái đơn hàng
export const ORDER_STATUS = {
    0: {
        label: 'Tất cả',
        color: '#000000',
    },
    1: {
        label: 'Đợi xác nhận',
        color: '#FF0000',
    },
    2: {
        label: 'Đã xác nhận',
        color: '#FF9900',
    },
    3: {
        label: 'Đã vận chuyển',
        color: '#33FF00',
    },
    5: {
        label: 'Hoàn thành',
        color: '#33FF00',
    },
    11: {
        label: 'Đã hủy',
        color: '#000000',
    },
    
}