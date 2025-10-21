# Hệ thống Quản lý Kho

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```

### 3. Build production
```bash
npm run build
```

## 📁 Cấu trúc thư mục

```
src/
├── components/
│   ├── Charts/           # Biểu đồ (LineChart, BarChart, AreaChart)
│   ├── register/         # Form đăng ký
│   ├── sidebar/          # Navigation sidebar
│   └── Helper/          # Utilities (CallAPI.js)
├── App.vue              # Main component
├── main.js              # Entry point
└── style.css            # Global styles
```

## 🔧 Tính năng chính

- ✅ **Authentication**: Đăng nhập/đăng ký
- ✅ **Dashboard**: Biểu đồ thống kê
- ✅ **Quản lý Loại Hàng**: CRUD operations
- ✅ **Quản lý Nhà Cung Cấp**: CRUD operations
- ✅ **Responsive Design**: Mobile-friendly
- ✅ **Modern UI**: Tailwind CSS + Vue 3

## 🎯 Cách sử dụng

1. **Đăng nhập**: admin@example.com / 123456
2. **Navigation**: Sử dụng sidebar để chuyển trang
3. **Forms**: Thêm/sửa/xóa dữ liệu
4. **Charts**: Xem thống kê trực quan

## 🛠️ Tech Stack

- **Vue 3** + Composition API
- **Tailwind CSS** cho styling
- **Chart.js** cho biểu đồ
- **Axios** cho API calls
- **Vite** cho build tool