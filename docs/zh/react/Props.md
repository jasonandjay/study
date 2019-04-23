# Props
#### 1、和props相关
- 只读，不准修改
- componentWillReceiveProps  / 生命周期
- propTypes
- defaultProps
- children
#### 2、类型检查

```
import PropTypes from 'prop-types';

List.propTypes = {
    list:PropTypes.array/object/number/string
}
```
#### 3、默认值
```
List.defaultProps = {
    list:[{},{},{}]
}
```
