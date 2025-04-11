export default function handler(req, res) {
  const { message } = req.body;
  res.status(200).json({
    response: `🧠 명령어 수신 완료: ${message}\n(다음 단계에서 GPT 연동 예정)`
  });
}
