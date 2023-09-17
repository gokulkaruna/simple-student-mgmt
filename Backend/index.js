const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PES1PG22CS013');
  console.log('db connected');
}

const studentSchema = new mongoose.Schema({
    name: String,
    dept: String,
    srn: String,
});

const Student = mongoose.model('Student', studentSchema);
const server = express();
server.use(cors());
server.use(bodyParser.json());


server.post('/student/add',async (req,res)=>{
    let student = new Student();

    student.name = req.body.name;
    student.dept = req.body.dept;
    student.srn = req.body.srn;

    const doc = await student.save();
    res.send(doc);
})


server.get('/student/:dept',async (req,res)=>{
    const dept = req.params.dept.toUpperCase();
    const docs = await Student.find({dept});
    res.json(docs);
})


server.get('/student/cse/:srn',async (req,res)=>{
    const srn = req.params.srn
    const docs = await Student.find({srn});
    res.json(docs);
})


server.listen(8013,()=>{
    console.log("server started");
})
