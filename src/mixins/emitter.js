/**
 * @function 事件广播 上层组件通知下层组件
 * @description 遍历当前组件的所有子组件，找到名称为 componentName 的子组件，然后调用其 $emit() 事件
 * @param componentName 组件名称
 * @param eventName 事件名称
 * @param params  传递的参数;
 */
function broadcast(componentName, eventName, params) {
  // 遍历所有子组件
  this.$children.forEach((child) => {
    var name = child.$options.componentName;
    // 找到组件名为componentName的子组件，并调用该子组件的$emit方法；
    // 否则，继续递归
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    /**
     * @function 组件通信 子组件发送消息给上层组件;
     * @description 查找所有父级，直到找到名称为 componentName 的父组件， 然后调用其 $emit() 事件
     * @param componentName 组件名称
     * @param eventName 事件名称
     * @param params  传递的参数;
     */
    dispatch(componentName, eventName, params) {
      // 当前父组件
      var parent = this.$parent || this.$root;
      // 当前父组件的组件名
      var name = parent.$options.componentName;

      // 通过$parent，一直向上找，直到组件名等于componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // 如果找到目标组件，那么调用目标组件的$emit方法
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
