import React from 'react';
import YuImageUploader from "./YuImageUploader";

/**
 * @name: 样例
 * @author: yupili
 * @create: 2020/4/16
 **/
class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      picList: []
    }
  }

  doChange(e, file, index) {
    const reader = new FileReader();
    reader.onload = evt => {
      // 上传并修改picList
      this.doUpload(evt, index);
    };
    reader.readAsDataURL(file);
  }

  doDelete(data) {
    this.setState({
      picList: data
    })
  }

  /**
   * 上传逻辑（将图片存储到服务器等），上传成功时，将返回的url添加到picList中
   * @param evt
   * @param index
   */
  doUpload(evt, index) {
    // 此处默认实现，仅用作展示
    const {picList} = this.state;
    let newPicList = [...picList];
    // 替换
    if (index) {
      newPicList[index] = evt.target.result;
    } else {
      // 新增
      newPicList = [...picList, evt.target.result];
    }
    this.setState({
      picList: newPicList
    })
  }


  render() {
    const {picList} = this.state;
    const MAX_SIZE = 1024 * 1024;

    return (
      <div className="example">
        <h1>鱼皮-多图上传组件演示</h1>
        <YuImageUploader data={picList} count={5} size={MAX_SIZE} accept='image/png, image/jpg'
                         onChange={this.doChange.bind(this)} onDelete={this.doDelete.bind(this)}/>
      </div>
    );
  }
}

export default Example;
