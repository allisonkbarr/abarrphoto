
require('dotenv').config()

const { promisify } =  require('util')
const fs = require('fs')

const { nanoid } = require('nanoid')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUploader = require('express-fileupload')
const basicAuth = require('express-basic-auth')
const jwt = require('jsonwebtoken')
const db = require('better-sqlite3')(process.env.DATABASE_PATH)
const { Liquid } = require('liquidjs')

const jwtSignP = promisify(jwt.sign)
const jwtVerifyP = promisify(jwt.verify)

const engine = new Liquid()

const getImages = db.prepare('select * from image')
const addImage = db.prepare('insert into image (id, caption, created_at) values (@id, @caption, @created_at)')
const deleteImageById = db.prepare('delete from image where id=?')
const getImageById = db.prepare('select * from image where id=?')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.engine('liquid', engine.express())
app.set('views', './views')
app.set('view engine', 'liquid')
app.use(express.static('assets'))

app.get('/admin', basicAuth({ challenge: true, users: { andrew: 'myphotographsarethebest' } }), async (req, res) => {
  const images = getImages.all()
  res.render('admin.liquid', { env: process.env, images })
})

app.post('/api/delete-image/:id', async (req, res) => {
  const { id } = req.params
  deleteImageById.run(id)
  fs.unlinkSync(`${process.env.IMAGE_DIR}/${id}.jpg`)
  fs.unlinkSync(`${process.env.IMAGE_DIR}/${id}_thumb.jpg`)
  res.sendStatus(200)
})

app.post('/api/add-image', fileUploader({ limits: { fileSize: 50 * 1024 * 1024 } }), async (req, res) => {
  const { image, thumb } = req.files
  const { caption } = req.body
  const id = nanoid()
  const fileName = `${id}.jpg`
  const thumbFileName = `${id}_thumb.jpg`
  image.mv(`${process.env.IMAGE_DIR}/${fileName}`)
  thumb.mv(`${process.env.IMAGE_DIR}/${thumbFileName}`)
  addImage.run({
    id,
    caption,
    created_at: Date.now()
  })
  res.sendStatus(200)
})

app.get('/', async (req, res) => {

  const images = getImages.all()

  res.render('index.liquid', { env: process.env, images })
})

app.listen(process.env.PORT)
