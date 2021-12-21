import React from 'react';
import ImgLeftTop from '@/assets/home/leftTop.png';
import ImgRightTop from '@/assets/home/rightTop.png';
import ImgLeftBottom from '@/assets/home/leftBottom.png';
import ImgRightBottom from '@/assets/home/rightBottom.png';
import styles from './index.less';

const BgComponent = () => {
  return (
    <div className={styles.bg}>
      <img src={ImgLeftTop} alt="" className={styles['left-top']} />
      <img src={ImgRightTop} alt="" className={styles['right-top']} />
      <img src={ImgLeftBottom} alt="" className={styles['left-bottom']} />
      <img src={ImgRightBottom} alt="" className={styles['right-bottom']} />
    </div>
  );
};

export default BgComponent;
