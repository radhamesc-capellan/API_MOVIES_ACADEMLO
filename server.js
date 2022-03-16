const { app } = require('./app');

const { sequelize } = require('./utils/database');

//Models Asociations
initModels();

sequelize
.authenticade()
.then(() => console.log('Database Synced'))
.catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen( PORT, () => {
    console.log( `API Movies server Running on Port: ${PORT}` )
})

