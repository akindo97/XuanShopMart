// đổi số hoặc chuỗi số thành định dạng tiền tệ Nhật Bản (Yen)
export const fToYen = (number) =>{
    if (number == null || number == undefined) return '';
    return Number(number).toLocaleString("ja-JP", { currency: "JPY" })
}