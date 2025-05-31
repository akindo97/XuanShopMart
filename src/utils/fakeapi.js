// giả lập data
export const XproductCatalog = [
    {
        id: 1,
        name: "Sale",
        icon: require("../../assets/icons/sale.png"),
        item: [
            {
                id: 1,
                name: 'Sản phẩm A Sản phẩm B',
                price: 1000,
                image: require('../../assets/images/bapbo.jpg'),
                frozen: true,
            },
            {
                id: 2,
                name: 'Sản phẩm A',
                price: 1000,
                image: { uri: 'https://bactom.com/wp-content/uploads/2023/06/thitbo_TNJU.jpg' },
            },
            {
                id: 3,
                name: 'Sản phẩm A',
                price: 1000,
                image: require('../../assets/images/bapbo.jpg'),
            },
            {
                id: 4,
                name: 'Sản phẩm A',
                price: 1000,
                image: require('../../assets/images/bapbo.jpg'),
            },
            {
                id: 5,
                name: 'Sản phẩm A',
                price: 1000,
                image: require('../../assets/images/bapbo.jpg'),
            }
        ]
    },
    {
        id: 2,
        name: "Thịt bò, lợn",
        icon: require("../../assets/icons/meat.png"),
        item: [
            {
                id: 123,
                name: 'Thịt ba chỉ (1kg)',
                price: 1000,
                frozen: true,
                image: {uri: 'https://vcdn1-suckhoe.vnecdn.net/2019/12/07/3-1p60g42555v7-1575707575-1794-1575707805.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=PB-xDL0S0c5hNxxWuFe6wA'},
            },
            {
                id: 125,
                name: 'Đùi lợn rút xương',
                price: 1390,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_13223e034204a9dfb675b4045829c24d.jpg'},
            },
            {
                id: 126,
                name: 'Giò đùi lợn cắt sẵn',
                price: 1050,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_38de25eb7a61e487baf76e9c5bb66a82.jpg'},
            },
            {
                id: 127,
                name: 'Tim lợn',
                price: 600,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_d3ff8e7ded3208ca8cfd9ce6e4e6f5b2.jpg'},
            },
            {
                id: 128,
                name: 'Thịt nạc vai heo',
                price: 860,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_0c4e8da71c55a214a8375c539ce0aede.jpg'},
            }
        ]
    },
    {
        id: 3,
        name: "Thịt gà, vịt",
        icon: require("../../assets/icons/poultry.png"),
        item: [
            {
                id: 215,
                name: 'Vịt xiêm nguyên con',
                price: 1600,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_9c32fc248861e2771a2d2626232ec333.jpg'},
            },
            {
                id: 216,
                name: 'Gà non',
                price: 620,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_d6215d130aa7cc341c36f8e47652bd2e.jpg'},
            },
            {
                id: 217,
                name: 'Vịt nguyên con đầu cổ',
                price: 1600,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_813475f923f2c855d8cb9d2bff4a4868.jpg'},
            },
            {
                id: 218,
                name: 'Cánh gà',
                price: 600,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_2db1fb0f5bc66c9302c5a3468f10cdaf.jpg'},
            },
            {
                id: 219,
                name: 'Mề gà',
                price: 600,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_a96ed2e051f06efa751f4f9e89b1ea9f.jpg'},
            },
            {
                id: 220,
                name: 'Thịt ức gà',
                price: 950,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_5fe80aebae06979c5359625bf044d1ff-450x450.jpeg'},
            }
        ]
    },
    {
        id: 4,
        name: "Thủy hải sản",
        icon: require("../../assets/icons/fish.png"),
        item: [
            {
                id: 315,
                name: 'Cá diêu hồng',
                price: 850,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_00b527faad543250ecbff6ccacc1c2d0.jpeg'},
            },
            {
                id: 316,
                name: 'Cá rô phi',
                price: 850,
                frozen: true,
                image: {uri: 'https://thaiduongmartvn.com/wp-content/uploads/2022/10/kiotviet_09078e22527525732caebb03f13be9bd-450x450.png'},
            },
            {
                id: 317,
                name: 'Sứa ăn liền',
                price: 550,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/sua_1_900x.jpg?v=1712994946'},
            },
            {
                id: 318,
                name: 'Cá Basa cắt khúc đông lạnh',
                price: 512,
                frozen: true,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/ca-basa-cat-khuc-dong-lanh-sesofoods_900x.jpg?v=1714104574'},
            },
            {
                id: 319,
                name: 'Cá trê cắt khúc đông lạnh',
                price: 776,
                frozen: true,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/ca-tre-cat-khuc_900x.webp?v=1696938706'},
            }
        ]
    },
    {
        id: 5,
        name: "Bún, mì, miến",
        icon: require("../../assets/icons/noodles.png"),
        item: [
            {
                id: 515,
                name: 'Bún tươi Safoco',
                price: 850,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/bun_tuoi_safoco_sesofoods_1080x.png?v=1743753308'},
            },
            {
                id: 516,
                name: 'Bún tươi Nhật Minh 300g',
                price: 171,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/bun-tuoi-nhat-minh-thak_900x.jpg?v=1739002502'},
            },
            {
                id: 517,
                name: 'Mì ăn liền Hảo Hảo',
                price: 105,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/sesofoods-mi-tom-hao-hao_900x.jpg?v=1722415209'},
            },
        ]
    },
    {
        id: 6,
        name: "Gia vị, nguyên liệu",
        icon: require("../../assets/icons/spice.png"),
        item: [
            {
                id: 615,
                name: 'Tương ớt Chinsu chai to 520ml',
                price: 525,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/sesofoods-tuong-ot-chinsu-520g_1080x.jpg?v=1722415019'},
            },
            {
                id: 616,
                name: 'Muối ớt chua cay Hảo Hảo 120g',
                price: 171,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/muoi_cham_hao_hao_120g_sesofoods_900x.png?v=1742973456'},
            },
            {
                id: 617,
                name: 'Nước Tương Maggi 700ml',
                price: 647,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/tuong-maggi_900x.jpg?v=1715219864'},
            },
        ]
    },
    {
        id: 7,
        name: "Bánh kẹo, ăn vặt",
        icon: require("../../assets/icons/snacks.png"),
        item: [
            {
                id: 715,
                name: 'Bánh AFC vị rau củ',
                price: 290,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/image_9b1a739c-37e9-4bf4-9869-ec8fdda0e8b3_1080x.jpg?v=1622789560'},
            },
            {
                id: 716,
                name: 'Snack cánh gà chiên giòn set 5 túi',
                price: 387,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/snack-hinh-canh-ga-chien-gion_1080x.jpg?v=1608476013'},
            },
            {
                id: 717,
                name: 'Bánh Pía Đậu-Sầu riêng- Trứng muối-Tân Huê Viên',
                price: 647,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/banh-pia-dau-sau-rieng_1_1080x.png?v=1617276793'},
            },
        ]
    },
    {
        id: 8,
        name: "Giò chả, chế biến sẵn",
        icon: require("../../assets/icons/ham.png"),
        item: [
            {
                id: 815,
                name: 'Giò Lụa 450g',
                price: 1000,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/gio_lua_vietnamdeli_sesofoods_900x.png?v=1743757131'},
            },
            {
                id: 816,
                name: 'Giò Bò 450g',
                price: 1000,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/gio_bo_vietnamdeli_sesofoods_1080x.png?v=1743753308'},
            },
            {
                id: 817,
                name: 'Giò Lụa Lá Chuối',
                price: 1100,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/gio_1_1080x.jpg?v=1718873586'},
            },
        ]
    },
    {
        id: 9,
        name: "Rau, củ, quả",
        icon: require("../../assets/icons/vegetable.png"),
        item: [
            {
                id: 915,
                name: 'Sả tươi',
                price: 450,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/sa-tuoi-sesofoods_900x.jpg?v=1722415241'},
            },
            {
                id: 916,
                name: 'Rau húng lủi 30g',
                price: 250,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/sesofoods-hung-lui_1_1080x.jpg?v=1601124365'},
            },
            {
                id: 917,
                name: 'Mùi tàu ( ngò gai) 30g',
                price: 250,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/sesofoods-ngo-gai_1_1080x.png?v=1648215327'},
            },
        ]
    }, {
        id: 10,
        name: "Drink",
        icon: require("../../assets/icons/drink.png"),
        item: [
            {
                id: 1015,
                name: 'Trà Vải Tự Nhiên – TH True TEA 350ml',
                price: 120,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/Thtrueteatravaitunhiensesofoods_900x.png?v=1744368250'},
            },
            {
                id: 1016,
                name: 'Sữa Trái Cây Mãng Cầu Tự Nhiên – TH true JUICE milk 300ml',
                price: 150,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/suatraicayThtruejuicemilkmangcausesofoods_900x.png?v=1744368203'},
            },
            {
                id: 1017,
                name: 'Sữa Tươi Bổ sung Ngũ Cốc TH true MILK LIGHT MEAL 180ml',
                price: 580,
                image: {uri: 'https://sesofoods.com/cdn/shop/files/suathtiettrungngucocsesofoods_900x.png?v=1744364011'},
            },
        ]
    },
    {
        id: 11,
        name: "Khác",
        icon: require("../../assets/icons/other.png"),
        item: [
            {
                id: 1115,
                name: 'Dao chẻ rau muống',
                price: 300,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/daocheraumuong-sesofoods_1_1080x.jpg?v=1626854375'},
            },
            {
                id: 1116,
                name: 'Khuôn xôi nhựa Phúc - Lộc -Thọ',
                price: 750,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/khuon-xoi_900x.jpg?v=1643108591'},
            },
            {
                id: 1117,
                name: 'Khuôn xôi nhựa các loại',
                price: 545,
                image: {uri: 'https://sesofoods.com/cdn/shop/products/khuonxoi_1080x.jpg?v=1625917530'},
            },
        ]
    }
];
