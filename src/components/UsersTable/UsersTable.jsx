import { useEffect } from 'react';
import { useUsersTableContext } from '../../contexts/usersTableContext';
import { TableInput } from '../TableInput/TableInput';
import { OrderBtn } from '../OrderBtn/OrderBtn';
import styles from './usersTable.module.css'
import { ModalWrapper } from '../Modal/ModalWrapper';
import { ErrorMessage } from '../ErrorMessage';

export const UsersTable = () => {
  const {
    users,
    setUsers,
    search,
    setSearch,
    age,
    setAge,
    gender,
    setGender,
    phone,
    setPhone,
    address,
    setAddress,
    setIsOpen,
    setSingleUserId
  } = useUsersTableContext();

  useEffect(() => {
    const handlerFilter = (field, value) => {
      try{
        let url = `https://dummyjson.com/users/filter?key=${field}&value=${value}`;

        fetch(url)
        .then(res => res.json())
        .then((res) => {
          setUsers(res.users);
        });
      } catch {
        setUsers([]);
      }
    }

    if (search) {
      fetch(`https://dummyjson.com/users/search?q=${search}`)
      .then(res => res.json())
      .then((res) => {
        setUsers(res.users);
      });
    } else if (age) {
      handlerFilter("age", age);
    } else if (gender) {
      handlerFilter("gender", gender);
    } else if (phone) {
      handlerFilter("phone", phone);
    } else if (address) {
      handlerFilter("address.address", address);
    } else {
      try{
        let url = 'https://dummyjson.com/users';

        fetch(url)
        .then(res => res.json())
        .then((res) => {
          setUsers(res.users);
        });
      } catch {
        setUsers([]);
      }
    }
  }, [search, age, gender, phone, address, setUsers]);

  const handlerOpenModal = (userId) => {
    setSingleUserId(userId);
    setIsOpen(true);
  }
  return (
    <>
      <ModalWrapper />
      {users !== null ?
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.col}>
              <TableInput name="search" placeholder="ФИО" value={search} setValue={setSearch}/>
              <OrderBtn fieldName="firstName"/>
            </th>
            <th className={styles.col}>
              <TableInput name="age" placeholder="Возраст" value={age} setValue={setAge}/>
              <OrderBtn fieldName="age"/>
            </th>
            <th className={styles.col}>
              <TableInput name="gender" placeholder="Пол" value={gender} setValue={setGender}/>
              <OrderBtn fieldName="gender"/>
            </th>
            <th className={styles.col}>
              <TableInput name="phone" placeholder="Телефон" value={phone} setValue={setPhone}/>
            </th>
            <th className={styles.col}>
              <TableInput name="address" placeholder="Адрес" value={address} setValue={setAddress}/>
              <OrderBtn fieldName="address"/>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return <tr key={user.id} onClick={() => {handlerOpenModal(user.id)}}>
              <td className={styles.col}>{user.firstName} {user.maidenName} {user.lastName}</td>
              <td className={styles.col}>{user.age}</td>
              <td className={styles.col}>{user.gender}</td>
              <td className={styles.col}>{user.phone}</td>
              <td className={styles.col}>{user.address.city} {user.address.address}</td>
            </tr>
          })}
        </tbody>
      </table> :
      <ErrorMessage />
      }
    </>
  );
}