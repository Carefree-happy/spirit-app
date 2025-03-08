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
创建 declarations.d.ts 解决 TypeScript 识别图片文件的问题

Shift + Option + ⬇️ 快速向下复制

esModuleInterop: true 让 TypeScript 允许 import React from 'react' 这种默认导入方式，否则只能用 import * as React from 'react'

# 3.feat: EAS Development Builds

eas -v

eas login

eas whoami

eas build --platform all 

会需要Apple ID