import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {TrafficPoliceActionType} from '../../actionTypes';
import {  Link } from "react-router-dom";

const trafficPoliceAction = require('../../actions/main/TrafficPoliceAction');
const SysConst = require('../../util/SysConst');

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
        $('.modal').modal();
        this.props.getPoliceList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：名称
     */
    changeConditionName = (event) => {
        this.props.setConditionName(event.target.value);
    };

    /**
     * 更新 检索条件：电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 查询交警列表
     */
    queryPoliceList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getPoliceList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.trafficPoliceReducer.start - (this.props.trafficPoliceReducer.size - 1));
        this.props.getPoliceList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.trafficPoliceReducer.start + (this.props.trafficPoliceReducer.size - 1));
        this.props.getPoliceList();
    };

    showAddPolice = () => {
        $('#policeModal').modal('open');
        this.props.setName('');
        this.props.setGender('0');
        this.props.changePolicePosition({value: '', label: '职务'});
        this.props.setPhone('');
        this.props.setPassword('');
    };

    /**
     * 更新 增加交警：姓名
     */
    changeName = (event) => {
        this.props.setName(event.target.value);
    };

    /**
     * 更新 增加交警：性别
     */
    changeGender = (event) => {
        this.props.setGender(event.target.value);
    };

    /**
     * 更新 增加交警：电话
     */
    changePhone = (event) => {
        this.props.setPhone(event.target.value);
    };

    /**
     * 更新 增加交警：密码
     */
    changePassword = (event) => {
        this.props.setPassword(event.target.value);
    };

    render() {
        const {trafficPoliceReducer, changeConditionGender, changeConditionPosition, changeConditionStatus, changePolicePosition, closeModal, addPolice} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        交警管理
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 no-padding">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：编号 */}
                            <div className="input-field col s4">
                                <input id="police_no" type="text" value={trafficPoliceReducer.conditionNo} onChange={this.changeConditionNo}/>
                                <label htmlFor="police_no">编号</label>
                            </div>

                            {/* 查询条件：姓名 */}
                            <div className="input-field col s4">
                                <input id="name" type="text" value={trafficPoliceReducer.conditionName} onChange={this.changeConditionName}/>
                                <label htmlFor="name">姓名</label>
                            </div>

                            {/* 查询条件：性别 */}
                            <div className="input-field col s4">
                                <Select
                                    options={trafficPoliceReducer.genderList}
                                    onChange={changeConditionGender}
                                    isSearchable={false}
                                    placeholder={"性别"}
                                    styles={SysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                            </div>

                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：职务 */}
                            <div className="input-field col s4">
                                <Select
                                    options={trafficPoliceReducer.policePositionList}
                                    onChange={changeConditionPosition}
                                    isSearchable={false}
                                    placeholder={"职务"}
                                    styles={SysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                            </div>

                            {/* 查询条件：电话 */}
                            <div className="input-field col s4">
                                <input id="phone" type="text" value={trafficPoliceReducer.conditionPhone} onChange={this.changeConditionPhone}/>
                                <label htmlFor="phone">电话</label>
                            </div>

                            {/* 查询条件：状态 */}
                            <div className="input-field col s4">
                                <Select
                                    options={trafficPoliceReducer.policeStatusList}
                                    onChange={changeConditionStatus}
                                    isSearchable={false}
                                    placeholder={"状态"}
                                    styles={SysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                            </div>
                        </div>

                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryPoliceList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 add-btn" onClick={this.showAddPolice}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">

                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>编号</th>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>电话(登录账号)</th>
                                <th>职务</th>
                                <th>状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                trafficPoliceReducer.policeArray.map(function (item) {
                                    return (
                                            <tr className="grey-text text-darken-1">
                                                <td>{item.id}</td>
                                                <td>{item.user_name}</td>
                                                <td>{trafficPoliceReducer.genderList[item.gender].label}</td>
                                                <td>{item.phone}</td>
                                                <td>{trafficPoliceReducer.policePositionList[item.type].label}</td>
                                                <td>{trafficPoliceReducer.policeStatusList[item.status].label}</td>
                                                {/* 显示【交警资料】画面按钮 */}
                                                <td className="operation center">
                                                    <Link to={{pathname: '/traffic_police/'+ item.id}} >
                                                        <i className="mdi mdi-table-search look_icon cyan-text lighten-1"/>
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                            { trafficPoliceReducer.policeArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="7">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>
                        </div>
                    </div>
                </div>

                <div id="policeModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">增加交警</div>

                    {/** Modal主体 */}
                    <div className="modal-content white">
                        <div className="row margin-top40">
                            <div className="input-field col s4">
                                <input id="name" type="text" maxLength="100" value={trafficPoliceReducer.name} onChange={this.changeName}/>
                                <label htmlFor="name">姓名</label>
                            </div>
                            <div className="col s2 margin-top25">
                                <input type="radio" id="male"   value="0" className='with-gap' checked={trafficPoliceReducer.gender==='0'} onChange={this.changeGender}/>
                                <label htmlFor="male">男</label>

                                <input type="radio" id="female" value="1" className='with-gap' checked={trafficPoliceReducer.gender==='1'} onChange={this.changeGender}/>
                                <label htmlFor="female" className="margin-left10">女</label>
                            </div>
                            <div className="input-field col s6">
                                <Select
                                    options={trafficPoliceReducer.policePositionList}
                                    onChange={changePolicePosition}
                                    isSearchable={false}
                                    value={trafficPoliceReducer.position}
                                    placeholder={"职务"}
                                    styles={SysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={false}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="phone" type="text" maxLength="11" value={trafficPoliceReducer.phone} onChange={this.changePhone}/>
                                <label htmlFor="phone">电话(登录账号)</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="password" type="password" maxLength="100" value={trafficPoliceReducer.password} onChange={this.changePassword}/>
                                <label htmlFor="password">密码</label>
                            </div>
                        </div>
                    </div>

                    {/** Modal固定底部：取消确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                        <button type="button" className="btn confirm-btn" onClick={addPolice}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trafficPoliceReducer: state.TrafficPoliceReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getPoliceList: () => {
        dispatch(trafficPoliceAction.getPoliceList())
    },
    setStartNumber: (start) => {
        dispatch(TrafficPoliceActionType.setStartNumber(start))
    },
    setConditionNo: (policeNo) => {
        dispatch(TrafficPoliceActionType.setConditionNo(policeNo))
    },
    setConditionName: (name) => {
        dispatch(TrafficPoliceActionType.setConditionName(name))
    },
    changeConditionGender: (gender) => {
        dispatch(TrafficPoliceActionType.setConditionGender(gender))
    },
    changeConditionPosition: (policePosition) => {
        dispatch(TrafficPoliceActionType.setConditionPosition(policePosition))
    },
    setConditionPhone: (phone) => {
        dispatch(TrafficPoliceActionType.setConditionPhone(phone))
    },
    changeConditionStatus: (status) => {
        dispatch(TrafficPoliceActionType.setConditionStatus(status))
    },
    setName: (name) => {
        dispatch(TrafficPoliceActionType.setName(name))
    },
    setGender: (gender) => {
        dispatch(TrafficPoliceActionType.setGender(gender))
    },
    changePolicePosition: (policePosition) => {
        dispatch(TrafficPoliceActionType.setPolicePosition(policePosition))
    },
    setPhone: (phone) => {
        dispatch(TrafficPoliceActionType.setPhone(phone))
    },
    setPassword: (password) => {
        dispatch(TrafficPoliceActionType.setPassword(password))
    },
    addPolice: () => {
        dispatch(trafficPoliceAction.addPolice())
    },
    closeModal: () => {
        $('#policeModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrafficPolice)
