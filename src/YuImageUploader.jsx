import React from 'react';
import PropTypes from 'prop-types';
import './YuImageUploader.css';

/**
 * @name: 自实现多图上传组件
 * @author: yupili
 * @create: 2020/4/16
 **/
class MyImageUploader extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    count: PropTypes.number,
    accept: PropTypes.string,
    size: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    count: 1,
    accept: 'image/*',
  };

  onFileChange(e, index = -1) {
    const imgFile = e.target.files[0];
    // validate size
    const {size} = this.props;
    if (size && imgFile.size > size) {
      alert('图片过大！');
      return;
    }
    // read file
    const reader = new FileReader();
    reader.onload = evt => {
      const {data, count} = this.props;
      if (index < 0 && data.length < count) {
        this.doAddPic(e, imgFile);
        return;
      }
      if (data.length > index) {
        this.doReplacePic(e, imgFile, index);
        return;
      }
      console.error(`picture change error, out of index!`);
      alert('图片加载错误！');
    };
    reader.readAsDataURL(imgFile);
  }

  /**
   * 插入图片
   * @param e 文件上传事件
   * @param imgFile
   */
  doAddPic(e, imgFile) {
    this.props.onChange(e, imgFile);
  }

  /**
   * 替换图片
   * @param e 文件上传事件
   * @param index 要替换的图片下标
   * @param imgFile
   */
  doReplacePic(e, imgFile, index) {
    this.props.onChange(e, imgFile, index);
  }

  /**
   * 删除图片
   * @param index 要删除的图片下标
   */
  onDelete(index) {
    let {data} = this.props;
    if (index >= 0 && index < data.length) {
      data.splice(index, 1);
      this.props.onDelete(data);
      return;
    }
    console.error(`picture delete error, out of index!`)
    alert('图片加载错误！');
  }

  render() {
    const {data, count, accept} = this.props;

    const addImgView = (
      <div className="add-img-btn img-box">
        <div className="plus-icon">+</div>
        <input type="file" name="files" className="add-img-input" accept={accept}
               onChange={this.onFileChange.bind(this)}/>
      </div>
    );

    const showImgView = (url, index = 1) => {
      return (
        <div className="show-img img-box" key={index}>
          <img src={url} alt={`图片${index}`}/>
          <div className="mask">
            <input type="file" name="files" className="add-img-input" accept={accept}
                   onChange={e => this.onFileChange(e, index)}/>
            <div className="close-btn" onClick={this.onDelete.bind(this, index)}>×</div>
          </div>
        </div>
      )
    };

    return (
      <div className="my-image-uploader">
        {data && data.map((pic, index) => {
          return showImgView(pic, index);
        })}
        {data && data.length < count && addImgView}
      </div>
    );
  }
}

export default MyImageUploader;
