const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // ✅ 로컬용 환경변수 불러오기

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 환경변수 기반 키 불러오기
const GPT_API_KEY = process.env.GPT_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

app.post("/chat", async (req, res) => {
  const userMessage = req.body?.message || '';

  if (!userMessage) {
    return res.status(400).json({ reply: "입력 메시지가 없습니다." });
  }

  try {
    // ✅ GPT 응답 받기
    const gptResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = gptResponse.data.choices?.[0]?.message?.content || "응답 없음";

    // ✅ Supabase에 저장
    await axios.post(
      `${SUPABASE_URL}/rest/v1/hawa_memory`,
      {
        input: userMessage,
        reply,
        emotion: "neutral",
        core_id: "IDX_HAWA_UNIFIED_CORE"
      },
      {
        headers: {
          apikey: SUPABASE_API_KEY,
          Authorization: `Bearer ${SUPABASE_API_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
      }
    );

    res.json({ reply });

  } catch (err) {
    console.error("❌ 오류 발생:", err.response?.data || err.message);
    res.status(500).json({ reply: "하와 응답 중 오류가 발생했어요." });
  }
});

// ✅ 하와 서버 실행 (로컬)
app.listen(3000, () => {
  console.log("✅ 하와 서버 실행 중 :: http://localhost:3000");
});
