require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query(`select 'successfully connected' as "message"`)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/users', (req, res, next) => {
  const sql = `
    SELECT *
    FROM "users"
    `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

//  SIGN UP API POST REQUEST THAT ADDS USER INFO TO DB
// GO THROUGH DB TO ADJUST SIGNUP POSTGRESQL

app.post('/api/signUp', (req, res, next) => {
  if (!req.body.user_name) {
    return next(new ClientError('Missing required user_name field', 400));
  }
  if (!req.body.user_email) {
    return next(new ClientError('Missing required user_email field', 400));
  }
  if (!req.body.user_password) {
    return next(new ClientError('Missing required user_password field', 400));
  }
  const sql = `
  INSERT INTO "user_info" ("user_name", "user_email", "user_password")
  VALUES                  ($1, $2, $3)
  RETURNING *;
  `;
  const params = [req.body.user_name, req.body.user_email, req.body.user_password];
  db.query(sql, params)
    .then(result => {
      const row = result.rows[0];
      res.status(201).json(row);
    });
});

//  SEARCH DATABASE FOR EXISTING USER_EMAIL AND USER_PASSWORD API GET REQUEST

app.get('/api/login/:email/:password', (req, res, next) => {
  const email = req.params.email;
  const password = req.params.password;
  const sql = `
  SELECT * FROM "users"
  WHERE "email" = $1 
  AND "password" = $2;
  `;
  const params = [req.params.email, req.params.password];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        return res.status(400).json({ message: `No user information contains: ${email} or ${password}` });
      } else {
        return res.status(200).json(result.rows);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});


app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});