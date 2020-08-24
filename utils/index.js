export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function formatTime(time) {
  const dateTimeStamp = new Date(time.replace(/\-/ig, '/')).getTime()


  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24

  const month = day * 30
  const year = month * 12
  const now = new Date().getTime()
  const diffValue = now - dateTimeStamp
  let result = ''
  if (diffValue < 0) {
    return
  }


  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute
  const yearC = diffValue / year
  if (yearC >= 1) {
    return '' + parseInt(yearC) + '年前'
  }
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }

  return result
}
