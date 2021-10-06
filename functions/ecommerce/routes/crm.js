const express = require('express')
const axios = require('axios')
const catalystToken = require('../catalysToken')
let router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// obtener Producto CRM
router.get('/getProducto/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  // Config para axios
  const idProducto = req.params.id
  const config = {
    method: 'get',
    url: `https://www.zohoapis.com/crm/v2/Products/${idProducto}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data.data[0])
    // console.log(resp.data)
  } catch (error) {
    console.log(error)
  }
})

// obtener Contacto (por ID)
router.get('/getContacto/:id', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  // Config para axios
  const idContacto = req.params.id
  const config = {
    method: 'get',
    url: `https://www.zohoapis.com/crm/v2/Contacts/${idContacto}`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  // Realizar peticion con Axios
  try {
    const resp = await axios(config)
    res.send(resp.data)
    // console.log(resp.data)
  } catch (error) {
    console.log(error)
  }
})

router.get('/getDisponibilidad/:desarrollo/:manzana', async (req, res) => {
  // obtener access token
  const accessToken = await catalystToken(req)

  const disponibilidad = 'Disponible'

  const config = {
    method: 'get',
    url: `https://www.zohoapis.com/crm/v2/Products/search?criteria=((Manzana:equals:${req.params.manzana})and(Nombre_Fraccionamiento:equals:${req.params.desarrollo})and(Estado:equals:${disponibilidad}))`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  }

  try {
    const resp = await axios(config)
    res.status(200).json(resp.data)
    // console.log(resp.data)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
