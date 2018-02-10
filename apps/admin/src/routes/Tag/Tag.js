import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, Modal, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Tag.less';

const FormItem = Form.Item;
const { Column } = Table;
const { TextArea } = Input;

@connect(({ tag, loading }) => ({
  tag,
  loading: loading.models.tag,
}))
@Form.create()
export default class TagList extends PureComponent {
  state = {
    createModalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    id: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    const params = {
      page_size: 10,
    };

    dispatch({
      type: 'tag/fetch',
      payload: params,
    });
  }

  handleTableChange = (pagination) => {
    const { dispatch } = this.props;

    const params = {
      current_page: pagination.current,
      page_size: pagination.pageSize,
    };

    dispatch({
      type: 'tag/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const name = this.props.form.getFieldValue('keyword');
    const params = {
      keyword: name,
    };
    dispatch({
      type: 'tag/fetch',
      payload: params,
    });
  }

  handleCreateModalVisible = (flag) => {
    this.setState({
      createModalVisible: !!flag,
    });
  }

  handleUpdateModalVisible = (flag) => {
    this.setState({
      updateModalVisible: !!flag,
    });
  }

  handleAdd = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'tag/add',
        payload: {
          ...fieldsValue,
        },
      });
      this.setState({
        createModalVisible: false,
      });
      this.handleFormReset();
    });
  }

  handleUpdate = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { id } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'tag/update',
        payload: {
          _id: id,
          ...fieldsValue,
        },
      });
      this.setState({
        updateModalVisible: false,
      });
    });
  }

  handleUpdateBtn = (record) => {
    const { _id, name, descript } = record;
    this.setState({ id: _id });
    this.props.form.setFieldsValue({
      name,
      descript,
    });
    this.handleUpdateModalVisible(true);
  }

  handleDeleteBtn = (record) => {
    const { _id } = record;
    const { dispatch } = this.props;

    dispatch({
      type: 'tag/delete',
      payload: _id,
    });
  }

  renderCreateModal() {
    const { getFieldDecorator } = this.props.form;
    const { createModalVisible } = this.state;
    return (
      <Modal
        title="新建标签"
        visible={createModalVisible}
        onOk={this.handleAdd}
        onCancel={() => this.handleCreateModalVisible()}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="名称"
        >
          {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入标签名称',
              }],
            })(
              <Input />
            )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="描述"
        >
          {getFieldDecorator('descript', {
              rules: [{
                required: true,
                message: '请输入描述',
              }],
            })(
              <TextArea rows={4} />
            )}
        </FormItem>
      </Modal>
    );
  }

  renderUpdateForm() {
    const { getFieldDecorator } = this.props.form;
    const { updateModalVisible } = this.state;
    return (
      <Modal
        title="修改标签"
        visible={updateModalVisible}
        onOk={this.handleUpdate}
        onCancel={() => this.handleUpdateModalVisible()}
        afterClose={() => this.handleFormReset()}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="名称"
        >
          {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入标签名称',
              }],
            })(
              <Input />
            )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="描述"
        >
          {getFieldDecorator('descript', {
              rules: [{
                required: true,
                message: '请输入描述',
              }],
            })(
              <TextArea rows={4} />
            )}
        </FormItem>
      </Modal>
    );
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标签名称">
              {getFieldDecorator('keyword')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    // 展开拓展
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { tag: { data: { result: { list, pagination } } }, loading } = this.props;

    return (
      <PageHeaderLayout title="标签列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreateModalVisible(true)}>
                新建
              </Button>
            </div>
            {/* <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            /> */}
            <Table
              className={styles.Table}
              dataSource={list}
              loading={loading}
              pagination={pagination}
              onChange={this.handleTableChange}
              rowKey="id"
            >
              <Column
                title="名称"
                dataIndex="name"
                width="20%"
              />
              <Column
                title="描述"
                dataIndex="descript"
                width="40%"
              />
              <Column
                title="文章数"
                dataIndex="count"
                width="20%"
              />
              <Column
                title="操作"
                key="action"
                width="20%"
                render={(text, record) => (
                  <span>
                    <Button style={{ margin: '0 20px 0 0' }} onClick={() => this.handleUpdateBtn(record)}>修改</Button>
                    <Popconfirm title="确认删除？" onConfirm={() => this.handleDeleteBtn(record)}>
                      <Button type="danger">删除</Button>
                    </Popconfirm>
                  </span>
                )}
              />
            </Table>
          </div>
        </Card>
        {this.renderCreateModal()}
        {this.renderUpdateForm()}
      </PageHeaderLayout>
    );
  }
}
