module.exports = (app, db) => {
  //get All Students
  app.get('/api/Students', (req, res) => {
    db.Students.findAll()
      .then(Students => {
        res.json(Students);
      });
  });
  //
  app.get('/api/Student/:studentid', (req, res) => {
    const studentid = req.params.studentid;
    db.Students.find({
      where: {
        studentid: studentid
      }
    }).then(Students => {
      res.json(Students)
    })
  })
  //
  app.post('/api/student', (req, res) => {
    const grno = req.body.grno;
    const studentName = req.body.studentName;
    const Std = req.body.Std;
    const Div = req.body.Div;
    db.Students.create({
      grno: grno,
      studentName: studentName,
      Std: Std,
      Div: Div
    }).then(newStudent => {
      res.json(newStudent)
    })
  })

  app.patch('/api/student/:studentid', (req, res) => {
    const studentid = req.params.studentid;
    const updates = req.body.updates;
    db.Students.find({
        where: {
          studentid: studentid
        }
      })
      .then(Students => {
        return Students.updateAttributes(updates)
      })
      .then(Studentsupdate => {
        res.json(Studentsupdate);
      });
  });
  // DELETE single owner
  app.delete('/api/student/:studentid', (req, res) => {
    const studentid = req.params.studentid;
    db.Students.destroy({
        where: {
          studentid: studentid
        }
      })
      .then(DeletedStudents => {
        res.json(DeletedStudents);
      });
  });
}
