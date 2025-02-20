// src/styles/App.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    /* 顶层容器 */
    appContainer: {
        flex: 1,
        flexDirection: "column", // React Native 不支持 `display: flex`，默认 `flexDirection: column`
        backgroundColor: "#fff7e0",
    },

    /* 适配不同屏幕 */
    responsiveContainer: {
        flex: 1,
    },

    /* 主内容容器 */
    mainContentContainer: {
        flex: 1,
        overflow: "hidden", // React Native 没有 `overflow-y: auto`
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});
