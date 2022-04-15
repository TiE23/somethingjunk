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

export const productPayload = {
  user: userId,
  title: "Test Title",
  description: "Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test",
  price: 1.00,
  image: "https://google.com/",
};
