import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCompanies } from "store/slices/companySlice";

const TableCompanies = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  //   const removeCompany = (id) => {
  //     dispatch(removeCompany(id));
  //   };

  //   console.log(store);
  const filteredCompanies = store.company.companies.filter(
    (item) => +item.userId === +store.user.id
  );

  console.log(filteredCompanies);

  return (
    <>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell align="right">Company Adress</TableCell>
                <TableCell align="right">Service</TableCell>
                <TableCell align="right">Number of employees</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCompanies &&
                filteredCompanies.map((row) =>
                  store.company.isLoading ? (
                    <p>Loading</p>
                  ) : (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.adress}</TableCell>
                      <TableCell align="right">{row.service}</TableCell>
                      <TableCell align="right">{row.numOfEmployees}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default TableCompanies;
