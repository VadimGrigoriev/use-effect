import { useState, useEffect } from "react";
import { Details } from "../Details/Details";
import { API_URLS } from "../../api";

export default function List() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URLS.users);
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
            onClick={() => setSelectedUser(user.id)}>
            {user.name}
          </div>
        ))}      
      </div>
      {selectedUser && <Details userId={selectedUser} />}
    </div>

  );
}

