import express from 'express'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs-extra'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const PORT = 3000
const J_FILE = "./data.json"

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //allowedHeaders: ['Content-Type', 'Authorization']
}))

const writeData = async (data) => await fs.writeJson(J_FILE, data, {space:2})
const readData = async () => await fs.readJson(J_FILE)

const routes = [
    {path: '/', file:'index.html'},
    {path: '/contact', file: 'contact.html'}
]



routes.forEach(route => {
    app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', route.file))
    })
})

app.post('/api/contact', async (req, res) => {
    //console.log(req)
    const data = req.body
    console.log(data)
    const oldData = await readData()

    oldData.messages.push(data)
    await writeData(oldData)
    res.status(202).json({message: "Données reçues"})
})

app.get('/api/listing', async (req, res) => {
    //console.log(req)
    const oldData = await readData()
    console.log(oldData)
    res.status(202).json(oldData)
})

// Catch-all GET → fichier 404.html
// Gestion des routes non définies
app.use((req, res) => {
  if (req.method === 'GET') {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  } else {
    res.status(404).json({ error: 'Route non trouvée', method: req.method });
  }
});

app.listen(PORT, () => {
    console.log(`Serveur est démarré : http://localhost:${PORT}`)
})