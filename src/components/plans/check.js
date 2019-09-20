import React from 'react';
import {Modal,Steps} from "antd";
import FunButton from "../public/funButton";
import CancleButton from "../public/cancleButton";

const { Step } = Steps;
class Check extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }

    render() {
        return (
            <span>
                <FunButton
                    name="审核流程"
                    onClick={this.checkButton}
                />
                <Modal
                    title="审核流程"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="1020px"
                    footer={[
                        <CancleButton
                            key="cancle"
                            name="返回"
                            handleCancel={this.cancleButton}
                            flag={1}
                        />
                    ]}
                >
                    <div style={{height:'300px'}}>
                        <Steps current={2} size="small">
                            <Step title="已审核" description="选矿厂领导 (张三)"/>
                            <Step title="已审核" description="生产运营处领导 (李四)" />
                            <Step title="待审核" description="选矿厂分管领导 (王五)" />
                            <Step title="待审核" description="财务总监 (李一)" />
                            <Step title="待审核" description="公司总经理 (张三)" />
                        </Steps>
                    </div>

                </Modal>

            </span>
        );
    }
    // 新增计划按钮功能
    checkButton = () => {
        this.setState({
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
export default Check;