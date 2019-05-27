# Cocos Creator 实现背景模糊效果

用于凸显前景，让背景模糊并降低亮度

### 版本

> 针对Cocos Creator `2.1.1` 及以上。

### 效果

![[效果](https://i.imgur.com/TGXDHlq.gif)](https://i.imgur.com/TGXDHlq.gif)

### 在线预览

> [https://wheatup.github.io/blur-effect/](https://wheatup.github.io/blur-effect/)

----

### 更新日志

#### 2019-05-27 更新

* 排除对象现在也会排除其所有子物体。

#### 2019-05-10 更新

* 现在不在Mask节点包围盒以内的背景将不会被模糊，局部打码不是梦。
* 现在可以排除不需要渲染模糊的对象。
* 大幅优化了性能。
* 支持自定义渲染参数，可以指定模糊程度和亮度。

#### 2019-05-09 更新

* 修复手机无法正常显示的bug
* 略微优化了性能