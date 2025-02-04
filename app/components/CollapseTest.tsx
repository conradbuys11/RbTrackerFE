import { useEffect, useRef, useState } from "react";
import "./CollapseTest.css";

// https://medium.com/edonec/build-a-react-collapsible-component-from-scratch-using-react-hooks-typescript-73dfd02c9208

interface CollapseProps {
  title: string;
  children?: React.ReactNode;
  open?: boolean;
}

const CollapseTest = ({ title, children, open }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default CollapseTest;
