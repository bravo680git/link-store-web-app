import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { setData } from "../../store/dataSlice";
import storeAPI from "../../apis/store";
import useFetch from "../../hooks/useFetch";
import style from "./LinkTag.module.scss";

function LinkTag({ dataTag, setShow }) {
  const data = useSelector((state) => state.data.data);
  const oldData = data;
  const dispatch = useDispatch();
  const fetchApi = useFetch();

  const handleEdit = async () => {
    setShow({
      show: true,
      data: dataTag,
      action: "edit",
    });
  };

  const handleDelete = async () => {
    const cfm = window.confirm("Delete this link tag");
    if (!cfm) return;
    const id = dataTag._id;

    const newData = data.map((group) => {
      if (group.type !== dataTag.type) {
        return group;
      } else {
        return {
          type: group.type,
          sub: group.sub.filter((item) => item._id !== dataTag._id),
        };
      }
    });

    dispatch(setData(newData));

    try {
      await fetchApi(() => storeAPI.deleteLink(id));
      toast.success("Delete item successfully");
    } catch (error) {
      toast.error("Fail to delete item: " + error);
      dispatch(setData(oldData));
    }
  };

  return (
    <div className={clsx(style.tag)}>
      <a href={dataTag.link} target="blank">
        <h3>{dataTag.title}</h3>
        {dataTag.description && <p>{dataTag.description}</p>}
      </a>
      <div className={clsx(style.btn)}>
        <i className={clsx(style.edit)} onClick={handleEdit}>
          <FontAwesomeIcon icon={faPen} />
        </i>
        <i className={clsx(style.delete)} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </i>
      </div>
    </div>
  );
}

export default LinkTag;
