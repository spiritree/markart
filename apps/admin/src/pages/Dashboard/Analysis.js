import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Tooltip,
} from 'antd';
import {
  ChartCard,
} from '@/components/Charts';

@connect(({ tag, article, category, comment }) => ({
  tag,
  category,
  article,
  comment,
}))
export default class Analysis extends Component {
  async componentDidMount() {
    await this.props.dispatch({
      type: 'tag/fetch',
    });
    await this.props.dispatch({
      type: 'category/fetch',
    });
    await this.props.dispatch({
      type: 'article/fetch',
    });
    await this.props.dispatch({
      type: 'comment/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  render() {
    const { tag, article, category, comment } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总文章数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={article.data.result.pagination.total}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总标签数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={tag.data.result.pagination.total}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总分类数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={category.data.result.pagination.total}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总评论数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={comment.data.result.pagination.total}
              contentHeight={46}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
