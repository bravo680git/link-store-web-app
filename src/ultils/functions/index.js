const handleData = (data) => {
  const types = [];

  data.reverse().forEach((item) => {
    if (item.type !== "" && !types.includes(item.type)) {
      types.push(item.type);
    }
  });

  types.push("");

  return types.map((type) => ({
    type,
    sub: data.filter((item) => item.type === type),
  }));
};

const handleReloadApp = () => {
  sessionStorage.clear();
  localStorage.clear();
  alert("Session expired! Please Log in again!");
  window.location.reload();
};

export { handleData, handleReloadApp };
