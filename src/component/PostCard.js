import styled from "styled-components";
import { Link } from "react-router-dom";
import { brandColor, standardShadow } from "../constants";

const Card = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 16px;
  box-shadow: ${standardShadow};
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: 0.2s;

  &:hover {
    background-color: #${brandColor};
  }

  h1 {
    margin: 0px;
    padding: 0px;
    font-size: 1.2em;
  }

  h2 {
    margin: 0px;
    padding: 0px;
    font-size: 1em;
    font-weight: lighter;
  }
`;

const IconSpan = styled.span`
  font-size: 0.8em;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export default function PostCard({ to, title, subtitle, date, writer }) {
  return (
    <Link to={to} style={{ color: "black", textDecoration: "none" }}>
      <Card>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {date ? (
            <IconSpan>
              <i className="fa fa-calendar"></i>
              <span>{date}</span>
            </IconSpan>
          ) : null}
          {writer ? (
            <IconSpan>
              <i className="fa fa-pen"></i>
              <span>{writer}</span>
            </IconSpan>
          ) : null}
        </div>
      </Card>
    </Link>
  );
}
