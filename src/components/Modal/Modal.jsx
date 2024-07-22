import { useEffect, useState } from "react";
import { useUsersTableContext } from "../../contexts/usersTableContext";
import styles from "./modal.module.css";
import { ErrorMessage } from "../ErrorMessage";

export const Modal = ({closeModal}) => {
  const {singleUserId} = useUsersTableContext();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    try{
      fetch(`https://dummyjson.com/users/${singleUserId}`)
      .then(res => res.json())
      .then((res) => {
        setUserInfo(res);
      });
    } catch {
      setUserInfo([]);
    }

  }, [singleUserId]);

  return (userInfo ? <div className={styles.modal}>
    <h2>ФИО: {userInfo?.firstName} {userInfo?.maidenName} {userInfo?.lastName}</h2>
    <p>Возраст: {userInfo?.age}</p>
    <p>Адрес: {userInfo?.address?.city} {userInfo?.address?.address}</p>
    <p>Рост: {userInfo?.height}</p>
    <p>Вес: {userInfo?.weight}</p>
    <p>Номер телефона: {userInfo?.phone}</p>
    <p>Email: {userInfo?.email}</p>
    <button className={styles.closeBtn} onClick={closeModal}>Close</button>
  </div> :
  <div className={styles.modal}>
    <ErrorMessage />
    <button className={styles.closeBtn} onClick={closeModal}>Close</button>
  </div>

);
}