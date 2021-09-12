import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import BusinessTable from "../component/BusinessTable";
import {Container} from "react-bootstrap";

const BusinessTablePage = () => {

    const [ItemList,SetItemList]=useState([])
    useEffect(()=>{
        axios.get("https://restcountries.eu/rest/v2/all")
            .then((res)=>{
                SetItemList(res.data)
            })
    },[])

    if(ItemList.length===0){
        return(
            <Fragment>

            </Fragment>
        )
    }
    else {
        return(
            <Fragment>
                <BusinessTable ItemList={ItemList}/>
            </Fragment>
        )
    }
};

export default BusinessTablePage;