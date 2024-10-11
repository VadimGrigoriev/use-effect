import { useState, useEffect } from "react";

export function Details({user}) {
    const [selectedUser, setSelectedUser] = useState(user);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      const fetchInfo = async () => {
        try {
          const response = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${selectedUser.id}.json`);
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          const data = await response.json();
          setUserInfo(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchInfo();
      }, [selectedUser]);

    return (
      <div className="detail">
        <div className="detail-image">
          <img
              src={userInfo.avatar}
              alt="User"
          />
        </div>
        <h2>{userInfo.name}</h2>
        <div className="detail-info">
          <p><strong>Город:</strong> {userInfo.details.city}</p>
          <p><strong>Компания:</strong> {userInfo.details.company}</p>
          <p><strong>Должность:</strong> {userInfo.details.position}</p>
        </div>
      </div>
    )

}