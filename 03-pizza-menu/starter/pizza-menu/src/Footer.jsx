export default function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  if (isOpen) alert("We're currently open");
  else alert("sorry we are close");

  return (
    <footer className="footer">
      {isOpen && (<div className="order"><p>We're open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button></div>)}
    </footer>
  );
}
