import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

import './UserList.css';

import userApis from '../../api/user.api';
import { changeMenu } from '../../redux/side_bar_slice';

export default function UserList() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    dispatch(changeMenu('USER'));
  }, [dispatch]);

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
      renderCell: (params) => {
        return params.row.gender === 'MALE' ? (
          <div>
            <span className="userGender male">Man</span>
          </div>
        ) : (
          <div>
            <span className="userGender female">Woman</span>
          </div>
        );
      },
    },
    {
      field: 'transaction',
      headerName: 'Transactions',
      width: 160,
      renderCell: (params) => {
        return params.row.orders.length > 0 ? (
          <span>{params.row.orders.length}</span>
        ) : (
          <span>No transactions</span>
        );
      },
    },
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
        <div className="userListTitleContainer">
          <h1 className="userTitle">Customer List</h1>
        </div>
        <DataGrid
          rows={userData}
          autoHeight
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          checkboxSelection={true}
        />
      </div>
    )
  );
}
