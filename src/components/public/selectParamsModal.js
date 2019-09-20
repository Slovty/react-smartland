import React from 'react';
import {Select} from "antd";

const { Option } = Select;
class SelectParamsModal extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={{display:'inline-block'}}>
                <span style={{marginRight:'15px'}}>{this.props.name}</span>
                <Select
                    style={{ width: 120 }}
                    onChange={this.props.selectChange}
                    placeholder={this.props.placeholder}
                >
                    {
                        this.props.optionData
                    }
                </Select>
                <span style={{paddingLeft:'30px'}} />
            </div>
        );
    }


}
export default SelectParamsModal;