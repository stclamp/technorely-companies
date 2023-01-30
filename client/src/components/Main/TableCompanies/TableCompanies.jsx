import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./TableCompanies.css";
import { sortBy, setCompany } from "store/slices/companySlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TableCompanies = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAsc, setIsAsc] = useState(false);
  const [method, setMethod] = useState("ASC");

  const getCompanyFromDb = (
    id,
    name,
    adress,
    service,
    numOfEmployees,
    description,
    type
  ) => {
    dispatch(
      setCompany({
        name,
        adress,
        service,
        numOfEmployees,
        description,
        type,
        userId: store.user.id,
      })
    );
    navigate(`/company/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortByField = (sort, method) => {
    setIsAsc(!isAsc);
    isAsc ? setMethod("ASC") : setMethod("DESC");
    dispatch(
      sortBy({ sort: sort, userId: String(store.user.id), method: method })
    );
  };

  return (
    <>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="table__sortable"
                  onClick={() => {
                    sortByField("name", method);
                  }}
                >
                  Company Name
                </TableCell>
                <TableCell align="right">Company Adress</TableCell>
                <TableCell
                  align="right"
                  className="table__sortable"
                  onClick={() => {
                    sortByField("service", method);
                  }}
                >
                  Service
                </TableCell>
                <TableCell align="right">Number of employees</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.company.companies &&
                store.company.companies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id + 1}
                      className="table__row"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      onClick={() => {
                        getCompanyFromDb(
                          row.id,
                          row.name,
                          row.adress,
                          row.service,
                          row.numOfEmployees,
                          row.description,
                          row.type
                        );
                      }}
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
                  ))}
            </TableBody>
          </Table>
          {store.company.companies.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={store.company.companies.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default TableCompanies;
