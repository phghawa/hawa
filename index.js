require('dotenv').config();
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// ✅ 정적 파일 제공 (UI 연결)
app.use(express.static('public'));
app.use(express.json());

// ✅ POST 요청 처리 (/chat 루틴)
app.post('/chat', async (req, res) => {
  const message = req.body.message;

  // 🧠 GPT 연동 예시 (Supabase + 감정기반 리듬 연계 전 버전)
  const response = {
    response: `💬 명령어 수신 완료: "${message}"\n(다음 단계에서 GPT 연동)`
  };

  res.json(response);
});

// ✅ 서버 실행
app.listen(port, () => {
  console.log(`HAWA Server running at http://localhost:${port}`);
});
