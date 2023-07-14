import { useState } from "react";


const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends) 
  //we write this state here because we add friend on FormAddFriend but then the new added friend
  //will be added on FriendsList. So when sibling component also needs to access, we just lift up the state to the parent component. 
  const [showAddFriend, setShowAddFriend] = useState(false)

  function handleShowAddFriend(){
    setShowAddFriend((prev) => !prev)
  }

  function handleAddFriend(newFriend){
    setFriends((friends) => [...friends,newFriend])
    setShowAddFriend(false) //so that the form component will disappear once submmitted
  } 

  //basically we add newFriend into exsiting friends lists.
  //and we pass this handleAddFriend function into FormAddFriend component.
  //Because that's where we add new friend to the list.

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriends={handleAddFriend}/>}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close": "Add friend" }</Button>
      </div>
      <FormSplitBill/>
    </div>
  );
}


function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

function FriendsList({friends}) {
 

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

//we pass onAddFriends as  props
function FormAddFriend({ onAddFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return; //if there is no name and image then just return immidately and don't return the below code.

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      balance: 0,
      id,
    };

    //we set image like that so that it won't change the picture every time we reload.

     onAddFriends(newFriend); 
     //instead of console.log we use onAddFriends here. 
     //because then, newFriend will go to handleAddFriend function as an argument.

    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>😎Friend name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <label>😘Image URL</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill(){
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>😘Bill value</label>
      <input type="text" />
      <label>🤳Your expense</label>
      <input type="text" />
      <label>🤷‍♀️X's expense</label>
      <input type="text" disabled />

      <label>🎶 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}