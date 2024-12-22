import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import "./Notification.css";
import React, { useEffect, useRef } from "react";

const iconStyles: React.CSSProperties = { marginRight: "10px" };
const icons: Record<string, JSX.Element> = {
  success: <AiOutlineCheckCircle style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />,
};

const animations: Record<string, string> = {
  fade: "fadeIn",
  pop: "popUp",
  slide: "slideIn",
};

interface NotificationProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  onClose: () => void;
  animation?: 'fade' | 'pop' | 'slide'; 
}

const Notification: React.FC<NotificationProps> = ({
  type = "info",
  message,
  onClose = () => {},
  animation = "slide",
}) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notificationRef.current) {
      notificationRef.current.focus();
    }
  }, []);

  const ariaRole = type === "error" || type === "warning" ? "alert" : "status";
  const ariaLive =
    type === "error" || type === "warning" ? "assertive" : "polite";

  return (
    <div
      className={`notification ${type} ${animations[animation]}`}
      role={ariaRole}
      aria-live={ariaLive}
      tabIndex={-1}
      ref={notificationRef}
    >
      {/* icon */}
      {icons[type]}
      {/* message */}
      {message}
      &nbsp;
      {/* close button */}
      <button className="cls-btn" onClick={() => onClose()}>
        <AiOutlineClose color="white" />
      </button>
    </div>
  );
};

export default Notification;
