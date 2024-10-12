import { useState, useEffect } from "react";
import { API_URLS } from "../../api";

/* eslint-disable react/prop-types */
export function Details({userId}) {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      if (userId) {
        const fetchInfo = async () => {
          setLoading(true);
          try {
            const response = await fetch(API_URLS.userDetails(userId));
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            const data = await response.json();
            console.log("Data =", data)
            setUserInfo(data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }

        }
        fetchInfo();
      }
    }, [userId]);

    if (loading) {
      return <div>Загрузка...</div>
    }

    if (!userInfo) {
      return <div>Пользователь не найден</div>
    }

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
          <p><strong>Город:</strong> {userInfo.details?.city}</p>
          <p><strong>Компания:</strong> {userInfo.details?.company}</p>
          <p><strong>Должность:</strong> {userInfo.details?.position}</p>
        </div>
      </div>
    )

}