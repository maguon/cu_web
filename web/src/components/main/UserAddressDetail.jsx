import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const userAddressDetailAction = require('../../actions/main/UserAddressDetailAction');
const formatUtil = require('../../util/FormatUtil');

class UserAddressDetail extends React.Component {

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
        // 取得地址详情
        this.props.getUserAddressInfo();
    }

    render() {
        const {userAddressDetailReducer} = this.props;

        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/user_address', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">收货地址 - 地址详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体部分：地址详情 */}
                <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                    <div className="row detail-box-header vc-center">
                        {/* 地址详情：地址编号 */}
                        <div className="col s6 no-padding">地址编号：{this.props.match.params.id}</div>

                        {/* 地址详情：最后修改时间 */}
                        <div className="col s6 right-align no-padding">
                            <span className="grey-text">最后修改时间：{formatUtil.getDateTime(userAddressDetailReducer.lastModifyTime)}</span>
                        </div>
                    </div>

                    <div className="col s12 grey-text">

                        {/** 微信昵称 绑定电话 */}
                        <div className="row">
                            <div className="col s12 blue-font">
                                <i className="mdi mdi-account-outline fz20"/>
                                <span className="margin-left20">{userAddressDetailReducer.weChatName}</span>
                                <span className="grey-text margin-left10">({userAddressDetailReducer.bindPhone})</span>
                            </div>
                        </div>

                        <div className="row">
                            {/* 地址 */}
                            <div className="col s8">
                                <i className="mdi mdi-map-marker-outline orange-text text-lighten-1 fz20"/>
                                <span className="margin-left20">{userAddressDetailReducer.address}</span>
                            </div>

                            {/* 收货人 收货人电话 */}
                            <div className="col s4 right-align">
                                收货人：{userAddressDetailReducer.shipName}<span className="margin-left10">{userAddressDetailReducer.shipPhone}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userAddressDetailReducer: state.UserAddressDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUserAddressInfo: () => {
        dispatch(userAddressDetailAction.getUserAddressInfo(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAddressDetail)
