import Header from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCompany } from "store/slices/companySlice";

function Company({ id, handleLogout }) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompany(id));
    if (!user.isAuth && user.isLoading) {
      navigate("/signin");
    }
  }, [dispatch, id, navigate, user.isAuth, user.isLoading]);

  return (
    <>
      <Header handleLogout={handleLogout} />
      <p>{company.name} </p>
    </>
  );
}
export default Company;
