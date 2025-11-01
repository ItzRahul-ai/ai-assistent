const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors()); app.use(express.json());

app.post('/api/ai', async (req,res)=>{
  const prompt = req.body.prompt || 'hello';
  try{
    // Example using OpenAI Chat completions (v1). Replace with your provider.
    const r = await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers:{ 'Authorization':`Bearer ${process.env.OPENAI_KEY}`, 'Content-Type':'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages:[{role:'user', content:prompt}], max_tokens:400 })
    });
    const j = await r.json();
    const reply = j?.choices?.[0]?.message?.content || 'Sorry, no reply';
    res.json({ reply });
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.listen(3000, ()=>console.log('AI proxy running on :3000'));
