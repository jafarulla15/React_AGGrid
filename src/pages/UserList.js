import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function UserList() {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();
  const gridRef = useRef();

  const fetchData = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setRowData(data))
      .catch(()=> alert('Cannot reach mock API. Start json-server (npm run server).'));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = (id) => {
    if(!window.confirm('Delete user?')) return;
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if(!res.ok) throw new Error('Delete failed');
        setRowData((prev) => prev.filter((u) => u.id !== id));
      })
      .catch((err)=> alert(err.message));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      headerName: "Actions",
      cellRenderer: (params) => {
        return (
          <div>
            <button onClick={() => navigate(`/edit/${params.data.id}`)}>
              Edit
            </button>
            &nbsp;
            <button onClick={() => deleteUser(params.data.id)}>
              Delete
            </button>
          </div>
        );
      },
      minWidth: 200
    },
  ];

  return (
    <div className="container">
      <h2>User List</h2>
      <div style={{display:'flex', gap:8}}>
        <button onClick={() => navigate("/add")}>Add New User</button>
        <button onClick={fetchData}>Refresh</button>
      </div>

      <div className="ag-theme-alpine" style={{ height: 420, marginTop: 16 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columns}
          animateRows={true}
          defaultColDef={{ sortable: true, filter: true, resizable: true }}
        />
      </div>
    </div>
  );
}

export default UserList;
