import React from 'react'
import Link from 'umi/link'
import PageHeader from 'ant-design-pro/lib/PageHeader'
import MenuContext from '@/layouts/MenuContext'
import { connect } from 'dva'
import GridContent from './GridContent'
import styles from './index.less'

const PageHeaderWrapper = ({
  children,
  contentWidth,
  wrapperClassName,
  top,
  ...restProps
}) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home={'home'}
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={item => {
            return item.name
          }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
)

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth
}))(PageHeaderWrapper)
