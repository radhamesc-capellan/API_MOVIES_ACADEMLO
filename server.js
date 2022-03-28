const { app } = require('./app');

const { sequelize } = require('./utils/database');
const { initModels } = require('./utils/initModels');

//Models Asociations
initModels();

//database aut0 and sync
sequelize
.authenticade()
.then(() => console.log('Database Authenticade'))
.catch((err) => console.log(err));

sequelize
  .sync({ force: true })
  .then(() => console.log('Database Synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen( PORT, () => {
    console.log( `API Movies server Running on Port: ${PORT}` )
})

