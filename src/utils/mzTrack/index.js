

export const mzBtnTrack = (Category, Action, Lable) => {
  const nodeEnv = process.env.NODE_ENV; 
  if (nodeEnv === 'production') {
    stm_clicki('send', 'event', Category, Action, Lable);
  } else {
    console.log('秒针埋点', 'send', 'event', Category, Action, Lable)
  }
}
