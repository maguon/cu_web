import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {UserAddressActionType} from '../../actionTypes';

const userAddressAction = require('../../actions/main/UserAddressAction');
const formatUtil = require('../../util/FormatUtil');

class UserAddress extends React.Component {

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
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.setConditionNo('');
            this.props.setConditionShipName('');
            this.props.setConditionShipPhone('');
            this.props.setConditionBindUser('');
            this.props.setConditionBindPhone('');
        }
        this.props.getUserAddressList();
    }

    /**
     * 更新 检索条件：地址编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：收货人
     */
    changeConditionShipName = (event) => {
        this.props.setConditionShipName(event.target.value);
    };

    /**
     * 更新 检索条件：收货电话
     */
    changeConditionShipPhone = (event) => {
        this.props.setConditionShipPhone(event.target.value);
    };

    /**
     * 更新 检索条件：用户
     */
    changeConditionBindUser = (event) => {
        this.props.setConditionBindUser(event.target.value);
    };

    /**
     * 更新 检索条件：绑定手机
     */
    changeConditionBindPhone = (event) => {
        this.props.setConditionBindPhone(event.target.value);
    };

    /**
     * 查询消息记录列表
     */
    queryUserAddressList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getUserAddressList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.userAddressReducer.start - (this.props.userAddressReducer.size - 1));
        this.props.getUserAddressList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.userAddressReducer.start + (this.props.userAddressReducer.size - 1));
        this.props.getUserAddressList();
    };

    render() {
        const {userAddressReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">收货地址</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <Input s={2} label="地址编号" value={userAddressReducer.conditionNo} onChange={this.changeConditionNo}/>
                        <Input s={3} label="收货人" value={userAddressReducer.conditionShipName} onChange={this.changeConditionShipName}/>
                        <Input s={2} label="收货电话" value={userAddressReducer.conditionShipPhone} onChange={this.changeConditionShipPhone}/>
                        <Input s={3} label="用户" value={userAddressReducer.conditionBindUser} onChange={this.changeConditionBindUser}/>
                        <Input s={2} label="绑定手机" value={userAddressReducer.conditionBindPhone} onChange={this.changeConditionBindPhone}/>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryUserAddressList}>
                            <i className="mdi mdi-magnify"/>
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
                                <th>地址编号</th>
                                <th>地址</th>
                                <th>收货人</th>
                                <th>收货人电话</th>
                                <th>微信</th>
                                <th>用户姓名</th>
                                <th>绑定手机</th>
                                <th className="center">最后修改时间</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                userAddressReducer.addressArray.map(function (item) {
                                    return (
                                            <tr className="grey-text text-darken-1">
                                                <td>{item.id}</td>
                                                <td>{item.address}</td>
                                                <td>{item.ship_name}</td>
                                                <td>{item.ship_phone}</td>
                                                <td>{item.wechat_name}</td>
                                                <td>{item.user_name}</td>
                                                <td>{item.phone}</td>
                                                <td className="center">{formatUtil.getDateTime(item.updated_on)}</td>
                                                <td className="operation center">
                                                    <Link to={{pathname: '/user_address/'+ item.id}} >
                                                        <i className="mdi mdi-table-search cyan-text lighten-1"/>
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                            { userAddressReducer.addressArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="9">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {userAddressReducer.start > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {userAddressReducer.dataSize >= userAddressReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        userAddressReducer: state.UserAddressReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserAddressList: () => {
        dispatch(userAddressAction.getUserAddressList())
    },
    setStartNumber: (start) => {
        dispatch(UserAddressActionType.setStartNumber(start))
    },
    setConditionNo: (carNo) => {
        dispatch(UserAddressActionType.setConditionNo(carNo))
    },
    setConditionShipName: (name) => {
        dispatch(UserAddressActionType.setConditionShipName(name))
    },
    setConditionShipPhone: (phone) => {
        dispatch(UserAddressActionType.setConditionShipPhone(phone))
    },
    setConditionBindUser: (user) => {
        dispatch(UserAddressActionType.setConditionBindUser(user))
    },
    setConditionBindPhone: (phone) => {
        dispatch(UserAddressActionType.setConditionBindPhone(phone))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress)
