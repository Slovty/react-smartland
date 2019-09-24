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
import  '../../config'



class plans extends React.Component {
    constructor(props) {
        console.log(global.dataSource.reqUrl)
        super(props);
        this.state = {
            startDate: '',  // 开始时间
            endDate: '',    // 结束时间
            optionData: [], // 审核选项数据
            status: -1,      // 审核状态
            dataSource: [],   // 表格数据
            selectedRowKeys: [], // 选中数据
            setstatus:1,//设置审核状态
        }

    }

    //在组件装载的过程中  执行ajax请求向服务器请求数据
    componentDidMount() {
        this.getOptionData()
        this.queryButton()
        console.log('componentDidMount')
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
            title: '月计划日期',
            dataIndex: 'mplanDate',
            key: 'mplanDate',
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
    // axios 从后台获得审核状态数据并组装
    getOptionData = () => {

        var optionData = []
        const _this = this;
        //请求审核状态的api
        var url     = global.dataSource.reqUrl+'productPlan/zh/findshzt'

        axios.get(url)
            .then(function (response) {
                // 组装
                var res = response.data

                for (var i = 0; i < res.length; i++) {
                    optionData.push(<Select.Option key={res[i].id} value={res[i].id}>{res[i].name}</Select.Option>)
                }
                //获取数据后 更新数据
                _this.setState({
                    optionData:optionData,

                });
            })
            .catch(function (error) {

                console.log(error);

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
        console.log(this);
        // 获得查询参数
        const {startDate} = this.state
        const {endDate} = this.state
        const {status} = this.state


        //转时间戳
        var startDatestmp = ''
        var   endDatestmp = ''
        if(startDate){
            console.log(startDate)
            startDatestmp = Date.parse(new Date(startDate+' 00:00:00'))/1000
            console.log(startDatestmp)
        }
        if(endDate){
            console.log(endDate)
            endDatestmp = Date.parse(new Date(endDate+' 23:59:59'))/1000
            console.log(endDatestmp)
        }


        // 根据查询参数调用查询接口获得数据,且组装
        const _this = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        var url     = global.dataSource.reqUrl+'productPlan/zh/findAll'
        var params  = {
            btime:startDatestmp,
            etime:endDatestmp,
            shzt:status,
            pageNum:1,
            pageSize:10
        }

        axios.get(
            url,params
            )
            .then(function (response) {
                //后去数据后 更新数据dataSource:response.data,
                console.log(response.data)
                if(response.code===0){
                    var data       = response.data
                    var dataSource = []

                    //将数据处理匹配后 使用setState更新 dataSource
                    //todo  数据匹配，无力
                    var res = []
                    for (var i = 0; i < 7; i++) {
                        res.push({
                            id: i + 1,
                            index: i + 1,
                            mplanDate: '2019-09-30',
                            updateTime: '2019-09-18 20:20:20',
                            createUser: 'tom',
                            comment: '66666',
                            statusName: '已审核'
                        })

                    }
                    _this.setState({
                        dataSource:res,
                        isLoaded:true
                    });

                }

            })
            .catch(function (error) {
                console.log(error);
                _this.setState({
                    isLoaded:false,
                    error:error
                })
            })
    }


}

export default plans