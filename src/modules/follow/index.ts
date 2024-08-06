import { bindThis } from "@/decorators.js";
import Module from "@/module.js";
import Message from "@/message.js";

export default class extends Module {
	public readonly name = "follow";

	@bindThis
	public install() {
		return {
			mentionHook: this.mentionHook,
		};
	}

	@bindThis
	private async mentionHook(msg: Message) {
		const targetUserId = "@{userid}@omaka.nr1a.inc";

		if (
			msg.text &&
			msg.includes(["フォロー", "フォロバ", "follow me"]) &&
			msg.userId === targetUserId
		) {
			if (!msg.user.isFollowing) {
				this.ai.api("following/create", {
					userId: msg.userId,
				});
				return {
					reaction: msg.friend.love >= 0 ? "like" : null,
				};
			} else {
				return {
					reaction: msg.friend.love >= 0 ? "hmm" : null,
				};
			}
		} else {
			return false;
		}
	}
}
