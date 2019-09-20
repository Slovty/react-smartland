import React from 'react';
import {Modal, Table} from "antd";
import CancleButton from "../public/cancleButton";
import './test7.css'

class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            visible:false
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
            <span>
                <span className="blue" onClick={this.handleDetail}>详情</span>
                <Modal
                    title={this.props.name}
                    visible={this.state.visible}
                    closable={false}
                    centered={true}
                    maskClosable={false}
                    width="1000px"
                    footer={[
                        <CancleButton
                            key="cancle"
                            name="返回"
                            handleCancel={this.cancleButton}
                            flag={1}
                        />
                    ]}
                >
                    <div>
                        <div className="test7-Date-Modal">
                            <h1>2019年9月 总生产计划</h1>
                        </div>
                        <div style={{paddingTop:'5px'}} />
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
    cancleButton = () => {
        this.setState({
            visible:false
        })
    }

}
export default Detail;