import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const VF_ENDPOINT = "https://general-runtime.voiceflow.com/state";

app.post("/chat/launch", async (req, res) => {
  const { userId } = req.body;
  try {
    const response = await fetch(`${VF_ENDPOINT}/user/${userId}/interact`, {
      method: "POST",
      headers: {
        Authorization: process.env.VOICEFLOW_API_KEY,
        versionID: "production",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: { type: "launch" },
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Launch failed" });
  }
});


app.post("/chat/text", async (req, res) => {
  const { userId, message } = req.body;
  try {
    const response = await fetch(`${VF_ENDPOINT}/user/${userId}/interact`, {
      method: "POST",
      headers: {
        Authorization: process.env.VOICEFLOW_API_KEY,
        versionID: "production",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: { type: "text", payload: message },
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Message failed" });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
