import React from 'react';
import Navigation from '../components/Navigation';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import DateFilters from '../components/DateFilters';

const Home = () => {
  return (
    <div>
      <Navigation />
      <DateFilters />
      <TaskList />
      <TaskForm />
    </div>
  );
};

export default Home;
