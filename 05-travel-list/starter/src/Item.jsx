export default function Item({ item, onDeleteItem, onHandleToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => {onHandleToggleItem(item.id)}} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>👌</button>
    </li>
  );
}