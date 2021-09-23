import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import BusinessTable from "../components/BusinessTable";

const BusinessTablePage = () => {
  const [ItemList, SetItemList] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      SetItemList(res.data);
    });
  }, []);

  if (ItemList.length === 0) {
    return <Fragment></Fragment>;
  } else {
    return (
      <Fragment>
        <BusinessTable ItemList={ItemList} />
      </Fragment>
    );
  }
};

export default BusinessTablePage;
