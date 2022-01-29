import React, {Component, Fragment} from 'react';
import readXlsxFile from 'read-excel-file'
class ImportExcelPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    GetJSON=()=>{
        const input = document.getElementById('input')
            readXlsxFile(input.files[0]).then((rows) => {
                this.setState({data:rows})
            })

    }
    render() {
        let data=this.state.data;
        let TableHead=data[0];
        let TableRows;
        TableRows=data.map((ArrayItem,i)=>{
            if(i===0){
                return(
                    <tr>
                        {
                            ArrayItem.map((item,i) => {
                                return (
                                    <th>{item}</th>
                                )
                            })
                        }
                    </tr>
                )
            }
            else {
                return(
                    <tr>
                        {
                            ArrayItem.map((item,i) => {
                                return (
                                    <td>{item}</td>
                                )
                            })
                        }
                    </tr>
                )
            }
        })
        return (
            <Fragment>
                <input type="file" id="input" />
                <button onClick={this.GetJSON}>Get</button>
                <table className="table table-bordered">
                    <tbody>
                    {TableRows}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default ImportExcelPage;