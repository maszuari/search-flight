import React from "react";
import Grid from '@mui/material/Grid';
import SearchBar from '../../components/SearchBar/SearchBar';
import DataTable from '../../components/DataTable/DataTable';
import Menu from '../../components/Menu/Menu';

export default function Home() {

    return (
        <React.Fragment>
                <Grid container spacing={2} m={2}>
                    <Grid item xs={2} >
                        Search Flight
                    </Grid>
                    <Grid item xs={10}>
                        <SearchBar />
                    </Grid>
                    <Grid item xs={2}>
                        <Menu />
                    </Grid>
                    <Grid item xs={10}>
                        <DataTable />
                    </Grid>
                </Grid>
        </React.Fragment>
    )
}