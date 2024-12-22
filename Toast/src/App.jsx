import "./App.css";
import useNotification from "./ts-hooks/use-notification";

function App() {
  // custo hook - useNotification(position)

  const {NotificationComponent, triggerNotification} = useNotification("top-right");
  return (
    <>
    <div className="section">
    <h1>Toast Component</h1>
    <div className="button-container">
    <button  className='btn' onClick={() => triggerNotification({
        type: "success",
        message: 'File sent successfully',
        duration: 70000,
        animation: 'slide'
      })}>Triger Success</button>
       <button  className='btn' onClick={() => triggerNotification({
        type: "error",
        message: 'This is error message!',
        duration: 70000,
        animation: 'pop'
      })}>Triger Error</button>
       <button className='btn' onClick={() => triggerNotification({
        type: "info",
        message: 'This is info message!',
        duration: 70000,
        animation: 'fade'
      })}>Triger info</button>
       <button className='btn' onClick={() => triggerNotification({
        type: "warning",
        message: 'This is warning message!',
        duration: 70000,
        animation: 'fade'
      })}>Triger warning</button>
    </div>
    </div>
   
      {NotificationComponent}
    </>
  );
}

export default App;
