const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// post -> put && insert -> update
router.post('/:id', (req, res, next) => {
    console.log(req.user.id);
    if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "project"
                     ("project_name",
                      "brand",
                      "deep_custom",
                      "project_desc",
                      "cust_height",
                      "cust_inseam",
                      "cust_torso",
                      "cust_flex",
                      "cust_reach",
                      "head_tube",
                      "steerer_tube",
                      "down_tube",
                      "seat_tube",
                      "bottom_bracket",
                      "seat_stays",
                      "chain_stays",
                      "drop_outs",
                      "brake_type",
                      "wheel_size",
                      "tire_clearance",
                      "progress_status",
                      "date_created",
                      "projected_due_date")
                      VALUES ($1, $2, $3, $4, $5, $6, $7,
                              $8, $9, $10, $11, $12, $13, $14,
                              $15, $16, $17, $18, $19, $20,
                              $21, $22, $23);`;
    pool.query(queryText, [req.body.project_name,
                            req.body.brand,
                            req.body.deep_custom,
                            req.body.project_desc,
                            req.body.cust_height,
                            req.body.cust_inseam,
                            req.body.cust_torso,
                            req.body.cust_flex,
                            req.body.cust_reach,
                            req.body.head_tube,
                            req.body.steerer_tube,
                            req.body.down_tube,
                            req.body.seat_tube,
                            req.body.bottom_bracket,
                            req.body.seat_stays,
                            req.body.chain_stays,
                            req.body.drop_outs,
                            req.body.brake_type,
                            req.body.wheel_size,
                            req.body.tire_clearance,
                            req.body.progress_status,
                            req.body.date_created, 
                            req.body.projected_due_date,
                            req.body.client_id,
                            req.user.id])
        .then(() => {
            console.log('server side project Post');
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Something went wrong in project post', error);

            res.sendStatus(500);;
        });
    }
});


router.get('/:id', (req, res) => {
    console.log('in GET project get id ')
    console.log('req.paramsvsfdvsf:', req.user.id);
    if (req.isAuthenticated()) {
        //console.log('req.user:', req.user.id);
        pool.query(`SELECT * FROM "project"
                    JOIN "customer_info" ON "project"."client_id" = "customer_info"."id"
                    WHERE "project"."client_id" = $1;`, [req.params.id])
            .then(results => {
                console.log(results.rows[0])
                res.send(results.rows[0])
            })
            .catch(error => {
                console.log('Error making SELECT for project database:', error);
                res.sendStatus(500);
            });
    } else {
      // They are not authenticated.
      res.sendStatus(403);
    }
  });


module.exports = router;