import { createPortal } from "react-dom"
import { Modal } from "./Modal"
import { useUsersTableContext } from "../../contexts/usersTableContext";

export const ModalWrapper = () => {
  const {isOpen, setIsOpen} = useUsersTableContext();
  return (
    createPortal(
      isOpen ?
      <Modal
        closeModal={() => setIsOpen(false)}
      />
      : ''
    , document.getElementById("root"))
  )
}