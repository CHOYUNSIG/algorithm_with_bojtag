import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action/csvAction";

export default function Tags() {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.csv);

  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);

  return <div></div>;
}
