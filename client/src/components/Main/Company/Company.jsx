import Header from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCompany } from "store/slices/companySlice";

function Company({ id, handleLogout }) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompany(id));
  }, []);

  return user.isAuth ? (
    <>
      <Header handleLogout={handleLogout} />
      <p>{company.id}</p>
    </>
  ) : (
    <Navigate to="/signin" />
  );
}
export default Company;
