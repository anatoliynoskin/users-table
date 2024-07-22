import styles from './orderBtn.module.css'
import orderImg from '../../assets/Polygon.svg'
import { useState } from 'react'
import { useUsersTableContext } from '../../contexts/usersTableContext'
import classNames from 'classnames'

export const OrderBtn = ({fieldName}) => {
  const {order, setOrder, users, setUsers} = useUsersTableContext();
  const [diraction, setDiraction] = useState(true);

  const handlerOrder = () => {
    setDiraction(!diraction);

    if (order.field != fieldName ) {
      setOrder({
        field: fieldName,
        type: "asc"
      })
    } else {
      if (order.type == "" || order.type === "desc") {
        setOrder({
          field: fieldName,
          type: "asc"
        });
      } else {
        setOrder({
          field: fieldName,
          type: "desc"
        });
      }
    }

   const usersSorted = [...users];
   if (order.type === "asc") {
    setUsers(usersSorted.sort((a, b) =>{
      if (fieldName === 'address') {
        return a[fieldName].city > b[fieldName].city ? 1 : -1
      } else {
        return a[fieldName] > b[fieldName] ? 1 : -1
      }
    }));
   } else {
    setUsers(usersSorted.sort((a, b) =>{
      if (fieldName === 'address') {
        return a[fieldName].city < b[fieldName].city ? 1 : -1
      } else {
        return a[fieldName] < b[fieldName] ? 1 : -1
      }
    }));
   }
  }

  return(
    <img
      src={orderImg}
      alt="order"
      className={classNames([
        styles.order_btn,
        diraction ? styles.down : styles.up
      ])}
      onClick={handlerOrder}
    />
  )
}