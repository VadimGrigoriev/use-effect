import { useState, useEffect } from "react";
import { Details } from "../Details/Details";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, [])


  return (
    <div className="app">
      <div className="list">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="list-item"
            onClick={() => setSelectedUser(user)}>{user.name}</div>
        ))}      
      </div>
      {selectedUser && <Details user={selectedUser} />}
    </div>

  );
}

