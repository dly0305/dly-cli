import img from './assets/微信图片_20210908142740.jpg'
import style from'./img2.less'
function End() {
//    图片打包
    var imgs = new Image();
    imgs.src = img
    root.append(imgs);
// 样式
    imgs.classList.add(style.content)
}

export default End;
