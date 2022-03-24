import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function DataTable() {

    const data = useSelector((state) => state.flight.value);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Airline</TableCell>
                            <TableCell align="right">Number of Stops</TableCell>
                            <TableCell align="right">Inbound Duration</TableCell>
                            <TableCell align="right">Outbound Duration</TableCell>
                            <TableCell align="right">Total Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            :data
                          ).map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Stack direction="row" spacing={2}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={row.AirlineLogoAddress}
                                        variant="square"
                                        sx={{ width: 24, height: 24 }}
                                    /> 
                                    <Box ml={1}>{row.AirlineName}</Box>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">{row.Stops}</TableCell>
                                <TableCell align="right">{row.InboundFlightsDuration}</TableCell>
                                <TableCell align="right">{row.OutboundFlightsDuration}</TableCell>
                                <TableCell align="right">{row.TotalAmount}</TableCell>
                            </TableRow>
                        ))}
                        
                            {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5,10]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={data.length <= 0 ? 0 : page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </React.Fragment>
    );
}