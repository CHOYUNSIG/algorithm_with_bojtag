import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action/csvAction";
import PostCard from "../component/PostCard";
import styled from "styled-components";
import { maxContent } from "../constants";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > div {
    max-width: ${maxContent}px;
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
`;

export default function Posts() {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.csv);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);

  useEffect(() => {
    const { posts, impl } = tables;
    if (!posts || !impl) return;

    const implMap = new Map([...impl].map((row) => [row.md, row.tag]));

    setCards(
      [...posts]
        .sort((row1, row2) => (row1.date < row2.date ? 1 : -1))
        .map(({ md, title, subtitle, date, writer }) => (
          <PostCard
            key={md}
            to={"/post/" + implMap.get(md)}
            title={title}
            subtitle={subtitle}
            date={date}
            writer={writer}
          />
        ))
    );
  }, [tables]);

  return <CardWrapper><div>{cards}</div></CardWrapper>;
}
