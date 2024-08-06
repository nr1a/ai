import { bindThis } from '@/decorators.js';
import Module from '@/module.js';

export default class extends Module {
    public readonly name = 'jihou';

    public install() {
        this.startjihou();
        setInterval(this.startjihou, 1000 * 60 * 1);

        return {};
    }

    @bindThis
    private startjihou() {
        const now = new Date();
        const minutes = now.getMinutes();
        const hour = now.getHours();

        if (minutes === 0 && this.isTargetHour(hour)) {
            const message = this.getMessageForHour(hour);
            this.ai.post({
                text: message
            });
        }
    }

    private isTargetHour(hour: number): boolean {
        return [1, 5, 9, 12, 15, 20, 23].includes(hour);
    }

    private getMessageForHour(hour: number): string {
        switch (hour) {
            case 1:
                return '深夜のおやつの時間です♪ええと、今日のおやつは……';
            case 5:
                return 'ふあぁ……おはようございます、こんな時間まで起きていたんですか？早起きならいいんですが……';
            case 9:
                return 'おはようございます！今日も一日がんばりましょう♪';
            case 12:
                return 'お昼の時間です！';
            case 15:
                return 'おやつの時間です♪ええと、今日のおやつは……';
            case 20:
                return '今日も一日お疲れ様でした！お風呂に入って、ご飯を食べてゆっくりしてくださいね♪';
            case 23:
                return 'ふわぁ…… 眠くなってきました、そろそろ寝ますね。おやすみなさい！';
            default:
                return '時間です！';
        }
    }
}
