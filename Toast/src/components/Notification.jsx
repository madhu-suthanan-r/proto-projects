import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import "./Notification.css";
import { useEffect, useRef } from "react";

const iconStyles = { marginRight: "10px" };
const icons = {
  success: <AiOutlineCheckCircle style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />,
};

const animations = {
  fade: "fadeIn",
  pop: "popUp",
  slide: "slideIn",
};

const Notification = ({
  type = "info",
  message,
  onClose = () => {},
  animation = "slide",
}) => {
  const notificationRef = useRef(null);

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
