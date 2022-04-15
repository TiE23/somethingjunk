import mongoose from "mongoose";

export const userId = new mongoose.Types.ObjectId().toString();

export const userPayload = {
  _id: userId,
  email: "test@example.com",
  name: "Exam Pul",
};
export const userInput = {
  email: "test@example.com",
  name: "Exam Pul",
  password: "Password123",
  passwordConfirmation: "Password123",
};
export const loginInput = {
  email: "test@example.com",
  password: "Password123",
};

export const sessionPayload = {
  "_id": "625715c700af46257ddc47ba",
  "user": "6255a7582847a104c996354a",
  "valid": true,
  "userAgent": "PostmanRuntime/7.29.0",
  "createdAt": "2022-04-13T18:26:15.153Z",
  "updatedAt": "2022-04-13T18:26:15.153Z",
  "__v": 0,
};

export const productPayload = {
  user: userId,
  title: "Test Title",
  description: "Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test",
  price: 1.00,
  image: "https://google.com/",
};
