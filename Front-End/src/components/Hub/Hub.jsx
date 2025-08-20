import React, { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const SignalRContext = createContext();

export const useSignalR = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalR must be used within a SignalRProvider');
  }
  return context;
};

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem('token'));
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:8080/notification/notificationHub', {
      //.withUrl('https://localhost:7149/notification/notificationHub', {
          accessTokenFactory: async () => {
          // Assume token is stored in localStorage, sessionStorage, or context
          return localStorage.getItem('token');
        },
      })
      .withAutomaticReconnect()
      .build();
    newConnection.on('ReceiveNotification', (notification) => {
      console.log('Notification received:', notification);
      setNotifications((prev) => [
        ...prev,
        notification.message || JSON.stringify(notification),
      ]);
    });

    newConnection
      .start()
      .then(() => {
        console.log('🚀 SignalR connected!');
        setIsConnected(true);
      })
      .catch((err) => {
        console.error('❗ SignalR connection failed:', err);
        setIsConnected(false);
      });

    newConnection.onclose(() => {
      setIsConnected(false);
    });

    newConnection.onreconnected(() => {
      setIsConnected(true);
    });

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  const sendMessage = async (message) => {
    if (connection && isConnected) {
      try {
        await connection.invoke('SendMessage', message);
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SignalRContext.Provider
      value={{
        connection,
        notifications,
        isConnected,
        sendMessage,
        clearNotifications,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
