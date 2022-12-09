import { Link } from "react-router-dom";
import Card from "../../components/ui/Card"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useTheme} from "@mui/material/styles";
import AcceptedList from "../../components/ui/Tables/AcceptedList"
import WaitingList from "../../components/ui/Tables/WaitingList"
import RankedApplicantsList from "../../components/ui/Tables/RankedApplicants"





interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}



export default function StickyHeadTable() {

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (

        <div className={"Page"}>
            <NavigationBar />
            <Box sx={{ bgcolor: 'background.paper', height: 600 }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Ranked Applicants List" {...a11yProps(0)} />
                        <Tab label="Waiting List" {...a11yProps(1)} />
                        <Tab label="Accepted Students" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>

                <TabPanel value={value} index={0} dir={theme.direction}>
                    <div className={"Table"}>
                        <RankedApplicantsList></RankedApplicantsList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div className={"Table"}>

                        <WaitingList></WaitingList>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <div className={"Table"}>
                        <AcceptedList></AcceptedList>
                    </div>
                </TabPanel>

            </Box>

        </div>

    );
}

function ApplicantsList() {

    return (
        <Card>
        <h1>Hello</h1>
        </Card>);



};
