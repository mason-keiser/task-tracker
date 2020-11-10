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

app.post('/api/signUp/', (req, res, next) => {
  if (!req.body.firstname) {
    return next(new ClientError('Missing required firstname field', 400));
  }
  if (!req.body.lastname) {
    return next(new ClientError('Missing required lastname field', 400));
  }
  if (!req.body.email) {
    return next(new ClientError('Missing required user_email field', 400));
  }
  if (!req.body.password) {
    return next(new ClientError('Missing required user_password field', 400));
  }
  const sql = `
  INSERT INTO "users" ("firstname", "lastname", "email", "password")
  VALUES                  ($1, $2, $3, $4)
  RETURNING *;
  `;
  const params = [req.body.firstname, req.body.lastname, req.body.email, req.body.password];
  db.query(sql, params)
    .then(result => {
      const row = result.rows[0];
      res.status(201).json(row);
    });
});

//  SEARCH DATABASE FOR EXISTING EMAIL AND PASSWORD API GET REQUEST

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

// CREATE CHECKLIST ITEM API

app.post('/api/post', (req, res, next) => {
  const userId = req.body.userid;
  const checklistItem = req.body.checklistitem;
  const isCompleted = false;
  const sqlQuery = `
            INSERT INTO checklistitems (userid, checklistitem, iscomplete)
            VALUES ($1, $2, $3)
            RETURNING *
          `;
  const params = [
    userId,
    checklistItem,
    isCompleted
  ];
  db.query(sqlQuery, params)
    .then(result => res.status(201).json({
      message: 'Checklist item created successfully'
    }))
    .catch(err => next(err));
})

// UPDATE CHECKLIST ITEM API

app.put('/api/update/', (req, res, next) => {
  const updatedChecklistItem = req.body.updatedChecklistitem;
  const checklistItemId = req.body.checklistitemid;

  const sqlQuery = `
            UPDATE checklistitems
               SET checklistitem = $1
             WHERE checklistitemid = $2
          `;
  const params = [updatedChecklistItem, checklistItemId];
  db.query(sqlQuery, params)
    .then(result => {
      res.status(202).json({message: 'Checklist item updated successfully'})
      return result 
    })
    .catch(err => next(err));
});

// DELETE CHECKLIST ITEM REST API

app.delete('/api/delete', (req, res ,next) => {
  const checklistitemid = req.body.checklistitemid;
  const sqlQuery = `
          DELETE FROM checklistitems
                WHERE checklistitemid = $1
        `;
  const params = [checklistitemid];

  db.query(sqlQuery, params)
    .then(result => {
      res.status(202).json({message: 'Checklist item deleted successfully'})
      return result
    })
    .catch(err => next(err));
})

//TOGGLE CHANGE TO ISCOMPLETE ON CHECKLIST ITEM API

app.put('/api/isComplete', (req, res, next) => {
  const checklistItemId = req.body.checklistitemid;
  const getQuery = `
    SELECT *
      FROM checklistitems
      WHERE checklistitemid = $1
  `;

  const getParams = [checklistItemId];

  db.query(getQuery, getParams)
    .then(result => {
      const isCompleted = !result.rows[0].iscomplete;
      const updateQuery = `
        UPDATE checklistitems
            SET iscomplete = $1
          WHERE checklistitemid = $2
      `;
      const updateParams = [isCompleted, checklistItemId];

      db.query(updateQuery, updateParams)
        .then(result => res.json({
          message: 'Checklist item updated successfully'
        }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
})

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