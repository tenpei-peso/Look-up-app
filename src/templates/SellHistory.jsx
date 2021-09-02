import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { useState } from 'react';
import GenderChart from '../components/Products/GenderChart';
import { Grid } from '@material-ui/core';
import AgeChart from '../components/Products/AgeChart';
import SizeChart from '../components/Products/SizeChart';


const columns = [
  { id: 'name', label: '名前', minWidth: 70 },
  { id: 'category', label: 'カテゴリー', minWidth: 70 },
  {
    id: 'size',
    label: 'サイズ',
    minWidth: 20,
    align: 'right',
  },
  {
    id: 'price',
    label: '値段',
    minWidth: 30,
    align: 'right',
  },
  {
    id: 'gender',
    label: '性別',
    minWidth: 20,
    align: 'right',
  },
  {
    id: 'age',
    label: '年齢',
    minWidth: 20,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function SellHistory() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([])

  const [women, setWomen] = useState([])
  const [men, setMen] = useState([])
  const [teen, setTeen] = useState([])
  const [twenty, setTwenty] = useState([])
  const [thirty, setThirty] = useState([])
  const [forty, setForty] = useState([])
  const [fifty, setFifty] = useState([])
  const [sixty, setSixty] = useState([])
  const [free, setFree] = useState([])
  const [xs, setXs] = useState([])
  const [s, setS] = useState([])
  const [m, setM] = useState([])
  const [l, setL] = useState([])
  const [xl, setXL] = useState([])

  const uid = useSelector(state => state.users.uid)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    db.collection('users').doc(uid).collection('userSell').get()
    .then(snapshots => {
        const data = []
        const ageData = []
        snapshots.forEach(snapshot => {
            const map = snapshot.data()
            data.push(map)
            ageData.push(map.age)
        })
        setRows(data)
      })
    }, [])

    useEffect(() => {
      /**グラフのデータとってくる */
      /**GenderChart */
      if(rows) {

        const womenData = rows.filter(value => {
          return value.gender === "女性"
        })
        const menData = rows.filter(value => {
          return value.gender === "男性"
        })
        setWomen(womenData)
        setMen(menData)
      /**AgeChart */
        const teenData = rows.filter(value => {
          return value.age === "10"
        })
        const twentyData = rows.filter(value => {
          return value.age === "20"
        })
        const thirtyData = rows.filter(value => {
          return value.age === "30"
        })
        const fortyData = rows.filter(value => {
          return value.age === "40"
        })
        const fiftyData = rows.filter(value => {
          return value.age === "50"
        })
        const sixtyData = rows.filter(value => {
          return value.age === "60"
        })
        setTeen(teenData)
        setTwenty(twentyData)
        setThirty(thirtyData)
        setForty(fortyData)
        setFifty(fiftyData)
        setSixty(sixtyData)
        /**SizeChart */
        const freeData = rows.filter(value => {
          return value.size === "FREE"
        })
        const xsData = rows.filter(value => {
          return value.size === "XS"
        })
        const sData = rows.filter(value => {
          return value.size === "S"
        })
        const mData = rows.filter(value => {
          return value.size === "M"
        })
        const lData = rows.filter(value => {
          return value.size === "L"
        })
        const xlData = rows.filter(value => {
          return value.size === "XL"
        })
        setFree(freeData)
        setXs(xsData)
        setS(sData)
        setM(mData)
        setL(lData)
        setXL(xlData)
      }
        /**CategoryChart */

        
  }, [rows])

  return (
    <section className="c-section-wrapin">
    {/**グラフ */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <GenderChart women={women} men={men}></GenderChart>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AgeChart teen={teen} twenty={twenty} thirty={thirty} forty={forty} fifty={fifty} sixty={sixty} />
        </Grid>
        <Grid item xs={12}>
          <SizeChart free={free} xs={xs} s={s} m={m} l={l} xl={xl} />
        </Grid>
        <Grid item xs={12}>
          {/**テーブル */}
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        hover="true"
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          </Grid>
        </Grid>
  </section>
  );
}