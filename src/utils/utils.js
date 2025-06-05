// đổi số hoặc chuỗi số thành định dạng tiền tệ Nhật Bản (Yen)
export const fToYen = (number) =>{
    if (number == null || number == undefined) return '';
    return Number(number).toLocaleString("ja-JP", { currency: "JPY" })
}

// Hàm kiểm tra email:
export const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};