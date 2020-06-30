import React from 'react';
import {Component} from 'react';
import CardList from '../component/CardList';
import SearchBox from '../component/SearchBox.js'
import Scroll from '../component/Scroll';
import './App.css';

import {setSearchField , requestRobots} from '../actions.js';
import {connect} from 'react-redux';



const mapStateToProps =state=>{
	return {searchField:state.searchRobots.searchField ,
			robots:state.requestRobots.robots,
			isPending:state.requestRobots.isPending ,
			error:state.requestRobots.error}
}

const mapDispatchToprops=(dispatch)=>{
	return {onsearchChange:(event)=>dispatch(setSearchField(event.target.value)) ,
			onrequestRobots :()=>dispatch(requestRobots())}
}

class App extends Component {
	
	componentDidMount(){
		this.props.onrequestRobots();		
	}

	render(){
		const {searchField, onsearchChange , isPending , robots  } = this.props;

	
		const filteredRobots=robots.filter((robot)=>{
				return robot.name.toLowerCase().includes(searchField.toLowerCase()); })

		// console.log("render");
		if (isPending)
		{
			return(<h1 className="tc"> ... Loading ...</h1>)
		}
		else{

			return(
			<div className="tc" >
			<h1 className="green head-style"> Robot Friends </h1>
			<SearchBox searchChange={onsearchChange}/>
			<Scroll>
			<CardList robots={filteredRobots} /> 
			</Scroll>
			
			</div>);	
		
			}

		}

}


export default connect(mapStateToProps,mapDispatchToprops)(App);
