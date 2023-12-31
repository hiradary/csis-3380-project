import "dotenv/config";
import app from "./app";

const port = process.env.PORT || 5003;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
