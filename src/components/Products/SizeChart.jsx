import React from 'react'
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

function SizeChart({free, xs, s, m, l, xl}) {

    const classes = useStyles();


    const data = {
        labels: ['FREE', 'XS', 'S', 'M', 'L', 'XL'],
        datasets: [
        {
            backgroundColor: [
                "#FF6347",
                "#FFFF66",
                "#66FF99",
                "#66CCFF",
                "#9999FF",
                "#FFAAFF",
            ],
            data: [free.length, xs.length, s.length, m.length, l.length, xl.length]
        }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'サイズ別'
            },
            subtitle: {
                display: true,
                text: `FREE：${free.length}  XS：${xs.length}  S：${s.length}  M：${m.length}  L：${l.length}  XL：${xl.length}`
            },
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Bar data={data} options={options}></Bar>
        </Paper>
    )
}

export default SizeChart
