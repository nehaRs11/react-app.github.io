import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';


function Hc() {
    const options = {
        title: {
            text: 'Sales'
        },
        series: [
            {
                name: 'Profits',
                data: [100, 23, 34, 56, 67, 85, 99, 34, 74]
            }, {
                name: 'Loss',
                data: [10, 26, 4, 12, 20, 20, 29, 15, 30]
            }
        ]
    }
    const navigate = useNavigate();
    return (
        <div>
            <AppBar color='inherit' sx={{ margin: '40' }}>
                <Toolbar>
                    <Button startIcon={<ArrowBackIosIcon />} color="inherit" onClick={() => navigate('/home')} sx={{ float: 'left' }}>  </Button>
                    <Typography sx={{ flexGrow: 1, fontFamily: 'initial' }} variant='h5' >Sales</Typography>
                </Toolbar>
            </AppBar>
            <HighchartsReact highcharts={Highcharts}
                options={options}
            ></HighchartsReact>
        </div>
    )
}

export default Hc
