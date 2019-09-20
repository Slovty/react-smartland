import React from 'react';
import {Modal} from "antd";
import FunButton from "../public/funButton";
import AddModal from './addModal'

class AddPlan extends React.Component {
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
                    name="新增计划"
                    onClick={this.addButton}
                />
                <Modal
                    title="新增计划"
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="1000px"
                    footer={[//底部按钮保存和取消
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
                    <AddModal

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
export default AddPlan;