// const Card = require("../models/card");
// const Transfer = require("../models/transfer");
// const { createTransfer } = require("../controllers/transferController");

// describe("Transfer Controller", () => {
//   describe("createTransfer", () => {
//     it("повинен створити новий переказ", async () => {
//       const req = {
//         body: {
//           sender_card_num: "sender_card_number",
//           recipient_card_num: "recipient_card_number",
//           amount: 100,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };

//       const senderCardMock = {
//         balance: 200,
//         update: jest.fn(),
//       };
//       const recipientCardMock = {
//         balance: 100,
//         update: jest.fn(),
//       };
//       const transferMock = {
//         id: 1,
//         sender_card_num: "sender_card_number",
//         recipient_card_num: "recipient_card_number",
//         amount: 100,
//         date: new Date(),
//       };

//       jest
//         .spyOn(Card, "findOne")
//         .mockResolvedValueOnce(senderCardMock)
//         .mockResolvedValueOnce(recipientCardMock);

//       jest.spyOn(Transfer, "create").mockResolvedValue(transferMock);

//       await createTransfer(req, res);

//       expect(Card.findOne).toHaveBeenCalledWith({
//         where: { number: "sender_card_number" },
//       });
//       expect(Card.findOne).toHaveBeenCalledWith({
//         where: { number: "recipient_card_number" },
//       });
//       expect(senderCardMock.update).toHaveBeenCalledWith({ balance: 100 });
//       expect(recipientCardMock.update).toHaveBeenCalledWith({ balance: 200 });
//       expect(Transfer.create).toHaveBeenCalledWith({
//         sender_card_num: "sender_card_number",
//         recipient_card_num: "recipient_card_number",
//         amount: 100,
//         date: expect.any(Date),
//       });
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith(transferMock);
//     });

//     it("повинен повертати помилку, якщо картка відправника не знайдена", async () => {
//       const req = {
//         body: {
//           sender_card_num: "sender_card_number",
//           recipient_card_num: "recipient_card_number",
//           amount: 100,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };

//       jest.spyOn(Card, "findOne").mockResolvedValueOnce(null);

//       await createTransfer(req, res);

//       expect(Card.findOne).toHaveBeenCalledWith({
//         where: { number: "sender_card_number" },
//       });
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.send).toHaveBeenCalledWith({
//         message: "You do not have such card",
//       });
//     });

//     it("повинен повертати помилку, якщо недостатньо коштів на картці відправника", async () => {
//       const req = {
//         body: {
//           sender_card_num: "sender_card_number",
//           recipient_card_num: "recipient_card_number",
//           amount: 200,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };

//       const senderCardMock = {
//         balance: 100,
//       };

//       jest.spyOn(Card, "findOne").mockResolvedValueOnce(senderCardMock);

//       await createTransfer(req, res);

//       expect(Card.findOne).toHaveBeenCalledWith({
//         where: { number: "sender_card_number" },
//       });
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.send).toHaveBeenCalledWith({
//         message: "You do not have enough balance",
//       });
//     });

//     it("повинен повертати помилку, якщо картка одержувача не знайдена", async () => {
//       const req = {
//         body: {
//           sender_card_num: "sender_card_number",
//           recipient_card_num: "recipient_card_number",
//           amount: 100,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };

//       const senderCardMock = {
//         balance: 200,
//       };

//       jest
//         .spyOn(Card, "findOne")
//         .mockResolvedValueOnce(senderCardMock)
//         .mockResolvedValueOnce(null);

//       await createTransfer(req, res);

//       expect(Card.findOne).toHaveBeenCalledWith({
//         where: { number: "sender_card_number" },
//       });
//       expect(Card.findOne).toHaveBeenCalledWith({
//         where: { number: "recipient_card_number" },
//       });
//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.send).toHaveBeenCalledWith({
//         message: "You entered wrong card number",
//       });
//     });

//     it("повинен обробляти помилки", async () => {
//       const req = {
//         body: {
//           sender_card_num: "sender_card_number",
//           recipient_card_num: "recipient_card_number",
//           amount: 100,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };

//       jest
//         .spyOn(Card, "findOne")
//         .mockRejectedValue(new Error("Database error"));

//       await createTransfer(req, res);

//       expect(Card.findOne).toHaveBeenCalledWith({
//         where: { number: "sender_card_number" },
//       });
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({
//         message: "Error while creating card",
//       });
//     });
//   });
// });
