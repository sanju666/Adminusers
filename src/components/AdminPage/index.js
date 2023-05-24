import { Component } from "react";
import axios from "axios";
import "./index.css";
import AdminUsers from "../AdminUsers";
import Pagination from "../Pagination";

const items = [
  { item: 0, status: false },
  { item: 1, status: false },
  { item: 2, status: false },
  { item: 3, status: false },
  { item: 4, status: false },
];

class AdminPage extends Component {
  state = {
    usersData: [],
    AdminData: [],
    pagesData: [],
    data_length: 0,
    search: "",
    page: 0,
    pageItems: items,
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    let { data } = await axios.get(url).then((response) => {
      return response;
    });
    data = data.map((each) => ({
      id: each.id,
      name: each.name,
      email: each.email,
      role: each.role,
      checkStatus: false,
      editStatus: false,
    }));

    this.setState({
      usersData: data,
      AdminData: data,
      pagesData: data.slice(0, 10),
      data_length: data.length,
    });
  };

  getPage = (id) => {
    const { AdminData, data_length, pageItems } = this.state;
    console.log(AdminData);
    const first = id * 10;
    const second = data_length < id * 10 ? data_length : (id + 1) * 10;
    const pageData = AdminData.slice(first, second);
    console.log("hj");
    console.log(pageData);
    this.setState({
      pagesData: pageData,
      page: id,
    });
  };

  onEditRow = (id) => {
    const { AdminData, page } = this.state;
    const filteredData = AdminData.map((each) => {
      if (each.id === id) {
        return { ...each, editStatus: !each.editStatus };
      } else {
        return each;
      }
    });
    this.setState(
      {
        AdminData: filteredData,
      },
      () => this.getPage(page)
    );
  };

  getEditDetails = (data, id, userFeild, r) => {
    const filteredData = data.map((each) => {
      if (each.id === id) {
        if (r === "name") {
          return { ...each, name: userFeild };
        } else if (r === "email") {
          return { ...each, email: userFeild };
        } else {
          return { ...each, role: userFeild };
        }
      } else {
        return each;
      }
    });
    return filteredData;
  };

  onEditFeild = (id, userFeild, r) => {
    const { AdminData, page, usersData } = this.state;
    const newAdminData = this.getEditDetails(AdminData, id, userFeild, r);
    const newMaterData = this.getEditDetails(usersData, id, userFeild, r);
    this.setState(
      {
        AdminData: newAdminData,
        usersData: newMaterData,
      },
      () => this.getPage(page)
    );
  };

  getSearchResults = (e) => {
    const searchValue = e.target.value;
    const { usersData } = this.state;
    const filteredData = usersData.filter((each) => {
      if (
        each.name.includes(searchValue) ||
        each.email.includes(searchValue) ||
        each.role.includes(searchValue)
      ) {
        return each;
      }
      return null;
    });

    this.setState(
      {
        AdminData: filteredData,
        data_length: filteredData.length,
        search: searchValue,
        page: 0,
      },
      () => this.getPage(0)
    );
  };

  previousPage = () => {
    const { page } = this.state;
    const previous = page === 0 ? page : page - 1;
    this.getPage(previous);
  };

  nextPage = (id) => {
    const { page } = this.state;
    const next = page === id ? page : page + 1;
    this.getPage(next);
  };

  getDetails = (Data, id) => {
    const checkIndex = Data.findIndex((each) => each.id === id);
    let Element = Data[checkIndex];
    Element = {
      ...Element,
      checkStatus: !Element.checkStatus,
    };
    const firstHalf = Data.slice(0, checkIndex);
    const secondHalf = Data.slice(checkIndex + 1, Data.length);
    return [...firstHalf, Element, ...secondHalf];
  };

  getCheckStatus = (id) => {
    const { AdminData, usersData, page } = this.state;
    const adminStatusData = this.getDetails(AdminData, id);
    const masterData = this.getDetails(usersData, id);
    console.log(adminStatusData);
    this.setState(
      {
        AdminData: adminStatusData,
        usersData: masterData,
      },
      () => this.getPage(page)
    );
  };

