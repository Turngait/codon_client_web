import React from "react";

import "./index.scss";

const PageHeader: React.FC<{title: string}> = ({title}) => {
  return (
    <div className="pageHeader">
      <h2 className="pageHeader__header">{title}</h2>
    </div>
  );
}

export default PageHeader;