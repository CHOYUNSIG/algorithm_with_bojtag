import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/action/csvAction";
import TagView from "../component/TagView";
import lookup from "../util/lookup";

export default function TagGroup() {
  const { groupName } = useParams();

  const dispatch = useDispatch();
  const tables = useSelector((state) => state.csv);

  const [tagViews, setTagViews] = useState(new Map());

  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);

  useEffect(() => {
    const { group, impl, related, tags } = tables;
    if (
      tagViews.has(groupName) ||
      [group, impl, related, tags].includes(undefined)
    )
      return;

    const tagMap = new Map([...tags].map((row) => [row.tag, row]));

    const groupTags =
      groupName !== "기타"
        ? lookup(group, "group", groupName, "tag").map(({ tag }) =>
            tagMap.get(tag)
          )
        : (() => {
            const remainTag = new Set([...tags].map((row) => row.tag));
            [...group].forEach(({ tag }) => {
              if (remainTag.has(tag)) remainTag.delete(tag);
            });
            return [...remainTag].map((tag) => tagMap.get(tag));
          })();

    const newTagViews = new Map(tagViews);
    newTagViews.set(
      groupName,
      <TagView
        key={groupName}
        title={groupName}
        tags={groupTags}
        related={related}
        impl={impl}
      />
    );
    setTagViews(newTagViews);
  }, [tables, tagViews, groupName]);

  return <div>{tagViews.has(groupName) ? tagViews.get(groupName) : null}</div>;
}
