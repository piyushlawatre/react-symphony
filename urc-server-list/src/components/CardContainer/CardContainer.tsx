import { useState } from "react";
import Card from "../Card/Card";

export default function CardContainer() {
  const [servers, setServer] = useState([
    {
      id: "396007",
      name: "S3Cloud",
      isOnline: false,
      description: "Secure cloud storage for your files and data.",
    },
    {
      id: "979021",
      name: "EC2Express",
      isOnline: true,
      description: "High-performance virtual servers for your applications.",
    },
    {
      id: "993939",
      name: "DynamoDBMaster",
      isOnline: false,
      description:
        "Scalable NoSQL database for fast and reliable data storage.",
    },
    {
      id: "868627",
      name: "LambdaPro",
      isOnline: false,
      description:
        "Serverless computing for scalable and event-driven applications.",
    },
    {
      id: "890964",
      name: "RDSVault",
      isOnline: true,
      description:
        "Managed relational database service with enhanced security features.",
    },
  ]);

  function toggleOnlineStatus(event: any) {
    const serversClone = [...servers];
    const statusIndex = serversClone.findIndex((data) => {
      return data.id === event.target.value;
    });
    serversClone[statusIndex].isOnline = !serversClone[statusIndex].isOnline;
    setServer(serversClone);
  }

  return (
    <div className="card-grid">
      {servers.map((server) => (
        <Card
          cardInfo={server}
          handleOnClick={toggleOnlineStatus}
          key={server.name}
        ></Card>
      ))}
    </div>
  );
}
