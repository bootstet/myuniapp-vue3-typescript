import html2canvas from 'html2canvas'

export const drawCanvas = async (domId, imgWidth, imgHeight) => {
  // 获取想要转换的 DOM 节点
  const dom = document.querySelector(domId);
  if (!dom) return;
  // DOM 节点计算后宽高
  const width = imgWidth || dom.scrollWidth;
  const height = imgHeight || dom.scrollHeight;
  // 获取像素比-防止模糊
  const scaleBy = 2;
  // 创建自定义 canvas 元素
  const canvasData = document.createElement('canvas');

  // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  canvasData.width = width * scaleBy;
  canvasData.height = height * scaleBy;
  // 设定 canvas css宽高为 DOM 节点宽高
  canvasData.style.width = `${width}px`;
  canvasData.style.height = `${height}px`;
  // 获取画笔
  const context = canvasData.getContext('2d');
  if (!context) return;

  // 将自定义 canvas 作为配置项传入，开始绘制
  return await html2canvas(dom, {
    canvas: canvasData,
    useCORS: true,
    logging: true,
    allowTaint: true,
    scale: scaleBy,
    height: dom.scrollHeight,
    windowHeight: dom.scrollHeight,
  }).then((canvas) => {
    return {
      height,
      src: canvas.toDataURL('image/png')
    }
  });
};