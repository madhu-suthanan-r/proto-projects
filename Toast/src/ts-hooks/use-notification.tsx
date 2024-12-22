import React, { useCallback, useState } from "react";
import Notification from "../ts-components/Notification";
import { v4 as uuidv4 } from "uuid";

type Position = 'bottom-right' | 'bottom-left' | 'top-left' | 'top-right';
interface NotificationProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration: number;
  animation?: 'fade' | 'pop' | 'slide'; 
}
interface UseNotification{
  NotificationComponent: JSX.Element, triggerNotification: (notificationProps: NotificationProps) => void;
}

const useNotification = (position: Position = "top-right") : UseNotification => {
  const [notifications, setNotifications] = useState<(NotificationProps & {id: string})[]>([]);

  const triggerNotification = useCallback((notificationProps: NotificationProps) => {
    const toastId = uuidv4();
    setNotifications((prevNotifications) => {
      return [
        ...prevNotifications,
        {
          id: toastId,
          ...notificationProps,
        },
      ];
    });
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== toastId));
    }, notificationProps.duration);
  }, []);

  const handleNotificationClose = (index: number) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = [...prevNotifications];
      updatedNotifications.splice(index, 1);
      return updatedNotifications
    })
  }


  const NotificationComponent =  (
    <div className={`notification-container ${position} ${position.split('-')[0]}`}>
      {notifications.map((notification, index) => {
        return <Notification key={notification.id} {...notification} onClose={() => {handleNotificationClose(index)}}/>;
      })}
    </div>
  );

  return { NotificationComponent, triggerNotification };
};

export default useNotification;
