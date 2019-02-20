import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
// import Axios from 'axios';


class AdminRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_active: true,
        }
    }


    editCust = () => {
        this.props.history.push(`updatecustomer/${this.props.client.id}`);
    }
    // on click of btn sends user to customer file page
    custFile = () => {
        this.props.history.push(`/file/${this.props.client.id}`);
    }

    archiveFile = (event) => {
        this.setState({
            is_active: false,
        })
        console.log('archive cust');
        const action = {
          type: 'ARCHIVE_CUSTOMER',
          payload: this.state,
        };
        this.props.dispatch(action);
        this.props.history.push('/home');
      }


    // breakdown of customer info in the table from admin page
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.client.customers_full_name}</TableCell>
                <TableCell>{this.props.client.pro_nouns}</TableCell>
                <TableCell>{this.props.client.email}</TableCell>
                <TableCell>{this.props.client.phone_number}</TableCell>
                <TableCell> <Button variant="outlined"
                    size="small"
                    onClick={this.editCust}
                    color="primary"
                    style={{ margin: 10 }}>
                    Edit
                </Button>
                    <Button variant="outlined"
                        color="secondary"
                        onClick={this.custFile}
                        style={{ margin: 10 }}>
                        Customer File
                </Button>
                    <Button variant="outlined"
                        color="inherit"
                        onClick={this.archiveFile}
                        style={{ margin: 10 }}>
                        Delete
                    </Button>
                </TableCell>

            </TableRow>
        )
    }
}

const mapStateToProps = reduxStore => {
    return { reduxStore: reduxStore };
}
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminRow);