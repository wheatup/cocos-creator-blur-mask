// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Logic extends cc.Component {

	// 点击对象
	@property(cc.Node)
	tapReceiver: cc.Node = null;

	@property(cc.Node)
	mask: cc.Node = null;

	@property(cc.Node)
	panel: cc.Node = null;

	showing: boolean = false;

	onLoad() {
		this.panel.active = false;
		this.panel.opacity = 0;
		this.panel.scale = 0.2;

		this.mask.active = false;
		this.mask.opacity = 0;

		this.tapReceiver.on('mousedown', () => this.showing ? this.hide() : this.show(), this);
	}

	show() {
		this.showing = true;
		this.mask.active = true;
		this.panel.active = true;
		new Wheen(this.mask)
			.to({ opacity: 255 }, 500, Wheen.Easing.Cubic.easeOut)
			.start();

		new Wheen(this.panel)
			.to({ opacity: 255, scale: 1 }, 500, Wheen.Easing.Back.easeOut)
			.start();
	}

	hide() {
		this.showing = false;
		this.panel.active = true;
		new Wheen(this.mask)
			.to({ opacity: 0 }, 500, Wheen.Easing.Cubic.easeOut)
			.on('finish', () => this.mask.active = false)
			.start();

		new Wheen(this.panel)
			.to({ opacity: 0, scale: 0 }, 500, Wheen.Easing.Back.easeIn)
			.on('finish', () => this.panel.active = false)
			.start();
	}
}
