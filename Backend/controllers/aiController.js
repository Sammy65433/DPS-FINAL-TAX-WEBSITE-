const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODELS = ["openai/gpt-oss-20b", "openai/gpt-oss-120b", "qwen/qwen3.8-27b"];

async function groqGenerate(prompt, maxTokens = 400, temperature = 0.7) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not set");

  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: maxTokens,
          temperature,
        }),
        signal: AbortSignal.timeout(20000),
      });

      if (!response.ok) continue;

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || "";
      if (text) return text;
    } catch (error) {
      console.error(`Model ${model} failed:`, error.message.slice(0, 100));
    }
  }
  return "I'm sorry, I'm having trouble responding right now. Please try again or call us at (973) 327-2340.";
}

const DPS_CLIENT_PROMPT = `You are the DPS Professional Tax Services website assistant. You help website visitors and clients with questions about DPS services, booking, documents, and general tax information.

DPS Professional Tax Services is located at 1811 Springfield Ave, Maplewood, NJ 07040. Phone: (973) 327-2340. Email: dpstax1@gmail.com. Est. 2007.

Services offered:
- Tax Preparation (personal, business, S-Corp, partnerships, estates/trusts, amended returns)
- Notary Public & Mobile Notary
- Translation Services
- Copy & Fax Services
- Immigration Services
- Insurance Services
- Real Estate Services (via RC Realty Group - buying, selling, renting, investment properties)

Office Hours:
- Tax Season (Feb-Apr): Mon-Fri 9 AM-9 PM, Sat 10 AM-7 PM, Sun by appointment
- Off-Season: Mon-Fri 10 AM-6 PM, Sat by appointment (walk-ins welcome), Sun by appointment

Key info:
- Pricing varies by city and state — contact office for exact quote
- Secure document upload via CCH iFirm portal
- Clients can create accounts, upload intake forms, book appointments online
- IRS e-file authorized
- 4+ languages supported (English, Spanish, French, Haitian Creole)

When answering:
- Be helpful, concise, and professional
- For specific pricing, direct them to call (973) 327-2340 or book an appointment
- For document uploads, direct them to the secure CCH iFirm portal
- For booking, direct them to the booking page
- Never provide specific tax advice — always recommend consulting a preparer
- If you don't know something, say so and suggest calling the office`;

export async function chatWithClient(req, res) {
  const { message } = req.body ?? {};

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: "Message too long." });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(503).json({ error: "AI assistant is not configured." });
  }

  try {
    const text = await groqGenerate(
      DPS_CLIENT_PROMPT + "\n\nVisitor question: " + message.trim(),
      300,
      0.7
    );

    return res.json({ reply: text || "I'm sorry, I couldn't generate a response. Please call (973) 327-2340 for help." });
  } catch (error) {
    console.error("DPS AI chat failed:", error);
    return res.status(500).json({ error: "AI assistant is temporarily unavailable." });
  }
}