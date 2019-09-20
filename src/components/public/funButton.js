import React from 'react';
import {Button} from 'antd';
class FunButton extends React.Component{
    render(){
        return (
            <span className='button'>
                <Button onClick={this.props.onClick} type='ant-btn ant-btn-primary'>{this.props.name}</Button>
            </span>
        )
    }
}
export default FunButton;