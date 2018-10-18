import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {TrafficPoliceDetailActionType} from '../../actionTypes';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {fileHost} from "../../config/HostConfig";

const trafficPoliceDetailAction = require('../../actions/main/TrafficPoliceDetailAction');
const sysConst = require('../../util/SysConst');

class TrafficPolice extends React.Component {

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
        this.props.getPoliceInfo();
    }

    /**
     * 更新 交警资料：姓名
     */
    changeName = (event) => {
        this.props.setName(event.target.value);
    };

    /**
     * 更新 交警资料：性别
     */
    changeGender = (event) => {
        this.props.setGender(event.target.value);
    };

    /**
     * 更新 检索条件：电话
     */
    changePhone = (event) => {
        this.props.setPhone(event.target.value);
    };

    render() {
        const {trafficPoliceDetailReducer, changePolicePosition, changeStatus, updatePolice} = this.props;

        let avatarUrl = "";
        if (trafficPoliceDetailReducer.avatarImg !== null && trafficPoliceDetailReducer.avatarImg !== '') {
            avatarUrl = "http://" + fileHost + "/api/image/" + trafficPoliceDetailReducer.avatarImg;
        } else {
            avatarUrl = "/assets/images/default_traffic_pol.png"
        }

        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/traffic_police', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">交警管理 - 交警资料</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 交警资料：明细 */}
                <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                    <div className="row detail-box-header vc-center">
                        {/* 交警资料：编号 */}
                        <div className="col s6 context-ellipsis">编号：{this.props.match.params.id}</div>

                        {/* 交警资料：开关 */}
                        <div className="col s6 right-align">
                        <span className="switch" onClick={changeStatus}>
                            <label>
                              <input type="checkbox" checked={trafficPoliceDetailReducer.status === 1}/>
                              <span className="lever"/>
                            </label>
                        </span>
                        </div>
                    </div>

                    <div className="col s10">
                        <div className="row margin-left10 margin-right10">
                            <Input s={6} label="姓名" maxLength="100" value={trafficPoliceDetailReducer.name} onChange={this.changeName}/>
                            <div className="col s6 margin-top25">
                                <input type="radio" id="male" value="0" className='with-gap'
                                       checked={trafficPoliceDetailReducer.gender == '0'} onChange={this.changeGender}/>
                                <label htmlFor="male">男</label>

                                <input type="radio" id="female" value="1" className='with-gap'
                                       checked={trafficPoliceDetailReducer.gender == '1'} onChange={this.changeGender}/>
                                <label htmlFor="female" className="margin-left10">女</label>
                            </div>
                        </div>
                        <div className="row margin-left10 margin-right10">
                            <div className="input-field col s6">
                                <Select
                                    options={trafficPoliceDetailReducer.policePositionList}
                                    onChange={changePolicePosition}
                                    isSearchable={false}
                                    value={trafficPoliceDetailReducer.position}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                                <label className="active">职务</label>
                            </div>
                            <Input s={6} label="电话(登录账号)" maxLength="11" value={trafficPoliceDetailReducer.phone} onChange={this.changePhone}/>
                        </div>
                    </div>
                    <div className="col s2">
                        <img className="margin-top10 margin-left30" src={avatarUrl}/>
                    </div>
                    <div className="row margin-left10 margin-right10">
                        <div className="input-field col s12 right-align">
                            <button type="button" className="btn confirm-btn" onClick={updatePolice}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trafficPoliceDetailReducer: state.TrafficPoliceDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getPoliceInfo: () => {
        dispatch(trafficPoliceDetailAction.getPoliceInfo(ownProps.match.params.id))
    },
    changeStatus: () => {
        dispatch(trafficPoliceDetailAction.changeStatus(ownProps.match.params.id))
    },
    setName: (name) => {
        dispatch(TrafficPoliceDetailActionType.setName(name))
    },
    setGender: (gender) => {
        dispatch(TrafficPoliceDetailActionType.setGender(gender))
    },
    changePolicePosition: (policePosition) => {
        dispatch(TrafficPoliceDetailActionType.setPolicePosition(policePosition))
    },
    setPhone: (phone) => {
        dispatch(TrafficPoliceDetailActionType.setPhone(phone))
    },
    updatePolice: () => {
        dispatch(trafficPoliceDetailAction.updatePolice(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrafficPolice)
