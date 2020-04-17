# 鱼皮-多图上传组件（YuImageUploader）
> 原生的多图上传组件，不依赖任何类库，高效灵活轻量

## 在线演示
示例地址：https://liyupi.github.io/yu-image-uploader/

## 使用方法 
复制 `YuImageUploader.jsx` 和 `YuImageUploader.css` 到项目中，引入组件即可。
```jsx harmony
<YuImageUploader data={picList} count={5} size={MAX_SIZE} 
                 accept='image/png, image/jpg'
                 onChange={this.doChange} 
                 onDelete={this.doDelete}
/>
```

项目src目录下给出示例文件 `Example.jsx`，可参考其中代码快速使用。


## 支持属性
- data: 图片列表，由父组件自行管理
- accept：接受的图片格式
- size：接受的图片最大尺寸
- count: 最大图片数量
- onChange：新增或替换图片时触发。参数 event,（事件） file（文件）, index（替换文件下标，新增时无该属性）
- onDelete: 删除图片时触发。参数 data（当前图片列表）

## 特性
1. 支持多图和单图上传
1. 纯原生，不依赖任何类库，高效灵活轻量
1. 父组件管理数据，灵活可定制（防止上传失败导致的子父组件数据不一致）
1. 仅保留常用属性，易上手
