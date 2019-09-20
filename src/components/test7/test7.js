import React from 'react';
import * as axios from "axios";
import Blockquote from '../public/blockquote';
import {Table, Select, Divider} from "antd";
import DateParamsModal from '../public/dateParamsModal'
import SelectParamsModal from '../public/selectParamsModal'
import FunButton from '../public/funButton'
import AddPlan from './addPlan'
import Detail from './detail'
import ModifyFun from './modifyFun'
import Check from './check'



class Test7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',  // 开始时间
            endDate: '',    // 结束时间
            optionData: [], // 审核选项数据
            status: -1,      // 审核状态
            dataSource: [],   // 表格数据
            selectedRowKeys: [], // 选中数据
        }

    }

    componentDidMount() {
        this.getOptionData()
        this.queryButton()
    }

    columns = [
        {
            title: '编号',
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.index - b.index,
            align: 'center',
            width: '10%',
        }, {
            title: '计划日期',
            dataIndex: 'planDate',
            key: 'planDate',
            align: 'center',
            width: '10%',
        }, {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            align: 'center',
            width: '20%',
        }, {
            title: '创建人',
            dataIndex: 'createUser',
            key: 'createUser',
            align: 'center',
            width: '10%',
        }, {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment',
            align: 'center',
            width: '20%',
        }, {
            title: '审核状态',
            dataIndex: 'statusName',
            key: 'statusName',
            align: 'center',
            width: '10%',
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: '15%',
            render: (text, record) => {
                return (
                    <span>
                        <Detail />
                        <Divider type="vertical"/>
                        <ModifyFun />
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
                <Blockquote name="总计划管理"  menu="月计划"/>
                <div style={{padding: '15px'}}>
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
                        <SelectParamsModal
                            name="审核状态"
                            placeholder="审核状态"
                            selectChange={this.selectChange}
                            optionData={this.state.optionData}
                        />
                        <div style={{display:'inline-block',float:'right'}}>
                            <FunButton
                                name="查询"
                                onClick={this.queryButton}
                            />
                            <AddPlan
                            />
                            <FunButton
                                name="送审"
                                onClick={this.sentButton}
                            />
                            <Check
                            />
                        </div>
                    </div>
                    <Table
                        rowKey={record => record.id}
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        rowSelection={rowSelection}
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
    // 查询按钮功能
    queryButton = () => {
        // 获得查询参数
        const startDate = this.state.startDate
        const endDate = this.state.endDate
        const status = this.state.status

        // 根据查询参数调用查询接口获得数据,且组装
        var res = []
        for (var i = 0; i < 12; i++) {
            res.push({
                id: i + 1,
                index: i + 1,
                planDate: '2019-09-17',
                updateTime: '2019-09-17 12:23:22',
                createUser: '张三',
                comment: 'xxxxxxxxxxxxxx',
                statusName: '未审核'
            })
        }
        this.setState({
            dataSource: res
        })
    }
    // 送审按钮功能
    sentButton = () => {

    }


}

export default Test7