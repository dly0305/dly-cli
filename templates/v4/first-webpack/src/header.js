import img from './assets/微信图片_20210908142740.jpg'
import './index.less'
function Header() {
    const root = document.getElementById('root')  //获取root节点
    const div = document.createElement('div')  // 创建div
    div.innerText = '段丽莹'  //往div添加元素
    root.append(div)  //往父节点添加
    console.log(`123`, 123)

//    图片打包
    var imgs = new Image();
    imgs.src = img
    root.append(imgs);
// 样式
    imgs.classList.add('content')
}

export default Header;
