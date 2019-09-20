import React from 'react';
import {Modal} from "antd";
import FunButton from "../public/funButton";
import ApplyModal from './applyModal'


class Apply extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,

        }
    }

    render() {
        return (
            <span>
                <FunButton
                    name="调度申请"
                    onClick={this.addButton}
                />
                <Modal
                    title="调度申请"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="1000px"
                    footer={[//底部按钮确定和取消
                        <FunButton
                            key="save"
                            name="确定"
                            onClick={this.saveButton}
                        />,
                        <FunButton
                            key="cancle"
                            name="取消"
                            onClick={this.cancleButton}
                        />
                    ]}
                >
                    <ApplyModal

                    />

                </Modal>

            </span>
        );
    }
    // 新增计划按钮功能
    addButton = () => {
        this.setState({
            visible:true
        })
    }
    saveButton = () => {
        //todo 业务处理
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
export default Apply;