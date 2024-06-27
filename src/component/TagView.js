import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useNavigate } from "react-router-dom";
import { maxContent, onPhone } from "../constants";

const TagViewContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: ${onPhone}px) {
    padding: 16px 0px;
    display: block;
  }
`;

const TagViewWidth = styled.div`
  max-width: ${maxContent}px;
`;

const MermaidPre = styled.pre`
  max-width: 100%;
  max-height: 50vh;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 16px;
  box-shadow: inset 2px 2px 10px #aaaaaa;
  text-align: center;
  overflow: hidden;
  touch-action: none;
  cursor: grab;

  @media (max-width: ${onPhone}px) {
    border-radius: 0px;
  }
`;

const badge = `<span style="background-color: red; border-radius: 50%; display: inline-flex; width: 30px; height: 30px; align-items: center; justify-content: center;"><i class="fa fa-code"></i></span>`;

const tierColor = `
    classDef tier0 fill:#ad5600, color:#fff, stroke:#0000
    classDef tier1 fill:#435f7a, color:#fff, stroke:#0000
    classDef tier2 fill:#ec9a00, color:#fff, stroke:#0000
    classDef tier3 fill:#27e2a4, color:#fff, stroke:#0000
    classDef tier4 fill:#00b4fc, color:#fff, stroke:#0000
    classDef tier5 fill:#ff0062, color:#fff, stroke:#0000
`;

const filter = `
    <defs>
        <filter id="drop-shadow" x="-100%" y="-100%" width="300%" height="300%">
            <feFlood flood-color="black" result="color"/>
            <feComposite in2="SourceGraphic" in="color" operator="in"/>
            <feGaussianBlur stdDeviation="3"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
            </feComponentTransfer>
            <feOffset dx="1" dy="2"/>
            <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>
`;

export default function TagView({ title, tags, related, impl }) {
  const navigate = useNavigate();
  const id = `mermaid-tag-${Math.random().toString().slice(2)}`;

  const [postSet, setPostSet] = useState(new Set());

  useEffect(() => {
    setPostSet(new Set([...impl].map(({ tag }) => tag)));
  }, [impl]);

  useEffect(() => {
    const tagSet = new Set(tags.map(({ tag }) => tag));

    let main = "\n";
    let def = "\n";

    for (const { tag, next } of related)
      if (tagSet.has(tag) && tagSet.has(next)) main += `#${tag} --> #${next}\n`;

    for (const { tag, exp, tier } of tags) {
      const hasPost = postSet.has(tag);
      let node = `<div style="height: 30px; font-family: Noto Sans KR; display: flex; align-items: center; gap: 5px">${
        hasPost ? badge : ""
      }#${exp} <span style="opacity: 0.8; font-size: 0.8em;">${tag}</span></div>`;
      if (hasPost)
        node =
          `<a class="in-diagram" style="color: white; text-decoration: none;" href="/post/${tag}">` +
          node +
          `</a>`;
      def += `#${tag}(["` + node + `"]):::tier${tier}\n`;
    }

    const graph = "graph LR\n" + main + def + tierColor;

    mermaid.render("mermaid-tag", graph).then(({ bindFunctions, svg }) => {
      const pre = document.getElementById(id);
      if (!pre) return;
      pre.innerHTML = svg;
      bindFunctions(pre);

      const current = pre.firstChild;

      const style = new Map(
        current
          .getAttribute("style")
          .trim()
          .split(";")
          .map((style) => style.split(":").map((text) => text.trim()))
      );
      const maxWidth = style.get("max-width");
      current.setAttribute(
        "width",
        `${Number(maxWidth.substring(0, maxWidth.length - 2)) * 0.8}px`
      );

      const anchors = document.querySelectorAll("a.in-diagram");
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          navigate(anchor.getAttribute("href"));
        });
      });

      current.insertAdjacentHTML("afterbegin", filter);
      ["rect", "circle"].forEach((shape) => {
        const drawElement = current.querySelectorAll(shape);
        if (drawElement)
          drawElement.forEach((e) => {
            e.setAttribute("filter", `url(#drop-shadow)`);
          });
      });

      current.viewBox.baseVal.x -= 8;
      current.viewBox.baseVal.y -= 8;
      current.viewBox.baseVal.width += 10;
      current.viewBox.baseVal.height += 10;
    });
  }, [id, navigate, postSet, tags, related]);

  const preRef = useRef(null);
  let isDragStarted = false;
  let isDragging = false;
  let startPos = { x: 0, y: 0 };
  let scrollPos = { left: 0, top: 0 };

  const onDragStart = (e) => {
    preRef.current.scrollLeft = scrollPos.left;
    preRef.current.scrollTop = scrollPos.top;
    startPos.x = e.pageX || e.touches[0].pageX;
    startPos.y = e.pageY || e.touches[0].pageY;
    isDragStarted = true;
  };

  const onDrag = (e) => {
    if (!isDragStarted) return;
    isDragging = true;
    const pageX = e.pageX || e.touches[0].pageX;
    const pageY = e.pageY || e.touches[0].pageY;
    preRef.current.scrollLeft = scrollPos.left - (pageX - startPos.x);
    preRef.current.scrollTop = scrollPos.top - (pageY - startPos.y);
  };

  const onDragEnd = (e) => {
    scrollPos.left = preRef.current.scrollLeft;
    scrollPos.top = preRef.current.scrollTop;
    if (isDragging)
      e.preventDefault();
    isDragStarted = false;
    isDragging = false;
  };

  return (
    <TagViewContainer>
      <TagViewWidth>
        <h2 style={{padding: "0px 32px"}}>{title}</h2>
        <MermaidPre
          id={id}
          ref={preRef}
          onTouchStart={(e) => {
            onDragStart(e);
          }}
          onMouseDown={(e) => {
            onDragStart(e);
          }}
          onTouchMove={(e) => {
            onDrag(e);
          }}
          onMouseMove={(e) => {
            onDrag(e);
          }}
          onMouseUp={(e) => {
            onDragEnd(e);
          }}
          onTouchEnd={(e) => {
            onDragEnd(e);
          }}
          onMouseLeave={(e) => {
            onDragEnd(e);
          }}
          onTouchCancel={(e) => {
            onDragEnd(e);
          }}
        />
      </TagViewWidth>
    </TagViewContainer>
  );
}
