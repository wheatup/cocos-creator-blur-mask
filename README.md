
* [中文](#Cocos-Creator-实现背景模糊效果)
* [English](#Backdrop-Blur-for-Cocos-Creator)

# Cocos Creator 实现背景模糊效果

用于凸显前景，让背景模糊并降低亮度

### 版本

> 针对Cocos Creator `2.1.1` 及以上。

### 效果

![效果](https://i.imgur.com/TGXDHlq.gif)

### 在线预览

> [https://wheatup.github.io/blur-effect/](https://wheatup.github.io/blur-effect/)

----

### 更新日志

#### 2019-09-03

* 修复了与 `Mask` 对象并用时模糊失效的问题。

#### 2019-05-27

* 排除对象现在也会排除其所有子物体。

#### 2019-05-10

* 现在不在BlurMask节点包围盒以内的背景将不会被模糊，局部打码不是梦。
* 现在可以排除不需要渲染模糊的对象。
* 大幅优化了性能。
* 支持自定义渲染参数，可以指定模糊程度和亮度。

#### 2019-05-09

* 修复手机无法正常显示的bug
* 略微优化了性能

* Fixed a bug that it might not work correctly on mobile devices.
* Slightly increased the performance.

---

# Backdrop Blur for Cocos Creator

Blur and dim the backdrop for highlighting the foreground(such as an alert box).

## Target Version

> For Cocos Creator `2.1.x` and above.

### Preview

![Preview](https://i.imgur.com/TGXDHlq.gif)

### Live Preview

> [https://wheatup.github.io/blur-effect/](https://wheatup.github.io/blur-effect/)

----

### Change Logs

#### 2019-09-03

* Fixed a bug that the BlurMask doesn't work when a node with `Mask` component also exists.

#### 2019-05-27

* The children of excluded nodes will also be ignored.

#### 2019-05-10

* Now the content outside of the bounding box of the BlurMask not will not be affected.
* You can now exclude nodes that the renderer will ignore them.
* Drastically increased the performance.
* Cusomizable rendering attributes, you can now adjust the blurriness and brightness of the mask. 

#### 2019-05-09

* Fixed a bug that it might not work correctly on mobile devices.
* Slightly increased the performance.