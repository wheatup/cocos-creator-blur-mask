/**
 * 点击面板弹出提示框行为
 * @author wheatup
 * @version 1.0
 */

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

		this.tapReceiver.on('touchstart', () => this.showing ? this.hide() : this.show(), this);
	}

	show() {
		this.showing = true;
		this.mask.active = true;
		this.panel.active = true;

		Wheen.stop(this.mask);
		new Wheen(this.mask)
			.to({ opacity: 255 }, 500, Wheen.Easing.Cubic.easeOut)
			.start();

		Wheen.stop(this.panel);
		new Wheen(this.panel)
			.to({ opacity: 255, scale: 1 }, 500, Wheen.Easing.Back.easeOut)
			.start();
	}

	hide() {
		this.showing = false;
		this.panel.active = true;

		Wheen.stop(this.mask);
		new Wheen(this.mask)
			.to({ opacity: 0 }, 500, Wheen.Easing.Cubic.easeOut)
			.callFunc(() => this.panel.active = false)
			.start();

		Wheen.stop(this.panel);
		new Wheen(this.panel)
			.to({ opacity: 0, scale: 0 }, 500, Wheen.Easing.Back.easeIn)
			.callFunc(() => this.panel.active = false)
			.start();
	}
}
