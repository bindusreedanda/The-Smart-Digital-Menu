# 🍽️ The Smart Digital Menu

A modern, interactive restaurant ordering web application where customers can browse a digital food menu, add items to their cart, and place orders in real-time.

---

## 🌟 Features

- 🔍 Interactive food menu (Veg, Non-Veg, Drinks, Desserts)
- 🛒 Cart system with quantity control and total calculation
- 📦 Backend order processing with MongoDB
- 🧑‍🍳 Dedicated sections for About Us, Services, and Contact
- 📷 Image-based product display
- 🌐 Responsive design

---

## 🧱 Tech Stack

### 👨‍💻 Frontend
- HTML5, CSS3, JavaScript
- Pages: `1st page.html`, `About.html`, `Food Menu.html`, `Veg.html`, `Non-Veg.html`, `Desserts.html`, `Drinks.html`, `Services.html`, `Contact Us.html`
- Dynamic cart with localStorage and `cart.js`

### ⚙️ Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS for cross-origin communication
- `.env` for config management

---

## 📁 Project Structure

```
DBS/
├── backend/
│   ├── server.js
│   ├── .env
│
├── frontend/
│   ├── 1st page.html
│   ├── About.html
│   ├── Food Menu.html
│   ├── Veg.html
│   ├── Non-Veg.html
│   ├── Desserts.html
│   ├── Drinks.html
│   ├── Services.html
│   ├── Contact Us.html
│   ├── cart.js
│   └── Images/ (served statically)
```

---

## ⚙️ How to Run

### 📦 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   Create a `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/restaurantDB
   PORT=5000
   ```

4. Start the server:
   ```bash
   node server.js
   ```

---

### 🌍 Frontend Usage

Just open `1st page.html` in your browser. It links to all other pages and communicates with the backend server.

> Ensure the backend is running at `http://localhost:5000` for order functionality to work.

---

## 🔌 API Endpoints

### POST `/order`
Submits a customer's order.

```json
{
  "name": "Bindu",
  "phone": "9876543210",
  "table": 3,
  "items": [
    { "name": "Donut", "price": 130, "quantity": 2 },
    { "name": "Mango Juice", "price": 70, "quantity": 1 }
  ],
  "totalPrice": 330
}
```

### GET `/test-image/:filename`
Returns an image from the `Images` folder.

### GET `/`
Serves `1st page.html`

---

## 🙌 Team

**Created by:** Bindu  
**Email:** bindusree0274@gmail.com

---

## 📸 Screenshots

> _Add screenshots of homepage, menu, cart, and order confirmation if needed._

---

## 📝 License

Free to use for educational purposes. For commercial use, please contact the owner.