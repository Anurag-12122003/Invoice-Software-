import { Stack } from "@mui/material";
import { GridTable } from "../components/gridTable/GridTable";
import { GridHeader } from "../components/gridHeader/GridHeader";

export const Company = () => {
    const tableHead = ["Company Name", "GSTIN", "Action"];

    return <Stack sx={{ mt: "10rem" }}>
        <GridHeader />
        <GridTable tableHead={tableHead} />
    </Stack>
};