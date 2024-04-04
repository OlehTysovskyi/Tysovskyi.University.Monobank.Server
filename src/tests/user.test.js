// const request = require("supertest");
// const express = require("express");
// const bcrypt = require("bcrypt");
// const {
//   registerUser,
//   loginUser,
//   getUserById,
// } = require("../controllers/userController");
// const User = require("../models/user");

// const app = express();
// app.use(express.json());

// jest.mock("../models/user", () => ({
//   findOne: jest.fn(),
// }));

// describe("User Controller", () => {
//   describe("registerUser", () => {
//     // тести для registerUser
//   });

//   describe("loginUser", () => {
//     it("повинен успішно ввійти користувача з правильними даними", async () => {
//       const req = {
//         body: {
//           email: "test@example.com",
//           password: "testpassword",
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       const mockedUser = {
//         id: 1,
//         password_hash: await bcrypt.hash("testpassword", 10),
//       };
//       User.findOne.mockResolvedValue(mockedUser);
//       await loginUser(req, res);
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.send).toHaveBeenCalledWith({
//         message: "Login successful",
//         userId: 1,
//       });
//     });

//     it("повинен повернути 401 при неправильних облікових даних", async () => {
//       const req = {
//         body: {
//           email: "test@example.com",
//           password: "wrongpassword",
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       User.findOne.mockResolvedValue(null);
//       await loginUser(req, res);
//       expect(res.status).toHaveBeenCalledWith(401);
//       expect(res.send).toHaveBeenCalledWith({
//         message: "Invalid email or password",
//       });
//     });

//     it("повинен обробляти помилки", async () => {
//       const req = {
//         body: {
//           email: "test@example.com",
//           password: "testpassword",
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       User.findOne.mockRejectedValue(new Error("Database error"));
//       await loginUser(req, res);
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.send).toHaveBeenCalledWith({ message: "Error logging in" });
//     });
//   });

//   describe("getUserById", () => {
//     it("повинен отримати користувача за його ID", async () => {
//       const req = {
//         params: {
//           userId: 1,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       const mockedUser = {
//         id: 1,
//         username: "testuser",
//         email: "test@example.com",
//       };
//       User.findOne.mockResolvedValue(mockedUser);
//       await getUserById(req, res);
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.send).toHaveBeenCalledWith({ user: mockedUser });
//     });

//     it("повинен повернути 404, якщо користувача не знайдено", async () => {
//       const req = {
//         params: {
//           userId: 1,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       User.findOne.mockResolvedValue(null);
//       await getUserById(req, res);
//       expect(res.status).toHaveBeenCalledWith(404);
//       expect(res.send).toHaveBeenCalledWith({ message: "User not found" });
//     });

//     it("повинен обробляти помилки", async () => {
//       const req = {
//         params: {
//           userId: 1,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       User.findOne.mockRejectedValue(new Error("Database error"));
//       await getUserById(req, res);
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.send).toHaveBeenCalledWith({ message: "Error fetching user" });
//     });
//   });
// });
