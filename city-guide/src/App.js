import React from 'react';
import { CssBaseline, Grid} from '@material-ui/core'


import Header from './components/Header/header';
import List from './components/List/List';
import Map from './components/Map/Map';


const App = ()=>{
    return(
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width: '100%'}}>
                {/* This grid with a type of item, would take the full width (xs=12) on mobile devices and medium and larger devices (md=4 spaces) on */}
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                {/* The map is much larger when compared to the list so it takes 8spaces on medium or larger devices */}
                <Grid item xs={12} md={8}>
                    <Map />
                </Grid>
            </Grid>
        </>
    );
}

export default App;