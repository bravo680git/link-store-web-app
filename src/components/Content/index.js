import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import storeAPI from "../../apis/store";
import useHandleLogout from "../../hooks/useHandleLogout";
import { setData } from "../../store/dataSlice";
import LinkTag from "../LinkTag";
import StoreForm from "../StoreForm";
import { handleData } from "../../ultils/functions";
import LinkGroup from "../LinkGroup";
import style from "./Content.module.scss";

function Content() {
  const dispatch = useDispatch();
  const handleLogout = useHandleLogout();
  const data = useSelector((state) => state.data.data);
  const [show, setShow] = useState({ show: false, data: {}, action: "" });

  useEffect(() => {
    (async () => {
      try {
        const resData = await storeAPI.getAll();
        console.log(resData);
        const returnData = handleData(resData);
        dispatch(setData(returnData));
      } catch (error) {
        toast.error(error);
      }
    })();
  }, [handleLogout, dispatch]);

  return (
    <>
      <div
        className={clsx(style.btn)}
        onClick={() => setShow({ show: true, action: "create" })}
      >
        Add a new Link
      </div>

      {data &&
        data.map((item, index) => (
          <LinkGroup title={item.type} key={index}>
            {item.sub &&
              item.sub.map((item, i) => (
                <LinkTag dataTag={item} setShow={setShow} key={i} />
              ))}
          </LinkGroup>
        ))}

      {show.show && <StoreForm showForm={[show, setShow]} />}
    </>
  );
}

export default Content;
