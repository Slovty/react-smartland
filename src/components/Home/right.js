import React from 'react';
import {Route, Switch} from 'react-router-dom';
import InstitutionManagement from '../institution-management/institution-management'
import UserManagement from '../user-management/user-management'
import RoleManagement from '../role-management/role-management'
import AuthorityManagement from'../authority-management/authority-management'
import LoginDiary from'../diary-management/logindiary'
import DiaryManagement from'../diary-management/diary-management'
import HomePage from '../homePage/homePage'
import Test7 from '../test7/test7.js'
import plans from '../plans/plans.js'
import workshop from '../workshop/workshop.js'

class Right extends React.Component {
    render() {
        const data = [{
            path: '/test7',
            component: Test7
        },{
            path: '/user-management',
            component: UserManagement
        },{
            path: '/role-management',
            component: RoleManagement
        },{
            path: '/authority',
            component: AuthorityManagement
        },{
            path: '/diary1',
            component: LoginDiary
        },{
            path: '/diary2',
            component:DiaryManagement
        },{
            path: '/homePage',
            component: HomePage
        },{
            path: '/plans',
            component: plans
        },{
            path: '/workshop',
            component: workshop
        }]
        return (
            <div className="rightDiv">
                <Switch>
                    <Route exact path="/home"/>
                    {
                        data.map(e => {
                            return (
                                <Route key={e.path} path={e.path} component={e.component}></Route>
                            )
                        })
                    }
                </Switch>
            </div>
        )
    }
}

export default Right;