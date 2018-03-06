import React, { PureComponent } from 'react';
import { Upload, Icon, message, Card, Button, Form, Col, Row, Radio, Input } from 'antd';
import { connect } from 'dva';
import SimpleMDE from 'simplemde';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';
import TagSelect from '../../components/TagSelect';
import styles from './Release.less';

const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Dragger } = Upload;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 16 },
  },
};

const publishStatus = [
  { name: '公开', id: 1 },
  { name: '私密', id: 2 },
];

const state = [
  { name: '已发布', id: 1 },
  { name: '草稿', id: 2 },
];

@Form.create()
@connect(({ qiniu, articleDetail, category, tag, loading }) => ({
  qiniu,
  articleDetail,
  category,
  tag,
  submitting: loading.effects['article/submit'],
}))

export default class articleRelease extends PureComponent {
  state = {
    prefix: 'blog',
    qn: {},
    width: '100%',
  };
  async componentDidMount() {
    this.smde = new SimpleMDE({
      element: document.getElementById('content'),
      autoDownloadFontAwesome: false,
      autofocus: true,
      autosave: true,
      status: false,
      spellChecker: false,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'qiniu/fetch',
    });
    dispatch({
      type: 'tag/fetch',
    });
    dispatch({
      type: 'category/fetch',
    });
    if (this.props.location.state !== undefined) {
      const params = this.props.location.state.id;
      await dispatch({
        type: 'articleDetail/edit',
        payload: params,
      });
      const { title, keyword, descript, category, tag, content, publish, state }
      = this.props.articleDetail.data.result;
      const [detailTagList, detailCategory] = [tag, category];
      tag.forEach((item) => {
        detailTagList.push(item._id);
      });
      category.forEach((item) => {
        detailCategory.push(item._id);
      });
      this.smde.value(content);
      this.props.form.setFieldsValue({
        title,
        keyword,
        descript,
        category: detailCategory,
        tag: detailTagList,
        publish,
        state,
      });
    }
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }

  beforeUpload = (file) => {
    const { prefix } = this.state;
    this.state.qn.key = `${prefix}/${file.name}`;
    const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isPic) {
      message.error('请上传图片');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片必须小于5MB!');
    }
    return isPic && isLt5M;
  }

  render() {
    const { form, dispatch, submitting } = this.props;
    this.state.qn.token = this.props.qiniu.data.result;
    const tagList = this.props.tag.data.result.list;
    const categoryList = this.props.category.data.result.list;
    const { getFieldDecorator, validateFieldsAndScroll } = form;
    const props = {
      accept: 'image',
      data: this.state.qn,
      listType: 'picture-card',
      multiple: true,
      action: 'https://up.qbox.me/',
      beforeUpload: this.beforeUpload,
      onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
          message.success(`${info.file.name} 上传成功`);
        } else if (status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };

    const validate = () => {
      this.props.form.setFieldsValue({
        content: this.smde.value(),
      });
      validateFieldsAndScroll((error, values) => {
        if (values.thumb !== undefined) {
          const { name } = values.thumb.file;
          Object.defineProperty(values, 'thumb', {
            value: `https://cdn.spiritree.me/${name}`,
          });
        }
        if (!error) {
          if (this.props.location.state !== undefined) {
            Object.defineProperty(values, '_id', {
              value: this.props.location.state.id,
            });
            dispatch({
              type: 'article/patch',
              payload: values,
            });
          } else {
            dispatch({
              type: 'article/submit',
              payload: values,
            });
          }
        }
      });
    };
    return (
      <PageHeaderLayout
        title=""
      >
        <Row gutter={24}>
          <Col lg={15} sm={24}>
            <Card title="笔记信息" className={styles.card} bordered={false}>
              <Form hideRequiredMark layout="vertical">
                <Form.Item {...formItemLayout} label="笔记标题">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入笔记标题' }],
                  })(
                    <Input placeholder="请输入笔记标题" />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="笔记关键字">
                  {getFieldDecorator('keyword', {
                    rules: [{ required: true, message: '笔记关键字' }],
                  })(
                    <Input placeholder="笔记关键字" />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="笔记描述">
                  {getFieldDecorator('descript', {
                    rules: [{ required: true, message: '请输入笔记描述' }],
                  })(
                    <TextArea placeholder="请输入笔记描述" autosize={{ minRows: 2 }} />
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="笔记分类">
                  {getFieldDecorator('category', {
                    rules: [{ required: true, message: '请选择笔记分类' }],
                  })(
                    <TagSelect expandable>
                      {
                        categoryList.map(item =>
                          <TagSelect.Option key={item.id} value={item._id}>{item.name}</TagSelect.Option>
                        )
                      }
                    </TagSelect>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="笔记标签">
                  {getFieldDecorator('tag', {
                    rules: [{ required: true, message: '请选择笔记标签' }],
                  })(
                    <TagSelect expandable>
                      {
                        tagList.map(item =>
                          <TagSelect.Option key={item.id} value={item._id}>{item.name}</TagSelect.Option>
                        )
                      }
                    </TagSelect>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="笔记内容">
                  {getFieldDecorator('content', {
                    rules: [{ required: true, message: '请输入笔记内容' }],
                  })(
                    <textarea id="content" />
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col lg={9} sm={24}>
            <Card title="笔记状态" className={styles.card} bordered={false}>
              <Form hideRequiredMark>
                <Form.Item {...formItemLayout} label="公开">
                  {/* 你不再需要也不应该用 onChange 来做同步 */}
                  {getFieldDecorator('publish', {
                    initialValue: 1,
                    rules: [{ required: true, message: '请选择笔记是否公开' }],
                  })(
                    <RadioGroup>
                      {
                        publishStatus.map(item =>
                          <RadioButton key={item.id} value={item.id}>{item.name}</RadioButton>
                        )
                      }
                    </RadioGroup>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                  {getFieldDecorator('state', {
                    initialValue: 1,
                    rules: [{ required: true, message: '请选择笔记状态' }],
                  })(
                    <RadioGroup>
                      {
                        state.map(item =>
                          <RadioButton key={item.id} value={item.id}>{item.name}</RadioButton>
                        )
                      }
                    </RadioGroup>
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col lg={9} sm={24}>
            <Card title="上传封面" className={styles.card} bordered={false}>
              <Form>
                <Form.Item {...formItemLayout} style={{ marginLeft: '25%' }}>
                  {getFieldDecorator('thumb', {
                    rules: [{ required: true, message: '请上传封面' }],
                  })(
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                    </Dragger>
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        <FooterToolbar style={{ width: this.state.width }}>
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}
