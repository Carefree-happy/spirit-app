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
