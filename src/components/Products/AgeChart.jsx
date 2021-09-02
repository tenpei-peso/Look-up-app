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

function AgeChart({teen, twenty, thirty, forty, fifty, sixty}) {

    const classes = useStyles();


    const data = {
        labels: ['10代', '20代', '30代', '40代', '50代', '60代'],
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
            data: [teen.length, twenty.length, thirty.length, forty.length, fifty.length, sixty.length]
        }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: '年齢別'
            },
            subtitle: {
                display: true,
                text: `10代：${teen.length}  20代：${twenty.length}  30代：${thirty.length}  40代：${forty.length}  50代：${fifty.length}  60代：${sixty.length}`
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

export default AgeChart
