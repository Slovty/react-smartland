import React from 'react';
import * as axios from "axios";
import {Row, Col, Input, Table, Divider} from "antd";
import FunButton from "../public/funButton";
import './plans.css'
import {Select} from "antd/lib/select";
import moment from 'moment';

class AddModal extends React.Component {

    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            orginDeal:0.00,//原矿处理量
            productionPeriod:0,//生产天数
            perCu:0,//铜精矿品位 1
            perZn:0,//铜精矿品位 2
            perCu2:0,//锌精矿品位 1
            perZn2:0,//锌精矿品位 2
            recyclingCu:0,//选矿回收率 1
            recyclingZn:0,//选矿回收率 2
            note:'',//备注

        }
    }
    renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };

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
                    obj.props.rowSpan = 2;
                }
                if (index === 2 || index === 4 || index === 6 || index === 8 || index === 10) {
                    obj.props.rowSpan = 0;
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
                            <Input
                                name="orginDeal"
                                type="number"
                                value={this.state.orginDeal}
                                onChange={this.handleInputChange}
                                size="small"
                                placeholder="请输入"/>
                        </Col>
                        <Col span={12} >
                            <span style={{paddingLeft:'12px'}}>生产天数 (天)</span>
                            <Input
                                name="productionPeriod"
                                type="number"
                                value={this.state.productionPeriod}
                                onChange={this.handleInputChange}
                                size="small" placeholder="请输入天数"/>
                        </Col>
                    </Row>
                    <div style={{paddingTop:'5px'}} />
                    <Row gutter={48}>
                        <Col span={12} >
                            <span>铜精矿品位 (%)</span>
                            <Input
                                name="perCu"
                                type="number"
                                value={this.state.perCu}
                                onChange={this.handleInputChange}
                                size="small" placeholder="Cu"/>
                            <Input
                                name="perZn"
                                type="number"
                                value={this.state.perZn}
                                onChange={this.handleInputChange}
                                size="small" placeholder="Zn"/>
                        </Col>
                        <Col span={12} >
                            <span>锌精矿品位 (%)</span>
                            <Input
                                name="perCu2"
                                type="number"
                                value={this.state.perCu2}
                                onChange={this.handleInputChange}
                                size="small" placeholder="Cu"/>
                            <Input
                                name="perZn2"
                                type="number"
                                value={this.state.perZn2}
                                onChange={this.handleInputChange}
                                size="small" placeholder="Zn"/>
                        </Col>
                    </Row>
                    <div style={{paddingTop:'5px'}} />
                    <Row gutter={48}>
                        <Col span={12} >
                            <span>选矿回收率 (%)</span>
                            <Input
                                name="recyclingCu"
                                type="number"
                                value={this.state.recyclingCu}
                                onChange={this.handleInputChange}
                                size="small" placeholder="Cu"/>
                            <Input
                                name="recyclingZn"
                                type="number"
                                value={this.state.recyclingZn}
                                onChange={this.handleInputChange}
                                size="small" placeholder="Zn"/>
                        </Col>
                        <Col span={12} >
                            <span style={{paddingLeft:'67px'}}>备注</span>
                            <Input
                                name="note"
                                type="string"
                                value={this.state.note}
                                onChange={this.handleInputChange}
                                size="small" placeholder="Cu" className="test7-add-head-comment"/>
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

    //通用input处理函数
    handleInputChange = (event) => {

        console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
        const target = event.target;
        //种类多的话 可以考虑用 case when
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(this.state)
    }


    generateTable = () => {
        const _this = this;

        //1.获取上方输入的数据
        const  {
            note,
            orginDeal,
            perCu,
            perCu2,
            perZn,
            perZn2,
            productionPeriod,
            recyclingCu,
            recyclingZn
        }  = this.state


        //2. post到服务器上，得到下方表格的数据 ，然后处理后渲染展示
        var url    = 'http://hnulab.org:28888/productPlan/mfycj/genPlan'
        var params = {
            "bz": note,
            "jhsj": moment().format('YYYY-MM-DD HH:mm:ss'),
            "scts": productionPeriod,
            "tjkpwcuZb": perCu,
            "tjkpwznZb": perZn,
            "xjkpwcuZb": perCu2,
            "xjkpwznZb": perZn2,
            "xkhslcuZb": recyclingCu,
            "xkhslznZb": recyclingZn,
            "ykcllZb": orginDeal
        }
        axios.post(url,params)
            .then(function (response) {

                console.log(response)
                var res = response.data
                if(res.code === 0){
                    //处理data数据后  更新数据
                    var dataSource = []
                    // 组装


                    _this.setState({
                        dataSource:dataSource
                    })
                }

            })
            .catch(function (error) {
                console.log(error);

            })


        const res = [{
            name:'原矿处理量 (t)',
            attr:'',
            norm:'10t',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'原矿品位 (%)',
            attr:'Cu',
            norm:'12%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'原矿品位 (%)',
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
            name:'铜精矿品位 (%)',
            attr:'Cu',
            norm:'8%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'铜精矿品位 (%)',
            attr:'Zn',
            norm:'11%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'锌精矿品位 (%)',
            attr:'Cu',
            norm:'23%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'锌精矿品位 (%)',
            attr:'Zn',
            norm:'11%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'尾巴矿品位 (%)',
            attr:'Cu',
            norm:'12%',
            sonItem:'11',
            parentItem:'12'
        },{
            name:'尾巴矿品位 (%)',
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