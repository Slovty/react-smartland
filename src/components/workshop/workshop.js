import React from 'react';
import * as axios from "axios";
import Blockquote from '../public/blockquote';
import {Table, Select, Divider, Input, Col} from "antd";
import DateParamsModal from '../public/dateParamsModal'
import SelectParamsModal from '../public/selectParamsModal'
import FunButton from '../public/funButton'

import SendFun from './send'
import DelWorkShop from './delWorkShop'
import ReviewProgress from './reviewProgress'
import Apply from './apply'





class plans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',  // 开始时间
            endDate: '',    // 结束时间
            optionData: [], // 审核选项数据
            status: -1,      // 审核状态
            dataSource: [],   // 表格数据
            selectedRowKeys: [], // 选中数据
            belongWorkshop:[],//选中车间
            machineName:'',//设备名称
            oprType:[],//操作类型
            dispatchType:[],//调度类型
        }

    }

    componentDidMount() {
        this.getOptionData()
        this.queryButton()
    }

    columns = [
        {
            title: '所属车间',
            dataIndex: 'belongwk',
            key: 'belongwk',
            align: 'center',
            width: '8%',
        }, {
            title: '设备名称',
            dataIndex: 'machineName',
            key: 'machineName',
            align: 'center',
            width: '8%',
        }, {
            title: '调度类型',
            dataIndex: 'dispatchtype',
            key: 'dispatchtype',
            align: 'center',
            width: '8%',
        }, {
            title: '操作类型',
            dataIndex: 'oprType',
            key: 'oprType',
            align: 'center',
            width: '8%',
        }, {
            title: '开/关机原因',
            dataIndex: 'reason',
            key: 'reason',
            align: 'center',
            width: '8%',
        }, {
            title: '计划开/关机时间',
            dataIndex: 'planTime',
            key: 'planTime',
            align: 'center',
            width: '10%',
        }, {
            title: '计划开/关机时长',
            dataIndex: 'planTimeDuration',
            key: 'planTimeDuration',
            align: 'center',
            width: '10%',
        },{
            title: '申请人',
            dataIndex: 'applyUser',
            key: 'applyUser',
            align: 'center',
            width: '8%',
        },{
            title: '申请时间',
            dataIndex: 'applyTime',
            key: 'applyTime',
            align: 'center',
            width: '12%',
        },{
            title: '审核状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: '6%',
        },{
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: '14%',
            render: (text, record) => {
                return (
                    <span>
                        <SendFun />
                        <Divider type="vertical"/>
                        <DelWorkShop />
                        <Divider type="vertical"/>
                        <ReviewProgress />
                    </span>
                )
            }
        }
    ]

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Blockquote name="车间"  menu="车间"/>
                <div style={{padding: '15px'}}>
                    <div style={{paddingBottom:'20px'}}>

                        <SelectParamsModal
                            name="所属车间"
                            placeholder="车间"
                            selectChange={this.wkChange}
                            optionData={this.state.belongWorkshop}
                        />

                        <span style={{paddingLeft:'30px'}}>设备名称</span>
                        <Input size="small" style={{width:'166px',margin:' 0 10px',height:'30px'}} placeholder="请输入"/>

                        <SelectParamsModal
                            name="操作类型"
                            placeholder="操作类型"
                            selectChange={this.selectChange}
                            optionData={this.state.optionData}
                        />
                        <SelectParamsModal
                            name="调度类型"
                            placeholder="调度类型"
                            selectChange={this.selectChange}
                            optionData={this.state.optionData}
                        />
                        <div style={{display:'inline-block',float:'right'}}>
                            <FunButton
                                name="查询"
                                onClick={this.queryButton}
                            />
                            <Apply />

                        </div>


                    </div>
                    <div style={{paddingBottom:'20px'}}>
                        <DateParamsModal
                            name="开始时间"
                            placeholder="请选择日期"
                            dateChange={this.beginDateChange}
                        />
                        <DateParamsModal
                            name="结束时间"
                            placeholder="请选择日期"
                            dateChange={this.endDateChange}
                        />
                    </div>
                    <Table
                        rowKey={record => record.id}
                        dataSource={this.state.dataSource}
                        columns={this.columns}

                        size="small"
                        bordered
                        scroll={{y: 450}}
                    />
                </div>
            </div>
        );
    }

    // 选择开始日期
    beginDateChange = (date, dateString) => {
        console.log(date)
        console.log(dateString)
        this.setState({
            startDate: dateString
        })
    }
    // 选择结束日期
    endDateChange = (date, dateString) => {
        console.log(date)
        console.log(dateString)
        this.setState({
            endDate: dateString
        })
    }
    // 获得审核状态数据并组装
    getOptionData = () => {
        const res = [{
            id: 1,
            name: '选项1'
        }, {
            id: 2,
            name: '选项2'
        }, {
            id: 3,
            name: '选项3'
        }, {
            id: 4,
            name: '选项4'
        }, {
            id: 5,
            name: '选项5'
        }]
        var optionData = []
        // 组装
        for (var i = 0; i < res.length; i++) {
            optionData.push(<Select.Option key={res[i].id} value={res[i].id}>{res[i].name}</Select.Option>)
        }
        this.setState({
            optionData: optionData
        })
    }
    // 选择审核状态
    selectChange = (value) => {
        console.log(value)
        this.setState({
            status: value
        })
    }
    // 选中数据
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };

    //调度申请
    todoButton= () => {

    }

    // 查询按钮功能
    queryButton = () => {
        // 获得查询参数
        const {startDate} = this.state
        const {endDate} = this.state
        const {status} = this.state
        const {setstatus} = this.state
        var startDatestmp = Date.parse(new Date({startDate}))
        startDatestmp = startDatestmp/ 1000
        var endDatestmp = Date.parse(new Date({endDate}))
        endDatestmp = endDatestmp/ 1000



        // 根据查询参数调用查询接口获得数据,且组装
        var res = []
        for (var i = 0; i < 7; i++) {
            res.push({
                id: i + 1,

                belongwk:'一号车间',
                machineName:'设备名称',
                dispatchtype:'计划',
                oprType:'开机',
                reason:'原因',
                planTime:'计划',
                planTimeDuration:'1小时',
                applyUser:'TOM',
                applyTime:'2019-09-18 20:20:20',
                status:'审核中',


            })
            this.setState({
                setstatus: !setstatus
            })
        }
        this.setState({
            dataSource: res
        })
    }



}

export default plans