  modifiedArray = (data, id) => {
    const fIndex = data.findIndex(
      (each) => each.id === id && each.checkStatus === true
    );
    if (fIndex === -1) {
      return data;
    } else {
      return [...data.slice(0, fIndex), ...data.slice(fIndex + 1, data.length)];
    }
  };

  onDeleteRow = (id) => {
    const { AdminData, usersData, page } = this.state;
    const newAdminData = this.modifiedArray(AdminData, id);
    const newMaterData = this.modifiedArray(usersData, id);
    this.setState(
      {
        AdminData: newAdminData,
        usersData: newMaterData,
        data_length: newAdminData.length,
      },
      () => this.getPage(page)
    );
  };

  selectPageUsers = () => {
    const { pagesData, page, pageItems, AdminData, usersData } = this.state;
    const updatedStatus = !pageItems[page].status;
    const updatedPagesItem = pageItems.map((each) => {
      if (each.item === page) {
        return { ...each, status: updatedStatus };
      } else {
        return each;
      }
    });
    let tempAdmin = AdminData;
    let tempUser = usersData;
    const filteredpageData = pagesData.map((each) => each.id);
    const updatedPageData = pagesData.map((each) => ({
      ...each,
      checkStatus: updatedStatus,
    }));
    for (let each of filteredpageData) {
      tempAdmin = tempAdmin.map((item) => {
        if (item.id === each) {
          return { ...item, checkStatus: updatedStatus };
        } else {
          return item;
        }
      });
    }
    for (let each of filteredpageData) {
      tempUser = tempUser.map((item) => {
        if (item.id === each) {
          return { ...item, checkStatus: updatedStatus };
        } else {
          return item;
        }
      });
    }
    this.setState(
      {
        pageItems: updatedPagesItem,
        AdminData: tempAdmin,
        pagesData: updatedPageData,
        usersData: tempUser,
      },
      () => this.getPage(page)
    );
  };

  deleteArray = (data, l) => {
    for (let item of l) {
      const { id } = item;
      const fIndex = data.findIndex((each) => each.id === id);
      data = [...data.slice(0, fIndex), ...data.slice(fIndex + 1, data.length)];
    }
    data = data.map((each) => ({ ...each, checkStatus: false }));
    return data;
  };

  onDeletePageRows = () => {
    const { AdminData, usersData, pagesData, page, pageItems } = this.state;
    const deleteAdminData = pagesData.filter(
      (each) => each.checkStatus === true
    );
    const newAdminData = this.deleteArray(AdminData, deleteAdminData);
    const newMaterData = this.deleteArray(usersData, deleteAdminData);
    const updatedPageItems = pageItems.map((each) => ({
      ...each,
      status: false,
    }));
    console.log(updatedPageItems);
    this.setState(
      {
        AdminData: newAdminData,
        usersData: newMaterData,
        pageItems: updatedPageItems,
        data_length: newAdminData.length,
      },
      () => this.getPage(0)
    );
  };

  render() {
    const { pagesData, data_length, searchValue, pageItems, page } = this.state;
    const { status } = pageItems[page];
    console.log(pagesData);

    return (
      <div className="Admin-container">
        <div>
          <input
            type="search"
            className="search-bar"
            placeholder="Search by name,email or role"
            value={searchValue}
            onChange={this.getSearchResults}
          />
        </div>
        <table className="table-container ">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onClick={this.selectPageUsers}
                  key={status}
                  defaultChecked={status}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagesData.map((each) => (
              <AdminUsers
                user={each}
                getCheckStatus={this.getCheckStatus}
                key={each.id}
                onDeleteRow={this.onDeleteRow}
                onEditRow={this.onEditRow}
                onEditFeild={this.onEditFeild}
                page={page}
              />
            ))}
          </tbody>
        </table>
        <div className="second-section">
          <div>
            <button
              type="button"
              className="deselect-button"
              onClick={this.onDeletePageRows}
            >
              Delete Selected
            </button>
          </div>
          <div className="pages-section">
            <Pagination
              data_length={data_length}
              getPage={this.getPage}
              previousPage={this.previousPage}
              nextPage={this.nextPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
