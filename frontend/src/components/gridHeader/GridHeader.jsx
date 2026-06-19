import { Box, Grid } from "@mui/material";
import { ActionBtn } from "../commonBtn/ActionBtn";
import { SearchBox } from "../searchBox/SearchBox";

let gridHeaderLabel = ['Add Company', 'Edit', 'More'];

export const GridHeader = () => {
    return (
        <Grid container>
            <Grid></Grid>
            <Grid>
                <Box>
                    {
                        gridHeaderLabel.map(ele => (
                            <ActionBtn key={ele.toLowerCase()} label={ele} />
                        ))
                    }
                </Box>
                <Box>
                    <SearchBox />
                </Box>
            </Grid>
        </Grid>
    );
};