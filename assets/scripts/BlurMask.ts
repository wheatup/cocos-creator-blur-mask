/**
 * 模糊节点控制器
 * @author wheatup
 * @version 1.0
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class BlurMask extends cc.Component {
	camera: cc.Camera = null;
	texture: cc.RenderTexture = null;
	spriteFrame: cc.SpriteFrame = null;
	sprite: cc.Sprite = null;

	_lastSize = new cc.Size(0, 0);
	_cullingMask = 0x10000000;

	@property({
		// @ts-ignore
		type: cc.Material,
		displayName: "模糊材质",
		tooltip: "用于应用模糊所用的材质，如无特殊需求请保持默认"
	})
	material = null;

	@property({
		type: [cc.Node],
		displayName: "忽略节点列表",
		tooltip: "在此列表内的节点将不会被模糊遮罩渲染"
	})
	ignoredNodes = [];

	@property({
		type: cc.Float,
		displayName: "亮度",
		tooltip: "降低背景的亮度",
		min: 0,
		max: 1
	})
	bightness: number = 0.5;

	@property({
		type: cc.Float,
		displayName: "模糊度",
		tooltip: "背景的模糊程度",
		min: 0,
		max: 1
	})
	blurAmount: number = 0.5;

	start() {
		// 截图图像是翻转的，所以y轴镜像
		this.node.scaleY = -1;

		// 创建渲染贴图对象
		this.texture = new cc.RenderTexture();
		this.texture.initWithSize(this.node.width, this.node.height, cc.game['_renderContext']['STENCIL_INDEX8']);

		// 在node上创建摄影机
		this.camera = this.node.addComponent(cc.Camera);
		// 不渲染0x10000000的cullingMask对象
		this.camera.cullingMask = 0xffffffff ^ this._cullingMask;
		this.camera.targetTexture = this.texture;
		// 关闭摄影机，否则每一帧它会自动进行渲染
		this.camera.enabled = false;

		// 将自身与忽略对象排除渲染
		this.cull(this.node);
		this.ignoredNodes.map(node => this.cull(node));

		// 创建一个sprite组件，由其进行渲染
		this.spriteFrame = new cc.SpriteFrame();
		this.sprite = this.node.addComponent(cc.Sprite);
		this.sprite.spriteFrame = this.spriteFrame;
		this.material["_props"]["bightness"] = this.bightness;
		this.material["_props"]["blurAmount"] = this.blurAmount;
		this.sprite["_materials"][0] = this.material;
	}

	// 截图并模糊
	snapshot() {
		let size = this.node.getContentSize();
		if (size.width !== this._lastSize.width || size.height !== this._lastSize.height) {
			// 大小发生改变，重新设置texture大小
			this.texture.initWithSize(this.node.width, this.node.height, cc.game['_renderContext']['STENCIL_INDEX8']);
			this.camera.targetTexture = this.texture;
		}
		this._lastSize.width = size.width;
		this._lastSize.height = size.height;

		// 手动渲染摄影机，保存截图
		this.camera.render(cc.Canvas.instance.node);

		// 应用刚刚截图的贴图到sprite身上进行渲染
		this.spriteFrame.setTexture(this.texture);
	}

	update(dt) {
		// 每一帧都进行截图处理，可以换成需要的时候再调用，比较省资源
		this.snapshot();
	}

	// 排除忽略渲染对象及其子对象
	private cull(node: cc.Node) {
		if (node) {
			node["_cullingMask"] = this._cullingMask;
			if (node.childrenCount > 0) {
				node.children.map(child => this.cull(child));
			}
		}
	}
}
