import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { getAllTables } from "../../actions/tableActions";

class TableList extends Component {
    constructor() {
    	super();
    	this.state = {
    		tables: {}
    	};
    }

    async updateTableList() {
        const tables = await this.props.getAllTables();
        console.log("tables: ", tables.data);
        const TableList = {};
        tables.data.forEach(table => {
            const tableObj = {
                name: table.name,
                status: table.status,
                gameType: table.gameType
            };

            TableList[`${table.name}`] = tableObj;
            console.log("TableList: ", TableList);
        })
        this.setState({ tables: TableList });
    }

    goToTable = (e, table) => {
        e.preventDefault();
        this.props.history.push('/gameboard');
    }

    componentWillMount() {
        console.log("hit here");
    	if (Object.keys(this.state.tables).length === 0) {
    		this.updateTableList();
    	}

    }

	render() {
    const { tables } = this.state;
    let tableListJSX;

    if (Object.keys(tables).length !== 0) {
      console.log("tableeees: ", tables);
      tableListJSX = Object.keys(tables).map(table => {
        return (
          <div>
            <ButtonsWrapper>
              <StartButton
                onClick={(e) => this.goToTable(e, table)}
                className="btn btn-large waves-effect waves-light hoverable green accent-3"
              >
                {tables[`${table}`].name}
              </StartButton>
            </ButtonsWrapper>
          </div>
          );
        })
      }
        
        

		return (
            <TableButtonList>
              {tableListJSX}
            </TableButtonList>
			);
	}
}

TableList.propTypes = {
  getAllTables: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { getAllTables })(TableList);

const StartButton = styled.button`
  width: 300px;
  border-radius: 3px;
  letter-spacing: 1.5px;
`;

const TableButtonList = styled.div`
  margin: 0;
  justify-content: center;
  background-color: black;
`;

const ButtonsWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  margin-top: 50px;
  width: 300px;
`;