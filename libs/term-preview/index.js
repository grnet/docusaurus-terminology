import React, { useEffect, useState } from "react";
import Postel from "postel";
import BrowserOnly from "@docusaurus/BrowserOnly";
import RcTooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import "./tooltip-styles.css";

const caret = {
  height: "10px",
  width: "10px",
  background: "rgb(255, 255, 255)",
  clipPath: "polygon(100% 0px, 0% 100%, 100% 100%)",
  filter: "drop-shadow(rgba(50, 50, 0, 0.5) -1px 16px 6px)",
};

const link = {
  textDecoration: "underline",
};

const Content = React.forwardRef(({ setContent, content, url, theme }, ref) => {
  if (typeof window !== undefined) {
    if (!window._cachedTerms) {
      window._cachedTerms = {};
    }
  }

  useEffect(() => {
    const JSONurl = `${url}.json`;
    if (!content) {
      if (!window._cachedTerms[JSONurl]) {
        fetch(JSONurl)
          .then((res) => res.json())
          .then((obj) => {
            setContent(obj);
            window._cachedTerms[JSONurl] = obj;
          });
      } else {
        setContent(window._cachedTerms[JSONurl]);
      }
    }
  }, [content, url]);
  return (
    <div className={`mytooltip ${theme}`} ref={ref}>
      {content ? (
        <>
          <h4>{content.metadata.title}</h4>
          <p>{content.metadata.hoverText}</p>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
});

const Tooltip = (props) => {
  const { children, pathName } = props;
  const [content, setContent] = useState();
  const cleanPathname = pathName.replace(/\/$/, "");

  return (
    <BrowserOnly
      fallback={<div>The fallback content to display on prerendering</div>}
    >
      {() => (
        <RcTooltip
          placement="top"
          overlay={
            <Content
              url={cleanPathname}
              content={content}
              setContent={setContent}
              theme="white"
            />
          }
        >
          <a style={link} href={pathName}>
            {children}
          </a>
        </RcTooltip>
      )}
    </BrowserOnly>
  );
};

export default Tooltip;
