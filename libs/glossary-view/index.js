import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

const Glossary = (props) => {
  const [content, setContent] = useState();
  const { withBaseUrl } = useBaseUrlUtils();

  useEffect(() => {
    if (typeof window !== undefined) {
      const url = document.location.pathname.replace(/\/$/, '');
      const JSONurl = `${url}.json`;
      if (!content) {
        if (!window._cachedGlossary) {
          fetch(JSONurl)
            .then(res => res.json())
            .then(obj => {
              setContent(obj);
              window._cachedGlossary = obj;
            });
        } else {
          setContent(window._cachedGlossary);
        }
      }
    }
  }, [content])

  return (
    <BrowserOnly
      fallback={<div>The fallback content to display on prerendering</div>}>
      {() =>
        <div>{content ?
          <>
            {
              Object.keys(content).map(key => {
                return (
                  <p key={key}>
                    <a href={withBaseUrl(`/${key}`)}>{content[key].metadata.title}</a>: <span style={{ display: 'inline-flex' }} dangerouslySetInnerHTML={{ __html: content[key].metadata.hoverText }} />
                  </p>
                )
              })
            }
          </> :
          'loading...'}
        </div>
      }
    </BrowserOnly>
  );
};

export default Glossary;
