import React from 'react';
import {Row, Col, Input, Table, Divider} from "antd";
import FunButton from "../public/funButton";
import './test7.css'

class AddModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataSource:[]
        }
    }
    renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };
        // if (index > 1 && index<12) {
        //     obj.props.rowspan = 1;
        // }
        return obj;
    };
    columns = [
        {
            title: '指标名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '30%',
            render:(value, row, index)=>{
                const obj = {
                    children: value,
                    props: {},
                };

                if (index === 1 || index === 3 || index === 5 || index === 7 || index === 9 ) {
                    obj.props.rowspan = 2;
                }
                if (index === 2 || index === 4 || index === 6 || index === 8 || index === 10) {
                    obj.props.rowspan = 0;
                }
                if (index === 2 || index === 4 || index === 6 || index === 8 || index === 10) {
                    obj.props.colSpan = 0;
                }
                return obj;
            }

        }, {
            title: ' ',
            dataIndex: 'attr',
            key: 'attr',
            align: 'center',
            width: '10%',
            render: this.renderContent,
        }, {
            title: '指标',
            dataIndex: 'norm',
            key: 'norm',
            align: 'center',
            width: '30%',
            render: this.renderContent,
        }, {
            title: '计算依据',
            align: 'center',
            children:[
                {
                    title: '子项',
                    dataIndex: 'sonItem',
                    key: 'sonItem',
                    width: '15%',
                    align: 'center',
                    render: this.renderContent,
                },{
                    title: '母项',
                    dataIndex: 'parentItem',
                    key: 'parentItem',
                    width: '15%',
                    align: 'center',
                    render: this.renderContent,
                }
            ]
        }
    ]
    render() {
        return (
            <div>
                <div className='test7-add-head'>
                    <Row gutter={48}>
                        <Col span={12} >
                            <span style={{paddingLeft:'7px'}}>原矿处理量 (t)</span>
                            <Input size="small" placeholder="请输入"/>
                        </Col>
                        <Col span={12} >
                            <span style={{paddingLeft:'12px'}}>生产天数 (天)</span>
                            <Input size="small" placeholder="请输入天数"/>
                        </Col>
                    </Row>
                    <div style={{paddingTop:'5px'}} />
                    <Row gutter={48}>
                        <Col span={12} >
                            <span>铜精矿品味 (%)</span>
                            <Input size="small" placeholder="Cu"/>
                            <Input size="small" placeholder="Zn"/>
                        </Col>
                        <Col span={12} >
                            <span>锌精矿品味 (%)</span>
                            <Input size="small" placeholder="Cu"/>
                            <Input size="small" placeholder="Zn"/>
                        </Col>
                    </Row>
                    <div style={{paddingTop:'5px'}} />
                    <Row gutter={48}>
                        <Col span={12} >
                            <span>选矿回收率 (%)</span>
                            <Input size="small" placeholder="Cu"/>
                            <Input size="small" placeholder="Zn"/>
                        </Col>
                        <Col span={12} >
                            <span style={{paddingLeft:'67px'}}>备注</span>
                            <Input size="small" placeholder="Cu" className="test7-add-head-comment"/>
                        </Col>
                    </Row>
                </div>
                <div className="test7-add-middle">
                    <FunButton
                        name="生成表格"
                        onClick={this.generateTable}
                    />
                </div>
                <div>
                    <Table
                        rowKey={record => record.id}
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        size="small"
                        bordered
                        scroll={{y: 450}}
                        pagination={false}

                    />
                </div>


            </div>
        );
    }
    generateTable = () => {
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
            dataSource:res
        })
    }
}
export default AddModal;