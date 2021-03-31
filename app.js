const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./models')
// const { users: User, refreshtokens: RefreshToken } = db;

db.sequelize.sync().catch((e) => {
  console.log(e);
});

app.use(cookieParser());
app.use(express.json())

require('./routes/brone.route')(app);

app.listen(5000, () => console.log('Listening on port 5000'))
