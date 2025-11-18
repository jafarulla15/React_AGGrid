import React, { useRef, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

/*
  This file uses AG Grid infinite row model.
  It converts AG Grid's request (startRow/endRow, filterModel, sortModel)
  into JSON Server query params:
    - page / _limit => _page & _limit
    - sorting => _sort & _order
    - text filters => field_like=...
    - numeric => field_gte / field_lte / field=...
  Ensure your JSON Server is running and returns X-Total-Count header.
*/

const API_BASE = "http://localhost:5000"; // change if needed

const makeQueryFromRequest = (request) => {
  const { startRow, endRow, filterModel, sortModel } = request;
  const pageSize = endRow - startRow;
  const page = Math.floor(startRow / pageSize) + 1;

  const params = new URLSearchParams();
  params.set("_page", page);
  params.set("_limit", pageSize);

  // sort
  if (Array.isArray(sortModel) && sortModel.length > 0) {
    const sortFields = sortModel.map((s) => s.colId).join(",");
    const sortOrders = sortModel.map((s) => s.sort).join(",");
    params.set("_sort", sortFields);
    params.set("_order", sortOrders);
  }

  // filters
  if (filterModel) {
    Object.keys(filterModel).forEach((colId) => {
      const f = filterModel[colId];
      // text filter model: {filterType:'text', type: 'contains', filter: 'abc'}
      if (f.filterType === "text") {
        // use _like for contains (JSON Server supports field_like)
        if (
          f.type === "contains" ||
          f.type === "equals" ||
          f.type === "startsWith"
        ) {
          // for startsWith we still use _like with ^ anchor (json-server doesn't support ^, but basic _like is enough)
          params.append(`${colId}_like`, encodeURIComponent(f.filter));
        } else {
          params.append(`${colId}_like`, encodeURIComponent(f.filter));
        }
      } else if (f.filterType === "number") {
        // number filter model has {filterType:'number', type: 'inRange'|'equals'|'lessThan'|'greaterThan', filter, filterTo}
        if (f.type === "inRange") {
          if (f.filter !== undefined) params.append(`${colId}_gte`, f.filter);
          if (f.filterTo !== undefined)
            params.append(`${colId}_lte`, f.filterTo);
        } else if (f.type === "equals") {
          params.append(`${colId}`, f.filter);
        } else if (f.type === "lessThan") {
          params.append(`${colId}_lte`, f.filter);
        } else if (f.type === "greaterThan") {
          params.append(`${colId}_gte`, f.filter);
        }
      } else if (f.filterType === "set") {
        // set filter: {values: ['A','B']}
        if (Array.isArray(f.values)) {
          f.values.forEach((v) => params.append(`${colId}`, v));
        }
      }
    });
  }

  return params.toString();
};

export default function EmployeeList() {
  const navigate = useNavigate();
  const gridRef = useRef();
  const [pageSize, setPageSize] = useState(50); // how many records per block

  // Define columns for all attributes present in your db (update names if different)
  const columnDefs = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      filter: "agNumberColumnFilter",
    },
    {
      field: "firstName",
      headerName: "First Name",
      filter: "agTextColumnFilter",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      filter: "agTextColumnFilter",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      filter: "agTextColumnFilter",
      flex: 1.5,
    },
    { field: "phone", headerName: "Phone", filter: "agTextColumnFilter" },
    { field: "age", headerName: "Age", filter: "agNumberColumnFilter" },
    { field: "gender", headerName: "Gender", filter: "agSetColumnFilter" },
    { field: "city", headerName: "City", filter: "agTextColumnFilter" },
    { field: "country", headerName: "Country", filter: "agTextColumnFilter" },
    {
      field: "department",
      headerName: "Department",
      filter: "agSetColumnFilter",
    },
    { field: "position", headerName: "Position", filter: "agTextColumnFilter" },
    { field: "salary", headerName: "Salary", filter: "agNumberColumnFilter" },
    { field: "isActive", headerName: "Active", filter: "agSetColumnFilter" },
    {
      field: "joinDate",
      headerName: "Join Date",
      filter: "agDateColumnFilter",
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      filter: "agDateColumnFilter",
    },
    {
      field: "address",
      headerName: "Address",
      filter: "agTextColumnFilter",
      flex: 1,
    },
    {
      field: "postalCode",
      headerName: "Postal",
      filter: "agNumberColumnFilter",
    },
    {
      field: "nationalId",
      headerName: "National ID",
      filter: "agTextColumnFilter",
    },
    {
      field: "maritalStatus",
      headerName: "Marital",
      filter: "agSetColumnFilter",
    },
    {
      field: "education",
      headerName: "Education",
      filter: "agSetColumnFilter",
    },
    {
      field: "experienceYears",
      headerName: "Exp (yrs)",
      filter: "agNumberColumnFilter",
    },
    { field: "rating", headerName: "Rating", filter: "agNumberColumnFilter" },
    {
      field: "remarks",
      headerName: "Remarks",
      filter: "agTextColumnFilter",
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      filter: "agTextColumnFilter",
    },
    {
      field: "updatedBy",
      headerName: "Updated By",
      filter: "agTextColumnFilter",
    },
    {
      field: "bloodGroup",
      headerName: "Blood Group",
      filter: "agSetColumnFilter",
    },
    {
      field: "emergencyContact",
      headerName: "Emergency",
      filter: "agTextColumnFilter",
    },
    { field: "shift", headerName: "Shift", filter: "agSetColumnFilter" },
    {
      field: "contractType",
      headerName: "Contract",
      filter: "agSetColumnFilter",
    },
    { field: "project", headerName: "Project", filter: "agSetColumnFilter" },
    {
      headerName: "Actions",
      cellRenderer: (params) => {
        return (
          <div>
            <button
              onClick={() => navigate(`/employees/edit/${params.data.id}`)}
            >
              Edit
            </button>
            &nbsp;
            <button
              onClick={() => {
                if (!window.confirm("Delete employee?")) return;
                fetch(`${API_BASE}/employees/${params.data.id}`, {
                  method: "DELETE",
                })
                  .then((r) => {
                    if (!r.ok) throw new Error("Delete failed");
                    // refresh datasource
                    gridRef.current.api.purgeInfiniteCache();
                  })
                  .catch((e) => alert(e.message));
              }}
            >
              Delete
            </button>
          </div>
        );
      },
      minWidth: 170,
    },
  ];

  // datasource for infinite row model
  const datasource = useCallback(
    () => ({
      getRows: (params) => {
        const q = makeQueryFromRequest(params.request);
        const url = `${API_BASE}/employees?${q}`;

        fetch(url)
          .then(async (res) => {
            if (!res.ok) throw new Error("Network response not ok");
            const data = await res.json();
            const total = parseInt(
              res.headers.get("x-total-count") || data.length,
              10
            );
            // AG Grid expects successCallback(rowsThisBlock, lastRow)
            params.successCallback(data, total);
          })
          .catch((err) => {
            console.error(err);
            params.failCallback();
          });
      },
    }),
    []
  );

  // const onGridReady = (params) => {
  //   // register datasource
  //   const ds = datasource();
  //   params.api.setDatasource(ds);
  // };

  // const onGridReady = (params) => {
  //   const ds = {
  //     getRows: (request) => {
  //       const q = makeQueryFromRequest(request.request); // <-- request.request is correct
  //       fetch(`${API_BASE}/employees?${q}`)
  //         .then((r) => r.json())
  //         .then((data) => {
  //           const total = Number(r.headers.get("x-total-count") || data.length);
  //           request.successCallback(data, total);
  //         })
  //         .catch(() => request.failCallback());
  //     },
  //   };
  //   params.api.setDatasource(ds);
  // };

  const onGridReady = (params) => {
    const ds = {
      getRows: (gridParams) => {
        const q = makeQueryFromRequest({
          startRow: gridParams.startRow,
          endRow: gridParams.endRow,
          filterModel: gridParams.filterModel,
          sortModel: gridParams.sortModel,
        });

        const url = `${API_BASE}/employees?${q}`;

        fetch(url)
          .then(async (res) => {
            const data = await res.json();
            const total = parseInt(
              res.headers.get("x-total-count") || data.length,
              10
            );

            gridParams.successCallback(data, total);
          })
          .catch(() => gridParams.failCallback());
      },
    };

    params.api.setDatasource(ds);
  };

  const refresh = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.purgeInfiniteCache();
    }
  };

  return (
    <div className="container">
      <h2>Employees</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={() => navigate("/employees/add")}>Add Employee</button>
        <button onClick={refresh}>Refresh</button>
        <label style={{ marginLeft: 8 }}>
          Page Size:
          <select
            style={{ marginLeft: 6 }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              refresh();
            }}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>

      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            floatingFilter: true,
          }}
          rowModelType="infinite"
          cacheBlockSize={pageSize}
          pagination={false}
          onGridReady={onGridReady}
          suppressAggFuncInHeader={true}
        />
      </div>
    </div>
  );
}
