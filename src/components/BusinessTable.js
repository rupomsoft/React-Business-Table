import React, { Fragment, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { FixedSizeList } from "react-window";
import exportFromJSON from "export-from-json";
import { RiFileExcel2Line } from "react-icons/ri";
const BusinessTable = (props) => {
  const [ItemList, SetItemList] = useState(props.ItemList);
  const RowList = ({ index, style }) => (
    <Row className="grid-row" style={style}>
      <Col className="grid-col-first" md={1} lg={1}>
        {index}
      </Col>
      <Col className="grid-col " md={2} lg={2}>
        {ItemList[index].first_name}
      </Col>
      <Col className="grid-col" md={2} lg={2}>
        {ItemList[index].last_name}
      </Col>
      <Col className="grid-col" md={3} lg={3}>
        {ItemList[index].email}
      </Col>
      <Col className="grid-col" md={2} lg={2}>
        {ItemList[index].country}
      </Col>
      <Col className="grid-col " md={2} lg={2}>
        {ItemList[index].modified}
      </Col>
    </Row>
  );
  const SearchRow = (e) => {
    let rowNo = e.target.value;
    if (parseInt(rowNo, 100)) {
      listRef.current.scrollToItem(parseInt(rowNo, 100), "start");
    }
  };
  const SearchList = (e) => {
    let keyword = e.target.value;
    if (keyword !== "") {
      const results = ItemList.filter((search) => {
        return search.first_name
          .toLowerCase()
          .startsWith(keyword.toLowerCase());
      });
      SetItemList(results);
    } else {
      SetItemList(props.ItemList);
    }
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
              <h4>React Business Table Component</h4>
              <Row>
                <Col md={3} lg={3} sm={3} xs={6}>
                  <input
                    placeholder="Search By First Name"
                    className="form-control"
                    onChange={SearchList}
                    type="text"
                  />
                </Col>
                <Col md={2} lg={2} sm={3} xs={6}>
                  <input
                    onChange={SearchRow}
                    placeholder="Row No"
                    className="form-control mx-1"
                    type="text"
                  />
                </Col>
                <Col md={2} lg={2} sm={3} xs={6}>
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
              </Row>
            </Container>

            <Container className="my-0" fluid={true}>
              <Row className="grid-row-head my-0 mx-0">
                <Col className="grid-col-head-first" md={1} lg={1}>
                  No
                </Col>
                <Col className="grid-col-head " md={2} lg={2}>
                  First Name
                </Col>
                <Col className="grid-col-head" md={2} lg={2}>
                  Last Name
                </Col>
                <Col className="grid-col-head" md={3} lg={3}>
                  Email
                </Col>
                <Col className="grid-col-head" md={2} lg={2}>
                  Country
                </Col>
                <Col className="grid-col-head" md={2} lg={2}>
                  Update Date
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
