import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const VF_ENDPOINT = "https://general-runtime.voiceflow.com/state";

app.post("/chat", async (req, res) => {
  try {
    const { message, userId } = req.body;

    const response = await fetch(`${VF_ENDPOINT}/${userId}/interact`, {
      method: "POST",
      headers: {
        Authorization: process.env.VOICEFLOW_API_KEY,
        versionID: "production",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "text",
        payload: message,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
