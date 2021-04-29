import React, { useState, useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthContext } from '../context/AuthContext';
import AddTaskModal from '../components/AddTaskModal';
import Navigation from '../components/Navigation';
import axios from 'axios';

const Calendar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [taskDate, setTaskDate] = useState(null);
  const [events, setEvents] = useState(null);
  const { tasks, setTasks, loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('/api/tasks', { withCredentials: true })
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error.toString()));
  }, [loading, setLoading, setTasks]);

  useEffect(() => {
    const updateTasks = tasks.map((task) => {
      const title = task.description;
      const date = task.dueDate;
      const color = task.completed ? '#32B679' : '#059CE5';
      return { title, date, color };
    });
    setEvents(updateTasks);
  }, [tasks, loading, setLoading]);

  const handleDateClick = (e) => {
    setTaskDate(e.dateStr);
    setModalShow(true);
  };

  return (
    <>
      <Navigation />
      <Container className="mt-2">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
        />
        <AddTaskModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          date={taskDate}
        />
      </Container>
    </>
  );
};

export default Calendar;
