import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

function GenderChart({women, men}) {
    const classes = useStyles();


    const data = {
        labels: ['女性', '男性'],
        datasets: [
        {
            backgroundColor: [
                "#FF6347",
                "#66CCFF"
            ],
            data: [women.length, men.length]
        }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: '性別'
            },
            subtitle: {
                display: true,
                text: `女性：${women.length} 男性：${men.length}`
            },
            legend: {
                title: {
                    font: {
                        size: 16
                    },
                }
            }
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Doughnut data={data} options={options}></Doughnut>
        </Paper>
        
    )
}

export default GenderChart
