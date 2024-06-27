import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchTable } from "../redux/action/csvAction";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { brandColor } from "../constants";

const ButtonWrapper = styled.div`
  padding: 8px;
  text-align: center;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: transparent;
  border: none;
  border-radius: 16px;
  box-shadow: 2px 2px 10px #aaaaaa;
  transition: 0.2s;

  &:hover {
    background-color: #${brandColor};
  }

  &.selected {
    color: white;
    background-color: #${brandColor};
  }
`;

export default function Tags() {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.csv);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [groupList, setGroupList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);

  useEffect(() => {
    if (pathname === "/tags") setSelected(null);
  }, [pathname]);

  useEffect(() => {
    const group = tables.group;
    if (!group) return;
    setGroupList([...new Set([...group].map((row) => row.group)), "기타"]);
  }, [tables]);

  return (
    <div>
      <ButtonWrapper>
        {groupList.map((group, index) => {
          const i = index;
          return (
            <Button
              key={group}
              onClick={() => {
                setSelected(i);
                navigate("/tags/" + group);
              }}
              className={index === selected ? "selected" : null}
            >
              {group}
            </Button>
          );
        })}
      </ButtonWrapper>
      {selected === null ? (
        <div
          style={{
            border: "dotted 3px #aaaaaa",
            borderRadius: "16px",
            margin: "16px",
            height: "50vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: "0.8",
          }}
        >
          <i
            className="fa fa-arrow-up"
            style={{
              padding: "16px",
            }}
          ></i>
          카테고리를 선택하세요.
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
