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

        // 毎時0分に時報を送信
        if (minutes === 0) {
            const message = this.getMessageForHour(hour);
            this.ai.post({
                text: message
            });
        }
    }

    private getMessageForHour(hour: number): string {
        switch (hour) {
            case 1:
                return '深夜1時です。深夜のおやつの時間です♪ええと、今日のおやつは……';
            case 5:
                return '朝5時です。ふあぁ……おはようございます、こんな時間まで起きていたんですか？早起きならいいんですが……';
            case 9:
                return '朝9時です。おはようございます！今日も一日がんばりましょう♪';
            case 12:
                return 'お昼12時です。お昼の時間です！';
            case 15:
                return '午後3時です。おやつの時間です♪ええと、今日のおやつは……';
            case 20:
                return '夜8時です。今日も一日お疲れ様でした！お風呂に入って、ご飯を食べてゆっくりしてくださいね♪';
            case 23:
                return '夜11時です。ふわぁ…… 眠くなってきました、そろそろ寝ますね。おやすみなさい！';
            default:
                return `現在${hour}時です。`;
        }
    }
}
