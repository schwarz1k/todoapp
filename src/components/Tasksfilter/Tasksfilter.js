import Filterbutton from "../Filterbutton/Filterbutton";
import {Component} from "react";
import './Tasksfilter.css';

export default class Tasksfilter extends Component {
    render() {
        const { setFilterValue, filterValue } = this.props;

        return (
            <ul className="filters">
                <Filterbutton
                    text="All"
                    isSelected={filterValue === "all"}
                    onClick={() => setFilterValue("all")} />
                <Filterbutton
                    text="Active"
                    isSelected={filterValue === "active"}
                    onClick={() => setFilterValue("active")} />
                <Filterbutton
                    text="Completed"
                    isSelected={filterValue === "completed"}
                    onClick={() => setFilterValue("completed")} />
            </ul>
        );
    }
}