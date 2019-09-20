import React from 'react';
import {DatePicker} from "antd";
class DateParamsModal extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={{display:'inline-block'}}>
                <span style={{marginRight:'10px'}}>{this.props.name}</span>
                <DatePicker
                    onChange={this.props.dateChange}
                    placeholder={this.props.placeholder}
                />
                <span style={{paddingLeft:'20px'}} />
            </div>
        );
    }
}
export default DateParamsModal;