import React from 'react';
import { useSelector } from 'react-redux';
import { AuthTabs } from './src/navigation/authNav';
import { MainStackNav } from './src/navigation/mainNav';

const App = () => {
  const { isSuccess } = useSelector(state => state.auth);

  return isSuccess ? <MainStackNav /> : <AuthTabs />;
};

export default App;
