const path = require('path')
const fs = require('fs')

if(path.basename(__dirname) != 'Osiris'){
    console.log('请在 Osiris 根目录运行本脚本')
    process.exit()
}
if(!fs.existsSync('./Source/UI/Panorama/CreateGUI.js')){
    console.log('未检测到 CreateGUI.js 文件,请检查 Osiris 目录下文件是否完整')
    process.exit()
}

let content = fs.readFileSync('./Source/UI/Panorama/CreateGUI.js', 'utf8')

async function Replace(str1, str2) {
    let str2_unicoded = ''
  
    for (let char of str2) {
      if (/[\u4e00-\u9fff]/.test(char) || char.charCodeAt(0) > 127) {
        str2_unicoded += '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')
      } else {
        str2_unicoded += char
      }
    }
  
    console.log(str1 + '=>' + str2 + ' (' + str2_unicoded + ')')
    content = content.replace(new RegExp(str1, 'g'), str2_unicoded)
}

//开始替换
//请务必给简单的单词翻译加上\'\',提高匹配精准度.(有些可能是\"\")

//功能分区选项
Replace('\"HUD\"','\"界面\"')
Replace('\"Visuals\"','\"视觉\"')
Replace('\"Sound\"','\"声音\"')

//功能分区选项分选项
//Visuals
Replace('Player Info In World','世界中玩家信息')
Replace('Outline Glow','人体描边')

//选项开关,模式
Replace('\"Yes\"','\"是\"')
Replace('\"No\"','\"否\"')

Replace('\"On\"','\"开\"')
Replace('\"Off\"','\"关\"')
Replace('\'Off\'','\"关\"')

Replace('\'Enemies\'','\'敌人\'')
Replace('\'All Players\'','\'所有玩家\'')
Replace('\'Player / Team Color\'','\'玩家/队伍颜色\'')
Replace('\'Team Color\'','\'队伍颜色\'')
Replace('\'Health-based\'','\'基于生命值\'')
Replace('\'White\'','\'白\'')

//HUD选项
Replace('\'Bomb\'','\'C4相关\'')
Replace('Show Bomb Explosion Countdown And Site','显示C4爆炸倒计时和位置')
Replace('Show Bomb Defuse Countdown','显示C4拆解倒计时')

Replace('\'Killfeed\'','\'击杀反馈\'')
Replace('Preserve My Killfeed During The Round','在当局中保留击杀信息')

Replace('\'Time\'','\'时间\'')
Replace('Show Post-round Timer','显示下一局倒计时')

//Visuals选项
//懒得写了，先摆了

//结束替换
fs.writeFileSync('./Source/UI/Panorama/CreateGUI.js',content)
console.log('已替换完毕')