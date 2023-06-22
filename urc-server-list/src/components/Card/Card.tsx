export default function Card({ cardInfo, handleOnClick }: any) {
  return (
    <div className="card">
      <div className="card-header">
        <h4>{cardInfo.name}</h4>
        <div
          className="circle"
          style={cardInfo.isOnline ? {} : { backgroundColor: "red" }}
        ></div>
      </div>
      <div className="card-body">
        <h5> {cardInfo.isOnline ? "Online" : "Offline"}</h5>
        <p>{cardInfo.description}</p>
        <button onClick={handleOnClick} value={cardInfo.id}>
          Toggle Server
        </button>
      </div>
    </div>
  );
}
