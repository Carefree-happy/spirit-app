# 1. feat: create project
» npx create-expo-app@latest  
» cd SpiritApp
移动所有文件到上一层
mv * ../
如果有隐藏文件（如 .env 或 .gitignore）
mv .* ../ 2>/dev/null
cd ../
删除空目录
rmdir SpiritApp
强制删除
rm -rf SpiritApp

安装vscode插件
expo tools 
ES7+ React/Redux/React-Native snippets 
rnfe 函数式组件
Commond(Ctrl) + D 快速选中重复名称

#2. feat: build a app
创建 declarations.d.ts 解决 TypeScript 识别问题
Shift + Option + ⬇️ 快速向下复制