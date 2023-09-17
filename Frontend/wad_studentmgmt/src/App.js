import './App.css';
import logo from './images/pes_logo.png';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


function App() {

  const [form, setForm] = useState({});
  const [students, setStudents] = useState({});
  const [student, setStudent] = useState({});

  const [showadd, setShowadd] = useState(false);
  const [showsearch, setShowsearch] = useState(false);
  const [show, setShow] = useState(false);

  const [selectedValue, setSelectedValue] = useState('ECE');

  const addHandleClose = () => {
    getStudents();
    setShowadd(false)
  };
  const addHandleShow = () => setShowadd(true);

  const searchHandleClose = () => {
    setShowsearch(false);
  };
  const searchHandleShow = () => setShowsearch(true);

  const handleForm = (e) =>{
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    }); 
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:8013/student/add',{
      method:'POST',
      body:JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json ();
    setShow(true);
  }

  const handleSearchSubmit = async (e) =>{
    e.preventDefault();
    const srn = form.srn
    const response = await fetch(`http://localhost:8013/student/cse/${srn}`,{
      method:'GET'
    })
    const data = await response.json ();
    setStudent(data);
  }


  const getStudents = async (e) =>{
    const response = await fetch(`http://localhost:8013/student/${selectedValue}`,{
      method:'GET',
    })
    const data = await response.json();
    setStudents(data);
  }

  const handleRadioChange = async (event) => {
    setSelectedValue(event.target.value);
      const response = await fetch(`http://localhost:8013/student/${selectedValue}`,{
        method:'GET',
      })
      const data = await response.json ();
      setStudents(data);
  };


  useEffect(()=>{
    getStudents();
  },[])





  return (
    <div>

      <Modal show={showadd} onHide={addHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div >
              <form onSubmit={handleSubmit}>
              <label for="srn">SRN:</label>
              <input class="form-control" type="text" onChange={handleForm} name="srn"  />
              <br/>
              <label for="name">Name:</label>
              <input class="form-control" type="text" onChange={handleForm} name="name"/>
              <br/>
              <label for="dept">Department:</label> 
              <input class="form-control" type="text" onChange={handleForm} name="dept"  />
              <br/>
              <hr />
              <input class="btn btn-primary" type="submit"/>
              &nbsp;&nbsp;&nbsp;
              <Button variant="secondary" onClick={addHandleClose}>
                Close
              </Button>
              </form>
              <br />
              <Alert show={show} variant="success">
                <Alert.Heading>Student added successfully!</Alert.Heading>
            </Alert>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showsearch} onHide={searchHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search student by SRN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSearchSubmit}>
              <label for="srn">SRN:</label>
              <input class="form-control" onChange={handleForm} type="text" name="srn" required></input><br></br>
              <hr />
              <input class="btn btn-primary" type="submit" ></input>
              &nbsp;&nbsp;&nbsp;
              <Button variant="secondary" onClick={searchHandleClose}>
                Close
              </Button>
            </form>
            <br />
            <hr />
            <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">SRN</th>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(student).map(student => {
				            return (
                      <tr>
                    <td >{student.srn}</td>
                    <td >{student.name}</td>
                    <td >{student.dept}</td>
                    </tr>
                    );
			          })}
              </tbody>
            </table>
            </div>
          </Modal.Body>
        </Modal>

      <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            &nbsp;&nbsp;&nbsp;&nbsp;<img src={logo} width="90" height="40" alt=""></img>
          </a>
          <p class="lead">
            WAD Assignment - Student Managemet
            (Gokul K - PES1PG22CS013)
          </p>
          &nbsp;&nbsp;&nbsp;
      </nav> 
      <br />
    
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div>
              <span className="display-6">Displaying Students - {selectedValue.toUpperCase()}</span>
              &nbsp;&nbsp;&nbsp;
              &nbsp;
              &nbsp;
              <Button variant="primary" onClick={searchHandleShow}>
                <i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;Find by SRN
              </Button>
              &nbsp;
              &nbsp;
              &nbsp;
              <Button variant="primary" onClick={addHandleShow}>
                <i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add New Student
              </Button>
              &nbsp;
              &nbsp;
              <span class = "p-3">
              <label>
                  <input
                    type="radio"
                    value="CSE"
                    checked={selectedValue === 'CSE'}
                    onChange={handleRadioChange}
                  />
                  &nbsp;CSE
                </label>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <label>
                  <input
                    type="radio"
                    value="ECE"
                    checked={selectedValue === 'ECE'}
                    onChange={handleRadioChange}
                  />
                   &nbsp;ECE
                </label>
              </span>
            </div>
            <br />
            <hr />
          <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">SRN</th>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(students).map(student => {
				            return (
                      <tr>
                    <td >{student.srn}</td>
                    <td >{student.name}</td>
                    <td >{student.dept}</td>
                    </tr>
                    );
			          })}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  
  );
}

export default App;
