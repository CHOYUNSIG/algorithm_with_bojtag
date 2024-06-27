import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action/csvAction";

export default function Tags() {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.csv);

  const [tagViews, setTagViews] = useState([]);

  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);

  useEffect(() => {
    const { group, impl, related, tags } = tables;
    if ([group, impl, related, tags].includes(undefined)) return;
    
  }, [tables]);

  return <div>{tagViews}</div>;
}
