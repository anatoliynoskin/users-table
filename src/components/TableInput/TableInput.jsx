
export const TableInput = ({name, placeholder, value, setValue}) => {

  return (
    <input
      key={name}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => {setValue(event.target.value)}}
    />
  )
}