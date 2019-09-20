import React from 'react';
import {Row, Col, Input, Table, Divider,Radio} from "antd";
import SelectParamsModal from '../public/selectParamsModal'
import DateParamsModal from '../public/dateParamsModal'
import './workshop.css'

const { TextArea } = Input;

class ApplyModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            belongWorkshop:[],//选中车间
        }
    }

    render() {
        return (
            <div>
                <div className='test7-add-head'>
                    <Row gutter={48}>
                        <Col span={12} >
                            <SelectParamsModal
                                name="所属车间"
                                placeholder="一车间"
                                selectChange={this.wkChange}
                                optionData={this.state.belongWorkshop}
                            />
                        </Col>
                        <Col span={12} >
                            <span style={{paddingLeft:'58px'}}>设备名称</span>
                            <Input size="small" placeholder="请输入"/>
                        </Col>
                    </Row>

                    <div style={{paddingTop:'5px'}} />
                    <Row gutter={48}>
                        <Col span={12} >
                            <span >调度类型</span>
                            <Radio.Group style={{marginLeft:'14px'}}>
                                <Radio value="1">计划</Radio>
                                <Radio value="2">临时</Radio>
                            </Radio.Group>

                        </Col>
                        <Col span={12} >


                            <DateParamsModal
                                name="计划开/关机时间"
                                placeholder="请选择日期"
                                dateChange={this.beginDateChange}
                            />

                        </Col>
                    </Row>

                    <div style={{paddingTop:'5px'}} />
                    <Row gutter={48}>
                        <Col span={12} >
                            <SelectParamsModal
                                name="操作类型"
                                placeholder="关机"
                                selectChange={this.oprChange}
                                optionData={this.state.oprType}
                            />
                        </Col>
                        <Col span={12} >
                            <span>计划开/关机时时长</span>
                            <Input size="small" placeholder="请输入" />
                        </Col>
                    </Row>

                    <Row gutter={48}>
                        <Col span={20} style={{display:'flex'}} >
                            <span style={{width:'100px'}}>开/关机原因</span>
                            <TextArea
                                type='textarea'

                                onChange={this.textareaChange}
                                placeholder="请输入"
                                autosize={{ minRows: 3,}}
                            />
                        </Col>

                    </Row>

                </div>




            </div>
        );
    }

}
export default ApplyModal;