const request = require("supertest");
const express = require("express");
const bcrypt = require("bcrypt");
const {
  registerUser,
  loginUser,
  getUserById,
} = require("../controllers/userController");
const User = require("../models/user");

const Card = require("../models/card");
const Transfer = require("../models/transfer");
const { createTransfer } = require("../controllers/transferController");

jest.mock("../models/user", () => ({
  findOne: jest.fn(),
}));

describe("User Controller", () => {
  describe("createCard", () => {
    it("повинен пройти успішно", async () => {});
  });
});
