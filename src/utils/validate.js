/**
 * 判断是否为外部资源
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * return /^(https?:|mailto:|tel:)/.test(path)：这行代码是函数的
 * 主体，它返回一个布尔值。这里使用了正则表达式
 * ^(https?:|mailto:|tel:) 来检查 path 字符串是否以 http:、https:、mailto: 或 tel: 开头。
 */
