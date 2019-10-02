'use strict'

/* Set DB Path */
const path = require('path')
const dbPath = path.join(__dirname, '/../db/gdps.db')

console.log(dbPath)

/* Create DB if it doesn't exist */
const fs = require('fs')

fs.access(dbPath, error => {
  if (!error) {
    // continue
  } else {
    fs.closeSync(
      fs.openSync(dbPath, 'w')
    )
  }
})

/* Install Schema */
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(dbPath)

db.serialize(function () {
  db.run(`CREATE TABLE IF NOT EXISTS offenders (
     id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
     name text NOT NULL UNIQUE,
     alliance text DEFAULT NULL,
     created_at datetime NOT NULL DEFAULT current_timestamp,
     updated_at datetime NOT NULL DEFAULT current_timestamp,
     deleted_at datetime);`
  )

  db.run(`CREATE TABLE IF NOT EXISTS citations ( 
     id integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
     offender_id integer NOT NULL, 
     note text DEFAULT NULL, 
     created_at datetime NOT NULL DEFAULT current_timestamp, 
     updated_at datetime NOT NULL DEFAULT current_timestamp, 
     deleted_at datetime, 
     FOREIGN KEY (offender_id) 
     REFERENCES offenders (id) 
     ON DELETE CASCADE 
     ON UPDATE NO ACTION);`
  )

  db.run(`CREATE TRIGGER tg_offenders_updated_at 
     AFTER UPDATE 
     ON offenders FOR EACH ROW 
     BEGIN 
     UPDATE offenders SET updated_at = current_timestamp 
     WHERE id = old.id; 
     END;`
  )

  db.run(`CREATE TRIGGER tg_citations_updated_at 
     AFTER UPDATE 
     ON citations FOR EACH ROW 
     BEGIN 
     UPDATE citations SET updated_at = current_timestamp 
     WHERE id = old.id; 
     END;`
  )

  db.run('select * from offenders;')

  db.close()
})
