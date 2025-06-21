# User Routing Overview

This project uses a modular structure to handle user-related API routes in a clean and scalable way. Here's a breakdown of the components involved:

---

## 1. Entry Point: `index.js`

```js
import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use("/api/users", userRouter); // All user-related routes start with /api/users

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

---

## 2. Route Definition: `user.routes.js`

```js
import express from "express";
import { testUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", testUser); // Handles GET request to /api/users/test

export default router;
```

---

## 3. Controller Logic: `user.controller.js`

```js
export const testUser = (req, res) => {
  res.status(200).json({
    message: "User route is working",
  });
};
```

---

## Why This Structure?

- **Separation of Concerns**: Logic (controller) and routing (routes) are kept separate.
- **Scalability**: You can easily add more routes and controllers as your app grows.
- **Clarity**: Each file has one clear responsibility.

---

## Route Flow Summary

```
Client Request
     ↓
/api/users/test (GET)
     ↓
user.routes.js → Matches "/test"
     ↓
Calls testUser() in user.controller.js
     ↓
Responds with JSON: { message: "User route is working" }
```
