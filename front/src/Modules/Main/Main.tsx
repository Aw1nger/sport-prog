import React from "react";
const Main: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <main className={`main ${props.className}`} {...props}>
      <div className="main__wrapper">{props.children}</div>
    </main>
  );
};
export default Main;
