const app = require('./app')

const port = process.env.PORT || 3000

const swaggerDoc = require('../swaggeDoc')
swaggerDoc(app)

app.listen(port, () => {
    console.log(`Servidor no ar, porta ${port}`)
})