import styles from './ImageGrid.module.css';
import Image from "next/image";

export default function ImageGrid() {

  return (

    <>
      <div className={`${styles.ImageGrid} flex justify-self-center gap-x-[46px]`}>
        <div className={`${styles.leftImage} relative row-span-2`}>
          <div className={`${styles.img} relative w-[680px] h-[706px]`}>
            <Image
              src={`/assets/home/imageGrid/hilfiger.png`}
              alt='hilfiger'
              fill
              className="object-cover"
            />
          </div >
          <div className={`${styles.img_desc}`}>

          </div>
        </div>
        <div className={`${styles.rightImage} justify-self-center gap-y-[36px] flex flex-col w-[456px] h-[706px]`}>
          <div className={`${styles.img} relative w-[456px] h-[341px]`}>
            <Image
              src={`/assets/home/imageGrid/olivia-black.jpg`}
              alt='olivia-black'
              fill
              className="object-cover"
            />
            <div className={`${styles.img_desc}`}>

            </div>
          </div >
          <div className={`${styles.img} relative w-[456px] h-[328px]`}>
            <Image
              src={`/assets/home/imageGrid/olivia-pink.jpg`}
              alt='olivia-pink'
              fill
              className="object-cover"
            />
            <div className={`${styles.img_desc}`}>

            </div>
          </div >
        </div>
      </div>
    </>
  );
}