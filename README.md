# Yongji-Shares

# A.Mystic Waves
## 方式一：在 IDE 终端中运行
1. 打开 IDE 内置终端（通常快捷键为 `Ctrl + ``）
2. 输入以下命令：
python /Yongji-Shares/A/init.py
## 方式二：先切换到文件所在目录再运行
cd /Yongji-Shares/A
python init.py
## 运行后的交互方式
程序会等待输入，按照题目格式输入即可。例如：
**输入：**
4
1 4
2 5
3 6
4 7
**输出：**
0
2
0
4
## 注意事项
- 确保已安装 Python，可在终端输入 `python --version` 检查。
- 如果提示找不到命令，可尝试使用 `python3` 替代 `python`。

## Method 1: Run in IDE Terminal
1. Open the built-in terminal in your IDE (shortcut: `Ctrl + ``)
2. Enter the following command:
python /Yongji-Shares/A/init.py
## Method 2: Navigate to the file directory first
cd /Yongji-Shares/A
python init.py
## Interaction After Running
The program will wait for input. Enter data according to the problem format. For example:
**Input:**
4
1 4
2 5
3 6
4 7
**Output:**
0
2
0
4
## Notes
- Make sure Python is installed. Run `python --version` in the terminal to verify.
- If the command is not found, try using `python3` instead of `python`.

# B.Mystic Waves
## 方式一：在 IDE 终端中运行
1. 打开 IDE 内置终端（通常快捷键为 `Ctrl + ~`）
2. 输入以下命令：
python /Yongji-Shares/B/init.py
## 方式二：先切换到文件所在目录再运行
cd /Yongji-Shares/B
python init.py
## 运行后的交互方式
程序会等待输入，按照题目格式输入即可。例如：
**输入：**
4
4
7
24
998244353998244352
**输出：**
1 1
-1
4 6
166374058999707392 249561088499561088
## 注意事项
- 确保已安装 Python，可在终端输入 `python --version` 检查。
- 如果提示找不到命令，可尝试使用 `python3` 替代 `python`。

## Method 1: Run in IDE Terminal
1. Open the built-in terminal in your IDE (shortcut: `Ctrl + ~`)
2. Enter the following command:
python /Yongji-Shares/B/init.py
## Method 2: Navigate to the file directory first
cd /Yongji-Shares/B
python init.py
## Interaction After Running
The program will wait for input. Enter data according to the problem format. For example:
**Input:**
4
4
7
24
998244353998244352
**Output:**
1 1
-1
4 6
166374058999707392 249561088499561088
## Notes
- Make sure Python is installed. Run `python --version` in the terminal to verify.
- If the command is not found, try using `python3` instead of `python`.

## frontend 

# 电商产品详情页 / E-Commerce Product Detail Page
## 项目简介 / Project Overview
基于 **Next.js 16 + React 19 + TypeScript + Tailwind CSS 4** 构建的电商产品详情页面，支持产品展示、规格选择（颜色/存储容量）、数量控制、加入购物车等完整交互流程。所有 API 由 Next.js Route Handlers 提供，数据通过 Node.js 端模拟生成，无需外部后端。
A product detail page built with **Next.js 16 + React 19 + TypeScript + Tailwind CSS 4**. It supports product display, variant selection (color/storage), quantity control, and a full add-to-cart workflow. All APIs are served via Next.js Route Handlers with Node.js-simulated mock data — no external backend required.
---
## 技术栈 / Tech Stack
| 技术 / Technology | 版本 / Version | 用途 / Purpose                              |
| ----------------- | -------------- | ------------------------------------------- |
| Next.js           | 16.2.6         | 全栈框架 / Full-stack framework             |
| React             | 19.2.4         | UI 渲染 / UI rendering                      |
| TypeScript        | 5.x            | 类型安全 / Type safety                      |
| Tailwind CSS      | 4.x            | 原子化样式 / Utility-first styling          |
| ESLint            | 9.x            | 代码规范 / Code linting                     |
---
## 环境要求 / Prerequisites
- **Node.js** >= 18.18.0
- **npm** >= 9.x（或 yarn / pnpm / bun）
---
## 快速开始 / Getting Started
### 1. 安装依赖 / Install Dependencies
```bash
cd frontend
npm install
```
### 2.启动开发服务器 / Start Development Server
```bash
npm run dev
```
服务启动后访问 / After startup, visit:
http://localhost:3000

### 3.生产构建 / Production Build
```bash
npm run build
npm run start
```
### 4.代码检查 / Lint
```bash
npm run lint
```

### API 文档 / API Documentation
1.获取产品详情 / Get Product Detail
```
GET /api/product/:productId
```
成功响应 / Success Response (200):
```json
{
  "success": true,
  "data": {
    "productId": "P001",
    "name": "iPhone 15 Pro Max",
    "description": "产品描述...",
    "images": ["https://..."],
    "specs": [
      { "name": "颜色", "key": "color", "options": ["原色钛金属", "蓝色钛金属", ...] },
      { "name": "存储容量", "key": "size", "options": ["256GB", "512GB", "1TB"] }
    ],
    "variants": [
      { "skuId": "SKU-001", "color": "原色钛金属", "size": "256GB", "price": 9999, "stock": 15, "image": "..." }
    ]
  }
}
```
失败响应 / Error Response (404):
```json
{
  "success": false,
  "data": null,
  "message": "商品不存在"
}
```
2.加入购物车 / Add to Cart
```
POST /api/cart
Content-Type: application/json
{ "productId": "P001", "skuId": "SKU-001", "quantity": 1 }
```
成功响应 / Success Response (200):
```json
{
  "success": true,
  "cartCount": 3
}
```
失败响应 / Error Response (422):
```json
{
  "success": false,
  "cartCount": 2,
  "message": "库存不足"
}
```
3.获取购物车数量 / Get Cart Count
```
GET /api/cart
```
响应 / Response (200):
```json
{
  "success": true,
  "cartCount": 2
}
```