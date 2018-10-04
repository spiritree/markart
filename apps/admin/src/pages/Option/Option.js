import React, { PureComponent } from 'react'
import { Card, Button, Form, Col, Row, Input } from 'antd'
import { connect } from 'dva'
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Option.less'

const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 16 }
  }
}

@Form.create()
@connect(({ option, loading }) => ({
  option,
  submitting: loading.effects['option/updateOption'],
  updating: loading.effects['option/updateAuth']
}))
export default class articleRelease extends PureComponent {
  state = {
    width: '100%'
  }
  async componentDidMount() {
    const { dispatch } = this.props
    await dispatch({
      type: 'option/fetchAuth'
    })
    await dispatch({
      type: 'option/fetchOption'
    })
    const { username } = this.props.option.data.auth.result
    const {
      descript,
      email,
      sub_title,
      title,
      url
    } = this.props.option.data.option.result
    this.props.form.setFieldsValue({
      username,
      descript,
      email,
      sub_title,
      title,
      url
    })
    window.addEventListener('resize', this.resizeFooterToolbar)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar)
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0]
    const width = `calc(100% - ${sider.style.width})`
    if (this.state.width !== width) {
      this.setState({ width })
    }
  }

  render() {
    const { form, dispatch, submitting, updating } = this.props
    const { getFieldDecorator, validateFieldsAndScroll } = form

    const validate = () => {
      validateFieldsAndScroll(
        ['title', 'sub_title', 'url', 'descript', 'email'],
        error => {
          const body = this.props.form.getFieldsValue([
            'title',
            'sub_title',
            'url',
            'descript',
            'email'
          ])
          if (!error) {
            dispatch({
              type: 'option/updateOption',
              payload: body
            })
          }
        }
      )
    }

    const updateValidate = () => {
      validateFieldsAndScroll(
        ['username', 'oldPassword', 'newPassword'],
        error => {
          const body = this.props.form.getFieldsValue([
            'username',
            'oldPassword',
            'newPassword'
          ])
          const { _id } = this.props.option.data.auth.result
          body._id = _id
          if (!error) {
            dispatch({
              type: 'option/updateAuth',
              payload: body
            })
            this.props.form.setFieldsValue({
              oldPassword: '',
              newPassword: ''
            })
          }
        }
      )
    }

    return (
      <PageHeaderLayout title="">
        <Row gutter={24}>
          <Col lg={15} sm={24}>
            <Card title="网站信息" className={styles.card} bordered={false}>
              <Form hideRequiredMark layout="vertical">
                <Form.Item {...formItemLayout} label="标题">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入标题' }]
                  })(<Input placeholder="请输入标题" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="副标题">
                  {getFieldDecorator('sub_title', {
                    rules: [{ required: true, message: '请输入副标题' }]
                  })(<Input placeholder="请输入副标题" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="关键字">
                  {getFieldDecorator('keyword', {
                    rules: [{ required: true, message: '关键字' }]
                  })(<Input placeholder="关键字" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="站点地址">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '站点地址' }]
                  })(<Input placeholder="站点地址" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="站点描述">
                  {getFieldDecorator('descript', {
                    rules: [{ required: true, message: '站点描述' }]
                  })(
                    <TextArea
                      placeholder="站点描述"
                      autosize={{ minRows: 2 }}
                    />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="电子邮件">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: '电子邮件' }]
                  })(<Input placeholder="电子邮件" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="ICP备案号">
                  {getFieldDecorator('icp', {
                    rules: [{ required: true, message: 'ICP备案号' }]
                  })(<Input placeholder="ICP备案号" />)}
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col lg={9} sm={24}>
            <Card title="个人信息" className={styles.card} bordered={false}>
              <Form hideRequiredMark>
                <Form.Item {...formItemLayout} label="用户名">
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '用户名' }]
                  })(<Input placeholder="用户名" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="原密码">
                  {getFieldDecorator('oldPassword', {
                    rules: [{ min: 6, required: true, message: '原密码' }]
                  })(<Input placeholder="原密码" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="新密码">
                  {getFieldDecorator('newPassword', {
                    rules: [{ min: 6, required: true, message: '新密码' }]
                  })(<Input placeholder="新密码" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} style={{ float: 'right' }}>
                  <Button
                    type="primary"
                    onClick={updateValidate}
                    loading={updating}
                  >
                    修改
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          {/* <Col lg={9} sm={24}>
            <Card title="笔记信息" className={styles.card} bordered={false}>
              <Form>
                <Form.Item {...formItemLayout} label="笔记标题">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入笔记标题' }],
                  })(
                    <Input placeholder="请输入笔记标题" />
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col> */}
        </Row>
        <FooterToolbar style={{ width: this.state.width }}>
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    )
  }
}
