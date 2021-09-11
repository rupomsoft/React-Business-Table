import React, {Fragment, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import { FixedSizeList } from "react-window";


const BusinessTable = () => {
    const [name, setName] = useState('');
    const [countries,setCountries]=useState([])
    const [countriesMain,setCountriesMain]=useState([])
    useEffect(()=>{
        axios.get("https://restcountries.eu/rest/v2/all")
            .then((res)=>{
                setCountries(res.data)
                setCountriesMain(res.data)
            })
    },[])



    const SearchList=(e)=>{
        let keyword=e.target.value;
        if (keyword !== '') {
            const results = countriesMain.filter((user) => {
                return user.name.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setCountries(results);
        }
        else {
            setCountries(countriesMain);
        }

        setName(keyword);

    }




    const itemList = ({ index, style }) => (
        <Row  className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
            <Col md={2} lg={2}>  {countries[index].name}</Col>
            <Col md={2} lg={2}>  {countries[index].capital}</Col>
            <Col md={2} lg={2}>  {countries[index].region}</Col>
            <Col md={2} lg={2}>  {countries[index].name}</Col>
            <Col md={2} lg={2}>  {countries[index].name}</Col>
            <Col md={2} lg={2}>  {countries[index].name}</Col>
        </Row>
    );


    return (
        <Fragment>
            <Container fluid={true} className="content" >
                <Row>
                    <Col md={12} lg={12} className="shadow-sm  bg-white p-4" >
                        <h5>React Data Grid</h5>
                        <input onChange={SearchList} type="text"/>
                        <Container fluid={true} >
                            <FixedSizeList className="ListParent" itemCount={countries.length} height={400} itemSize={35}  >
                                {itemList}
                            </FixedSizeList>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default BusinessTable;