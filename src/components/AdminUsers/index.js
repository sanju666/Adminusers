import { MdDeleteOutline } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import "./index.css";

const AdminUsers = (props) => {
  const { user, getCheckStatus } = props;
  const { name, email, role, id, checkStatus } = user;

  return (
    <tr>
      <td>
        {checkStatus === true ? (
          <input type="checkbox" checked onClick={() => getCheckStatus(id)} />
        ) : (
          <input type="checkbox" onClick={() => getCheckStatus(id)} />
        )}
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <div>
          <RiEditBoxLine className="edit" />
          <MdDeleteOutline className="delete-icon" />
        </div>
      </td>
    </tr>
  );
};

export default AdminUsers;
