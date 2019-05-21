/**
 * 背景doge
 * @author wheatup
 * @version 1.0
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class Doge extends cc.Component {

	xDir: number = 1;
	yDir: number = 1;

	// 让doge在屏幕上跑来跑去
	update(dt) {
		this.node.x += dt * 100 * this.xDir;
		this.node.y += dt * 100 * this.yDir;

		let width = (cc.Canvas.instance.node.width - this.node.width) * 0.5;
		let height = (cc.Canvas.instance.node.height - this.node.height) * 0.5;

		if (this.node.x < -width) {
			this.xDir = 1;
		} else if (this.node.x > width) {
			this.xDir = -1;
		}

		if (this.node.y < -height) {
			this.yDir = 1;
		} else if (this.node.y > height) {
			this.yDir = -1;
		}
	}
}
