import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

class CustomerToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    projectPage = () => {
        this.props.history.push('/project');
    }

    render() {
        const { value } = this.state;

        return (
            <Paper square>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        centered
                    >
                        <Tab label="Project" />
                        <Tab label="Fit Data" />
                        <Tab label="Build Status" />
                        <Tab label="Notes" />
                        <Tab label="Contact Information" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>Item One</TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
            </Paper>
        )
    }

}
CustomerToolBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
const mapStateToProps = reduxStore => {
    return { reduxStore: reduxStore };
}
export default connect(mapStateToProps)(CustomerToolBar);