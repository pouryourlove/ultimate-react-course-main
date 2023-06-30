export default function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  if (isOpen) alert("We're currently open");
  else alert("sorry we are close");

  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()}. We&apos;re currently open
    </footer>
  );
}
