import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { companyData } from "../../assets/hardcodeData/companyData";

export const GridTable = ({ tableHead }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableHead.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            companyData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.CompanyName}</TableCell>
                <TableCell>{data.GSTIN}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
