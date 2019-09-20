import React from 'react';
import {Menu} from 'antd';
import {withRouter} from "react-router-dom";
import Auth from '../auth/Auth';

const SubMenu = Menu.SubMenu;

/**
 * current 用来存取最近一次访问的2级菜单
 * selectedKeys 用来存取最近一次访问2级菜单的路径
 * defaultOpenKeys 用来存取默认展开一级菜单
 */
class Menu1List extends React.Component {
    componentDidMount() {
        /**实现刷新后保持最后一次点击界面 */
        const cur = localStorage.getItem('current') ? JSON.parse(localStorage.getItem('current')).path : '';
        if (cur) {
            this.props.history.push(cur);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            openKeys: [],
            current: '',
        }
        this.onOpenChange = this.onOpenChange.bind(this);
        this.menuClick = this.menuClick.bind(this);
    }

    /**只展开当前父级菜单 */
    onOpenChange(openKeys) {
        /**找到当前展开的菜单id */
        const latestOpenKeys = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        /**如果展开当前一级菜单和以前的不一样 */
        if (this.state.openKeys !== latestOpenKeys) {
            this.setState({
                openKeys: [latestOpenKeys]
            });
        }
    }

    /**点击二级菜单 存取6个访问的二级菜单*/
    menuClick(event) {
        const path = event.key;
        const menuName = event.item.props.children;
        const menuParent = event.item.props.name;
        const current = {
            openKeys: this.state.openKeys,
            menuName: menuName,
            menuParent: menuParent,
            path: path
        }

        this.props.history.push(path);
    }

    render() {
        const menu = [
            {
                id: 1,
                title: "dept",
                icon: 'boss',
                name: '生产计划管理',
                menu2: [
                    {name: '月计划管理', id: 7, path: '/test7'},
                    {name:'月计划审核',id:8,path:'/test8'},
                    {name:'月计划跟踪',id:9,path:'/test9'},
                ]
            },
            {
                id: 2,
                icon: 'job',
                title: "user",
                name: '生产调度管理管理',
                menu2: [
                    {name: '用户页面', id: 9, path: '/user-management'},

                ]
            },
            {
                id: 3,
                icon: 'job',
                title: "role",
                name: '角色管理',
                menu2: [
                    {name: '角色页面', id: 11, path: '/role-management'},

                ]
            },
            {
                id: 4,
                icon: 'job',
                title: "auth",
                name: '权限管理',
                menu2: [
                    {name: '权限页面', id: 13, path: '/authority'},
                ]
            },
            {
                id: 5,
                icon: 'job',
                title: "info",
                name: '日志管理',
                menu2: [
                    {name: '登陆日志', id: 17, path: '/diary1'},
                    {name: '操作日志', id: 18, path: '/diary2'},
                ]
            },
            {
                id: 6,
                title: "plans",
                icon: 'boss',
                name: 'SCT',
                menu2: [
                    {name: 'plans', id: 19, path: '/plans'},

                ]
            },
            {
                id: 7,
                title: "workshop",
                icon: 'boss',
                name: 'SCT2',
                menu2: [
                    {name: 'workshop', id: 77, path: '/workshop'},

                ]
            },
        ];
        return (
            /**判断localStorage中的数据是否存在，存在则渲染菜单，否则渲染验证组件 */
            <div>
                <Menu mode="inline" theme="dark" style={{width: 130}}
                      onOpenChange={this.onOpenChange}
                      openKeys={this.state.openKeys}
                >
                    {
                        menu?menu.map(v => (
                            <SubMenu style={{backgroundColor: '#333333'}} key={v.id} title={<span style={{marginLeft:'-5px',color:'white',width:'80px',fontWeight:'bold'}}>{v.name}</span>}>
                                {
                                    v.menu2.map(v1 =>
                                        <Menu.Item key={v1.path} name={v.name} style={{color:'white',fontWeight:'bold'}} onClick={this.menuClick}>{v1.name}</Menu.Item>
                                    )
                                }
                            </SubMenu>
                            )):<Auth/>
                    }
                </Menu>
            </div>

        );
    }
}

export default withRouter(Menu1List);