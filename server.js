const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
async function authMiddleware(req, res, next) {
  const token = (req.headers.authorization || '').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  const { data, error } = await supabase.auth.getUser(token);
  if (error ||!data.user) return res.status(401).json({ error: 'Invalid token' });
  req.user = data.user;
  next();
}
const swaggerDocs = {
  openapi: '3.0.0',
  info: { title: 'Auth-Api', version: '1.0.0' },
  components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } },
  paths: {
    '/public/info': { get: { summary: 'Public' } },
    '/auth/login': { post: { summary: 'Login' } },
    '/protected/profile': { get: { summary: 'Protected', security: [{ bearerAuth: [] }] } }
  }
};
app.get('/docs', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" /></head><body><div id="swagger-ui"></div><script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script><script>SwaggerUIBundle({ spec: ${JSON.stringify(swaggerDocs)}, dom_id: '#swagger-ui' })</script></body></html>`);
});
app.get('/docs/', (req,res)=>res.redirect('/docs'));
app.get('/public/info', (req,res)=>res.json({message:'public ok'}));
app.post('/auth/signup', async (req,res)=>{
  const {email,password}=req.body;
  const {data,error}=await supabase.auth.signUp({email,password});
  if(error) return res.status(400).json({error:error.message});
  res.status(201).json(data);
});
app.post('/auth/login', async (req,res)=>{
  const {email,password}=req.body;
  const {data,error}=await supabase.auth.signInWithPassword({email,password});
  if(error) return res.status(401).json({error:error.message});
  res.json({access_token:data.session.access_token});
});
app.post('/auth/logout', authMiddleware, async (req,res)=>res.status(204).send());
app.get('/protected/profile', authMiddleware, (req,res)=>res.json(req.user));
app.get('/protected/dashboard', authMiddleware, (req,res)=>res.json({message:'dashboard ok'}));
app.listen(3000, ()=>console.log('RUNNING FINAL on 3000 - /docs ready'));