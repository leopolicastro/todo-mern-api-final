import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert';

const AddTaskModal = (props) => {
  const { setLoading, loading } = useContext(AuthContext);
  const [description, setDescription] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.post(
        '/api/tasks',
        { dueDate: props.date, description },
        { withCredentials: true }
      );
      props.onHide();
    } catch (error) {
      swal('Oops!', 'Something went wrong');
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a task"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter a task"
              name="dueDate"
              defaultValue={props.date}
              className="col-md-4"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Button type="submit">Add Task</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskModal;
