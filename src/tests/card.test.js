// const {
//   createCard,
//   getUserCards,
//   getCardById,
// } = require("../controllers/cardController");
// const Card = require("../models/card");

// describe("Card Controller", () => {
//   describe("createCard", () => {
//     it("повинен створити нову картку", async () => {
//       const req = {
//         body: {
//           user_id: 1,
//           type: "WHITE",
//           balance: 1000,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//       const mockCard = {
//         id: 1,
//         user_id: 1,
//         number: "1234567890123456",
//         type: "BLACK",
//         balance: 1000,
//       };
//       jest.spyOn(Card, "create").mockResolvedValue(mockCard);
//       await createCard(req, res);
//       expect(Card.create).toHaveBeenCalledWith({
//         user_id: 1,
//         number: expect.any(String), // Ensure a random number is generated
//         type: "BLACK",
//         balance: 1000,
//         expiry_date: expect.any(Date),
//       });
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith(mockCard);
//     });

//     it("повинен обробляти помилки", async () => {
//       const req = {
//         body: {
//           user_id: 1,
//           type: "WHITE",
//           balance: 1000,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//       jest.spyOn(Card, "create").mockRejectedValue(new Error("Database error"));
//       await createCard(req, res);
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({
//         message: "Error while creating card",
//       });
//     });
//   });

//   describe("getUserCards", () => {
//     it("повинен отримати картки користувача за його ID", async () => {
//       const req = {
//         params: {
//           userId: 1,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       const mockCards = [
//         {
//           id: 1,
//           user_id: 1,
//           number: "1234567890123456",
//           type: "WHITE",
//           balance: 1000,
//         },
//         {
//           id: 2,
//           user_id: 1,
//           number: "9876543210987654",
//           type: "BLACK",
//           balance: 500,
//         },
//       ];
//       jest.spyOn(Card, "findAll").mockResolvedValue(mockCards);
//       await getUserCards(req, res);
//       expect(Card.findAll).toHaveBeenCalledWith({ where: { user_id: 1 } });
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.send).toHaveBeenCalledWith({ cards: mockCards });
//     });

//     it("повинен обробляти помилки", async () => {
//       const req = {
//         params: {
//           userId: 1,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//       jest
//         .spyOn(Card, "findAll")
//         .mockRejectedValue(new Error("Database error"));
//       await getUserCards(req, res);
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({
//         error: "Error while fetching user cards",
//       });
//     });
//   });

//   describe("getCardById", () => {
//     it("повинен отримати картку за її ID", async () => {
//       const req = {
//         params: {
//           cardId: 1,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn(),
//       };
//       const mockCard = {
//         id: 1,
//         user_id: 1,
//         number: "1234567890123456",
//         type: "WHITE",
//         balance: 1000,
//       };
//       jest.spyOn(Card, "findOne").mockResolvedValue(mockCard);
//       await getCardById(req, res);
//       expect(Card.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.send).toHaveBeenCalledWith({ card: mockCard });
//     });

//     it("повинен повернути 404, якщо картку не знайдено", async () => {
//       const req = {
//         params: {
//           cardId: 1,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//       jest.spyOn(Card, "findOne").mockResolvedValue(null);
//       await getCardById(req, res);
//       expect(Card.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
//       expect(res.status).toHaveBeenCalledWith(404);
//       expect(res.send).toHaveBeenCalledWith({ error: "Card not found" });
//     });
//     it("повинен обробляти помилки", async () => {
//       const req = {
//         params: {
//           cardId: 1,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };
//       jest
//         .spyOn(Card, "findOne")
//         .mockRejectedValue(new Error("Database error"));
//       await getCardById(req, res);
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ message: "Error fetching card" });
//     });
//   });
// });
