import clsx from "clsx";
import style from "./LinkGroup.module.scss";

function LinkGroup({ title, children }) {
  return (
    <div className={clsx(style.container)}>
      <div className={clsx(style.title)}>{title}</div>
      <div className={clsx(style.children)}>{children}</div>
    </div>
  );
}

export default LinkGroup;
