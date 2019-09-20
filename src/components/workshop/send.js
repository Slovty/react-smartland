import React from 'react';
import {Modal} from "antd";
import FunButton from "../public/funButton";


class SendFun extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }

    render() {
        return (
            <span>
                <span className="blue" onClick={this.handleDetail}>送审</span>
                <Modal
                    title="送审"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="1000px"
                    footer={[
                        <FunButton
                            key="save"
                            name="保存"
                            onClick={this.saveButton}
                        />,
                        <FunButton
                            key="cancle"
                            name="取消"
                            onClick={this.cancleButton}
                        />
                    ]}
                >

                </Modal>
            </span>
        );
    }
    handleDetail = () => {
        const res = [{
            name:'原矿处理量 (t)',
            attr:'',
            norm:'10t',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'原矿品味 (%)',
            attr:'Cu',
            norm:'12%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'原矿品味 (%)',
            attr:'Zn',
            norm:'13%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'选矿回收率 (%)',
            attr:'Cu',
            norm:'12%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'选矿回收率 (%)',
            attr:'Zn',
            norm:'5%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'铜精矿品味 (%)',
            attr:'Cu',
            norm:'8%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'铜精矿品味 (%)',
            attr:'Zn',
            norm:'11%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'锌精矿品味 (%)',
            attr:'Cu',
            norm:'23%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'锌精矿品味 (%)',
            attr:'Zn',
            norm:'11%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'尾巴矿品味 (%)',
            attr:'Cu',
            norm:'12%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'尾巴矿品味 (%)',
            attr:'Zn',
            norm:'13%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'日平均处理原矿量 (t/d)',
            attr:'',
            norm:'3t/d',
            sonItem:'11',
            parentItem:'12'
        }]
        this.setState({
            dataSource:res,
            visible:true
        })
    }
    saveButton = () => {
        this.setState({
            visible:false
        })
    }
    cancleButton = () => {
        this.setState({
            visible:false
        })
    }


}
export default SendFun;