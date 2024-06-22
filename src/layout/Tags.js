import { useEffect, useState } from "react";
import csvLoader from "../util/csvLoader";

export default function Tags() {
    const [tags, setTags] = useState(null);
    const [related, setRelated] = useState(null);
    const [group, setGroup] = useState(null);
    const [impl, setImpl] = useState(null);

    useEffect(() => {
        csvLoader("tags", (table) => setTags(table));
        csvLoader("related", (table) => setRelated(table), true);
        csvLoader("group", (table) => setGroup(table), true);
        csvLoader("impl", (table) => setImpl(table));
    }, []);

    return <></>;
}