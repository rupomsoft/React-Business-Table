import React, { Fragment, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { FixedSizeList } from "react-window";
import exportFromJSON from "export-from-json";
import { RiFileExcel2Line } from "react-icons/ri";
const BusinessTable = (props) => {
  const [SearchKey1, SetSearchKey1] = useState("");
  const [ItemList, SetItemList] = useState(props.ItemList);
  const RowList = ({ index, style }) => (
    <Row className="grid-row" style={style}>
      <Col className="grid-col-first" md={2} lg={2}>
        {index}
      </Col>
      <Col className="grid-col " md={2} lg={2}>
        {ItemList[index].title.split(" ")[0]}
      </Col>
      <Col className="grid-col" md={2} lg={2}>
        {ItemList[index].title.split(" ")[0]}
      </Col>
      <Col className="grid-col" md={2} lg={2}>
        {ItemList[index].userId}
      </Col>
      <Col className="grid-col" md={2} lg={2}>
        {ItemList[index].id}
      </Col>
      <Col className="grid-col " md={2} lg={2}>
        {ItemList[index].title.split(" ")[0]}
      </Col>
    </Row>
  );
  const SearchRow = (e) => {
    let rowNo = e.target.value;
    if (parseInt(rowNo)) {
      listRef.current.scrollToItem(parseInt(rowNo), "start");
    }
  };
  const SearchList = (e) => {
    let keyword = e.target.value;
    if (keyword !== "") {
      const results = ItemList.filter((search) => {
        return search.title.toLowerCase().startsWith(keyword.toLowerCase());
      });
      SetItemList(results);
    } else {
      SetItemList(props.ItemList);
    }
    SetSearchKey1(keyword);
  };

  const ExportXLXS = (data) => {
    const fileName = "download";
    const exportType = "xls";

    exportFromJSON({ data, fileName, exportType });
  };

  const ExportCSV = (data) => {
    const fileName = "download";
    const exportType = "csv";
    exportFromJSON({ data, fileName, exportType });
  };

  const listRef = React.createRef();

  return (
    <Fragment>
      <Container className="content">
        <Row className="d-flex justify-content-center">
          <Col md={10} lg={10} className="grid-card">
            <Container className="my-3" fluid={true}>
              <Row>
                <Col md={3} lg={3}>
                  <input
                    placeholder="Search.."
                    className="form-control"
                    onChange={SearchList}
                    type="text"
                  />
                </Col>
                <Col md={2} lg={2}>
                  <input
                    onChange={SearchRow}
                    placeholder="Row No"
                    className="form-control mx-1"
                    type="text"
                  />
                </Col>
                <Col md={2} lg={2}>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <RiFileExcel2Line /> Excel Export
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={ExportCSV.bind(this, ItemList)}>
                        <button className="btn"> Export CSV</button>{" "}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={ExportXLXS.bind(this, ItemList)}>
                        <button className="btn"> Export xls</button>{" "}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col md={2} lg={2}></Col>
              </Row>
            </Container>

            <Container className="my-0" fluid={true}>
              <Row className="grid-row-head my-0 mx-0">
                <Col className="grid-col-head-first" md={2} lg={2}>
                  No
                </Col>
                <Col className="grid-col-head " md={2} lg={2}>
                  Name
                </Col>
                <Col className="grid-col-head" md={2} lg={2}>
                  Name
                </Col>
                <Col className="grid-col-head" md={2} lg={2}>
                  Name
                </Col>
                <Col className="grid-col-head" md={2} lg={2}>
                  Name
                </Col>
                <Col className="grid-col-head" md={2} lg={2}>
                  Name
                </Col>
              </Row>
            </Container>

            <Container className="my-0" fluid={true}>
              <FixedSizeList
                ref={listRef}
                {...props}
                className="grid-div"
                itemCount={ItemList.length}
                height={400}
                itemSize={35}
              >
                {RowList}
              </FixedSizeList>
            </Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BusinessTable;
