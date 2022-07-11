import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

import './UserList.css';

import userApis from '../../api/user.api';

export default function UserList() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    userApis
      .getAllUser()
      .then((result) => {
        setUserData(result.data);
      })
      .catch((error) => {
        setUserData([]);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Customer',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 120,
    },
    // {
    //   field: 'transaction',
    //   headerName: 'Transaction Volume',
    //   width: 160,
    // },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/user/' + params.row.id}>
              <button className="btnShowUserDetail">Detail</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    userData.length && (
      <div className="userList">
        <DataGrid
          rows={userData}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection={true}
        />
      </div>
    )
  );
}
