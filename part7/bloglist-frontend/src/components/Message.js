import { useNotificationValue } from "../NotificationContext";


const Message = () => {
  const message = useNotificationValue();
  
  if (!message) return null;

  return <div>{message}</div>;
};

export default Message;
