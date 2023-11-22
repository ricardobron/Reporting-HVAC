import React, { createContext, useContext, useCallback } from 'react';

import { useToast as NativeBaseUseToast } from 'native-base';
import { ToastAlertComponent } from '../components/ToastAlert';

export interface ToastMessage {
  status?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextData {
  addToast(message: ToastMessage): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

type Props = {
  children: JSX.Element;
};

const ToastContextProvider = ({ children }: Props) => {
  const toast = NativeBaseUseToast();

  const addToast = useCallback(
    ({
      status,
      description,
      title,
      duration = 5000,
    }: Omit<ToastMessage, 'id'>) => {
      const toastMessage = {
        status,
        title,
        description,
      };

      toast.show({
        duration,
        render: () => {
          return <ToastAlertComponent {...toastMessage} />;
        },
      });
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}

export { ToastContextProvider, useToast };
