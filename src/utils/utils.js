// đổi số hoặc chuỗi số thành định dạng tiền tệ Nhật Bản (Yen)
export const fToYen = (number) => {
  if (number == null || number == undefined) return '';
  return Number(number).toLocaleString("ja-JP", { currency: "JPY" })
}

// Hàm kiểm tra email:
export const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Lấy địa chỉ từ zipcode, trả về 2 callback: cbPref (tỉnh), cbCityAddr (thành phố + địa chỉ)
export const codeToAddress = async (zipcode, cbPref, cbCityAddr) => {
  if (!zipcode || typeof zipcode !== "string" || zipcode.length < 6 || zipcode.length > 8) {
    cbPref?.("");
    cbCityAddr?.("");
    return false;
  }
  try {
    const res = await fetch(`https://zipcoda.net/api?zipcode=${zipcode}`);
    const data = await res.json();
    const c = data.items?.[0]?.components || [];
    cbPref?.(c[0] || "");
    cbCityAddr?.((c[1] || "") + (c[2] || ""));
    return { xrpref: c[0] || "", xrcity: c[1] || "", xraddr: c[2] || "" };
  } catch (e) {
    cbPref?.("");
    cbCityAddr?.("");
    return false;
  }
}


/**
 * Định dạng chuỗi timestamp ISO (vd: "2025-06-05T16:36:28.000000Z") thành định dạng ngày/tháng/năm hoặc có thêm giờ.
 *
 * @param timestamp - Chuỗi ngày giờ ISO (ví dụ: "2025-06-05T16:36:28.000000Z")
 * @param withTime - Nếu là true, sẽ thêm giờ và phút vào kết quả (mặc định là false)
 * @returns Chuỗi ngày đã định dạng, ví dụ: "05/06/2025" hoặc "05/06/2025 16:36"
 */
export const formatDate = (timestamp, withTime = false) => {
  // Tạo đối tượng Date từ chuỗi timestamp
  const date = new Date(timestamp);
  // Lấy ngày, thêm số 0 phía trước nếu nhỏ hơn 10
  const day = date.getDate().toString().padStart(2, '0');
  // Lấy tháng (lưu ý: getMonth() trả từ 0 → 11, nên cần +1), thêm số 0 nếu cần
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  // Lấy năm đầy đủ (ví dụ: 2025)
  const year = date.getFullYear();
  if (withTime) {
    // Lấy giờ và phút, thêm số 0 nếu cần
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    // Trả về chuỗi ngày + giờ
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
  // Trả về chuỗi ngày nếu không cần giờ
  return `${day}/${month}/${year}`;
};

// Chuyển ngày thàng năm qua định dạng của mysql
export const toMySQLDate = (dateObj) => {
  return dateObj.toISOString().slice(0, 10);
};

// Xáo trộn mảng
export const shuffleArray = (array) => {
  const result = [...array]; // sao chép để không làm thay đổi mảng gốc
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]; // hoán đổi
  }
  return result;
}