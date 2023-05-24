import { MdDeleteOutline } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import "./index.css";

const AdminUsers = (props) => {
  const {
    user,
    getCheckStatus,
    onDeleteRow,
    onEditRow,
    onEditFeild,
    page,
  } = props;
  const { name, email, role, id, checkStatus, editStatus } = user;
  console.log(user);

  return (
    <tr>
      <td key={page}>
        <input
          type="checkbox"
          defaultChecked={checkStatus}
          onClick={() => getCheckStatus(id)}
        />
      </td>
      {editStatus === true ? (
        <td>
          <input
            type="text"
            value={name}
            onChange={(e) => onEditFeild(id, e.target.value, "name")}
          />
        </td>
      ) : (
        <td>{name}</td>
      )}
      {editStatus === true ? (
        <td>
          <input
            type="text"
            value={email}
            onChange={(e) => onEditFeild(id, e.target.value, "email")}
          />
        </td>
      ) : (
        <td>{email}</td>
      )}
      {editStatus === true ? (
        <td>
          <input
            type="text"
            value={role}
            onChange={(e) => onEditFeild(id, e.target.value, "role")}
          />
        </td>
      ) : (
        <td>{role}</td>
      )}
      <td>
        <div>
          <RiEditBoxLine className="edit" onClick={() => onEditRow(id)} />
          <MdDeleteOutline
            className="delete-icon"
            onClick={() => onDeleteRow(id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default AdminUsers;
