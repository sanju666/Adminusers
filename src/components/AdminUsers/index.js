import { MdDeleteOutline } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import "./index.css";

const AdminUsers = (props) => {
  const { user, getCheckStatus, onDeleteRow } = props;
  const { name, email, role, id, checkStatus } = user;

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          defaultChecked={checkStatus}
          onClick={() => getCheckStatus(id)}
        />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <div>
          <RiEditBoxLine className="edit" />
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
