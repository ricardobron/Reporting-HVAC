import React from 'react';

import { AuthProvider } from './auth';
import { ToastContextProvider } from './toast';

interface IProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IProps) => (
  <ToastContextProvider>
    <AuthProvider>{children}</AuthProvider>
  </ToastContextProvider>
);

export default AppProvider;
