import React, { PureComponent } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { Row, Col, Card, Form, Button, Table, Popconfirm, Radio } from 'antd'
import StandardFormRow from '@/components/StandardFormRow'
import HeaderSearch from '@/components/HeaderSearch'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './Comment.less'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { Column } = Table

@connect(({ comment, loading }) => ({
  comment,
  loading: loading.models.comment
}))
@Form.create()
export default class CommentList extends PureComponent {
  state = {}

  componentDidMount() {
    const { dispatch } = this.props

    const params = {
      page_size: 10
    }

    dispatch({
      type: 'comment/fetch',
      payload: params
    })
  }

  handleTableChange = pagination => {
    const { dispatch } = this.props

    const params = {
      current_page: pagination.current,
      page_size: pagination.pageSize
    }

    dispatch({
      type: 'tag/fetch',
      payload: params
    })
  }

  handleStateRadio = e => {
    const { dispatch } = this.props
    this.props.form.setFieldsValue({ state: e.target.value })
    const params = this.props.form.getFieldsValue()
    dispatch({
      type: 'comment/fetch',
      payload: params
    })
  }

  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
  }

  handleSearch = value => {
    const { dispatch } = this.props
    const params = {
      keyword: value
    }
    dispatch({
      type: 'comment/fetch',
      payload: params
    })
  }

  handleStateStatus = record => {
    const { _id, state, post_id } = record
    const newState = state === 1 ? 2 : 1
    const { dispatch } = this.props
    dispatch({
      type: 'comment/changeState',
      payload: {
        _id,
        post_id,
        state: newState
      }
    })
  }

  handleDeleteBtn = record => {
    const { _id } = record
    const { dispatch } = this.props
    dispatch({
      type: 'comment/delete',
      payload: _id
    })
  }

  render() {
    const {
      comment: {
        data: {
          result: { list, pagination }
        }
      },
      loading
    } = this.props
    const { getFieldDecorator } = this.props.form

    const auditState = [
      { name: '审核通过', id: 1 },
      { name: '审核不通过', id: 2 }
    ]

    return (
      <PageHeaderLayout title="评论列表">
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="状态" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('state')(
                  <RadioGroup onChange={this.handleStateRadio}>
                    <RadioButton>全部</RadioButton>
                    {auditState.map(item => (
                      <RadioButton key={item.id} value={item.id}>
                        {item.name}
                      </RadioButton>
                    ))}
                  </RadioGroup>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="搜索" block style={{ paddingBottom: 11 }}>
              <HeaderSearch
                placeholder="搜索评论"
                onPressEnter={this.handleSearch}
              />
            </StandardFormRow>
          </Form>
          <Table
            className={styles.Table}
            dataSource={list}
            loading={loading}
            pagination={pagination}
            onChange={this.handleTableChange}
            expandedRowRender={record => (
              <div>
                <Row gutter={16}>
                  <Col span={8}>
                    <p style={{ margin: 0 }}>
                      文章名称：
                      {record.post_title}
                    </p>
                  </Col>
                  <Col span={8}>
                    <p style={{ margin: 0 }}>
                      IP：
                      {record.ip}
                    </p>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <p style={{ margin: 0 }}>
                      评论内容：
                      {record.content}
                    </p>
                  </Col>
                </Row>
              </div>
            )}
            rowKey="id"
          >
            <Column title="姓名" dataIndex="author.name" width="10%" />
            <Column title="邮箱" dataIndex="author.email" width="15%" />
            <Column title="网站" dataIndex="author.site" width="15%" />
            <Column
              title="日期"
              dataIndex="create_at"
              width="20%"
              render={val => (
                <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
              )}
            />
            <Column
              title="状态"
              dataIndex="state"
              width="15%"
              render={val => <span>{val === 1 ? '通过' : '不通过'}</span>}
            />
            <Column
              title="操作"
              key="action"
              width="25%"
              render={(text, record) => (
                <span>
                  {record.state === 1 ? (
                    <Button
                      style={{ margin: '0 20px 0 0' }}
                      onClick={() => this.handleStateStatus(record)}
                    >
                      不通过
                    </Button>
                  ) : (
                    <Button
                      style={{ margin: '0 20px 0 0' }}
                      onClick={() => this.handleStateStatus(record)}
                    >
                      通过
                    </Button>
                  )}
                  <Popconfirm
                    title="确认删除？"
                    onConfirm={() => this.handleDeleteBtn(record)}
                  >
                    <Button type="danger">删除</Button>
                  </Popconfirm>
                </span>
              )}
            />
          </Table>
        </Card>
      </PageHeaderLayout>
    )
  }
}
