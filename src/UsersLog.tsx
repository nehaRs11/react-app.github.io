import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from 'axios'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';


// Row Data interface
type User = {
    id: number,
    name: string,
    lname: string,
    dob: string,
    age: string,
    address: string,
    email: string;
}

function UserLog() {

    const [data, setData] = useState<User | null>(null);
    const navigate = useNavigate();
    const gridRef = useRef<AgGridReact<User>>(null);
    const pushMeClicked = (e: React.MouseEvent) => {
        gridRef.current!.api.deselectAll();
    }

    const update =
        <button onClick={(props) => {
            console.log(props)
            // axios.put(`http://localhost:8080/users/${values.data.id}`, values.data)
            //     .then((res) => {
            //         alert("Successfully updated!")
            //         // toast("Wow so easy!");
            //     })
            //     .catch((err) => alert(err))
        }}> Update </button>


    const [colDefs, setcolDefs] = useState([
        {
            field: 'id'
        },
        { field: 'name' },
        { field: 'lastname' },
        { field: 'dob' },
        { field: 'age' },
        { field: 'address' },
        { field: 'email' }
        // { field: '', cellRenderer: () => update }
    ]);
    const defCol = useMemo(() => ({
        sortable: true,
        filter: true, flex: 1,
        editable: true, resizable: true
    }), [])

    const onGridReady = (p: any) => {
        axios.get<User[]>("http://localhost:8080/users")
            .then((res) => {
                console.log(res.data)
                p.api.applyTransaction({ add: res.data })
            })
    }

    return (
        <>  <AppBar color='inherit' sx={{ margin: '40' }}>
            <Toolbar>
                <Button startIcon={<ArrowBackIosIcon />} color="inherit" onClick={() => navigate('/home')} sx={{ float: 'left' }}></Button>
                <Typography variant='h5' component='div' sx={{ flexGrow: 1, fontFamily: 'initial' }}> Users Log </Typography>

            </Toolbar>
        </AppBar>
            <div className="ag-theme-alpine-dark" style={{ textAlign: 'center', justifyContent: 'center', height: 500, width: 1050, margin: '180px', marginLeft: '140px' }}>
                {/* <button onClick={pushMeClicked}>Push</button> */}

                <AgGridReact
                    ref={gridRef}
                    // rowData={rowData}
                    columnDefs={colDefs}
                    onGridReady={onGridReady}
                    rowSelection={'multiple'}
                    animateRows={true}
                    defaultColDef={defCol}
                    // onCellValueChanged={(values) => console.log(values)}

                    onCellValueChanged={(values) => {
                        axios.put(`http://localhost:8080/users/${values.data.id}`, values.data)
                            .then((res) => {
                                alert("Successfully updated!")
                                // toast("Wow so easy!");
                            })
                            .catch((err) => alert(err))
                    }}
                />

            </div>
        </>
    )
}

export default UserLog