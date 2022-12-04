import { Link } from "react-router-dom";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


interface Column {
    id: 'name' | 'surname' | 'id' | 'duration' | 'gpa' | 'replacement'| 'total';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns = [
    { id: 'lastname', label: 'Last Name', minWidth: 170 },
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    {
        id: 'dateOfBirth',
        label: 'Date of Birth',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'nationality',
        label: 'Nationality',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'sex',
        label: 'Sex[M/F]',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'academicYear',
        label: 'Academic Year',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'studentCycle',
        label: 'Student Cycle',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'subjectAreaCode',
        label: 'Subject Area Code',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    lastname: string;
    firstName: string;
    dateOfBirth: string;
    nationality: string;
    sex: string;
    academicYear: string;
    studentCycle: string;
    subjectAreaCode: number;
}

function createData(
    lastname: string,
    firstName: string,
    dateOfBirth: string,
    nationality: string,
    sex: string,
    academicYear: string,
    studentCycle: string,
    subjectAreaCode: number
): Data {
    // Data maybe fetched here??
    return { lastname, firstName, dateOfBirth, nationality, sex , academicYear ,  studentCycle, subjectAreaCode};
}

const rows = [
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
    createData('Şenyiğit', 'Kutay', "28/03/2000", "Turkish", "M", "2022", "Bilmemek"),
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
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
    );
}

