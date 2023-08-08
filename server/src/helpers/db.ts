import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  highlights: String,
  sentiment: Number,
  openQuestions: [{ type: String }],
});

export const NewsModel = mongoose.model("News", newsSchema);

export const connectDb = async () => {
  await mongoose.connect(process.env.DB_URI as string);
  console.log("DB successfully connected!");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
