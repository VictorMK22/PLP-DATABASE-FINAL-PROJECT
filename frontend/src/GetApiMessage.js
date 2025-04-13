import { getApiMessage } from "./api";
import { useState, useEffect } from "react";

const GetApiMessage = () => {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const message = await getApiMessage();
        setApiMessage(message);
      } catch (error) {
        console.error("Error fetching API message:", error);
        setApiMessage("Failed to fetch message.");
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="content">
      <h3>{apiMessage}</h3>
    </div>
  );
};

export default GetApiMessage;
