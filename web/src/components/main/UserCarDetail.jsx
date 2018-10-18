import React from 'react';
import {connect} from 'react-redux';
import {UserCarDetailActionType} from '../../actionTypes';
import {Link} from "react-router-dom";

const userCarDetailAction = require('../../actions/main/UserCarDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class UserCarDetail extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // this.props.getUserCarInfo();
    }

    render() {
        const {userCarDetailReducer, updatePolice} = this.props;

        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/user_car', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">绑定车辆管理 - 车辆信息</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 车辆信息：明细 */}
                <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                    <div className="row detail-box-header vc-center">
                        {/* 车辆信息：车辆编号 */}
                        <div className="col s6 context-ellipsis">车辆编号：{this.props.match.params.id}</div>

                        {/* 车辆信息：绑定时间 绑定状态 */}
                        <div className="col s6 right-align">
                            <span className="grey-text">绑定时间：{formatUtil.getDateTime(new Date())}</span>
                            <span className="margin-left50">{userCarDetailReducer.bindList[1].label}</span>
                        </div>
                    </div>

                    <div className="col s10">
                        <div className="row margin-left10 margin-right10">
                            <div className="input-field col s6">
                                <input id="name" type="text" maxLength="100" value={userCarDetailReducer.name}
                                       />
                                <label id="label_name" htmlFor="name">姓名</label>
                            </div>
                            <div className="col s6 margin-top25">
                                <input type="radio" id="male" value="0" className='with-gap'
                                       checked={userCarDetailReducer.gender == '0'} />
                                <label htmlFor="male">男</label>

                                <input type="radio" id="female" value="1" className='with-gap'
                                       checked={userCarDetailReducer.gender == '1'} />
                                <label htmlFor="female" className="margin-left10">女</label>
                            </div>
                        </div>
                        <div className="row margin-left10 margin-right10">
                            <div className="input-field col s6">
                                tttttttttt
                            </div>
                            <div className="input-field col s6">
                                <input id="phone" type="text" maxLength="11" value={userCarDetailReducer.phone}
                                       />
                                <label id="label_phone" htmlFor="phone">电话(登录账号)</label>
                            </div>
                        </div>
                    </div>
                    <div className="col s2">
                        ttttttttttttt
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userCarDetailReducer: state.UserCarDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUserCarInfo: () => {
        dispatch(userCarDetailAction.getUserCarInfo(ownProps.match.params.id))
    },
    setName: (name) => {
        dispatch(UserCarDetailActionType.setName(name))
    },
    // setGender: (gender) => {
    //     dispatch(UserCarDetailActionType.setGender(gender))
    // },
    changePolicePosition: (policePosition) => {
        dispatch(UserCarDetailActionType.setPolicePosition(policePosition))
    },
    setPhone: (phone) => {
        dispatch(UserCarDetailActionType.setPhone(phone))
    },
    updatePolice: () => {
        dispatch(userCarDetailAction.updatePolice(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCarDetail)
