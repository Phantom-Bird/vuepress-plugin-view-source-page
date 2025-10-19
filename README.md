[中文](README.md) / [English](README_en.md)

# vuepress-plugin-view-source-page

为每一个 Markdown 页面生成一个对应的查看源代码页面。

没想着进包管理器，所以没搞这么多东西。

## 使用

将 `view-source-page-style.css` 放入 `.vuepress/public` 文件夹。

```ts
import vuepressPluginViewSourcePage from 'vuepress-plugin-view-source-page'

export default defineUserConfig({
    ...

    plugins: [
        ...

        vuepressPluginViewSourcePage({
            ...
        })
    ],
})
```

### 配置项

---

#### `viewSourcePathPattern?: string`

默认值：`/view-source/:filePath/`

支持的格式化选项：
- 源文件相对路径：`:filePath`
  > **Warning**  
  > 这个路径是相对于文档文件夹（通常为 `docs/`）的路径，而非项目文件夹的路径。  
- 页面路径（去除 `.html`）：`:pagePath`

> [!WARNING]
> 如果路径直接以 `.md` 结尾，vuepress 无法正常识别。此时请在末尾加上 `/`

---

#### `viewSourceTitlePattern?: string`

默认值：`View Source of :narrowBr:title`

支持的格式化选项：
- 此页标题：`:title`
- 源文件基名：`:basename`
- 在窄屏上加一个 `<br/>`：`:narrowBr`
  > `<br/>` 只会影响 `<h1>` 的内容，不会影响 `<head><title>`。

---

## 其他主题

该插件是在 `vuepress-theme-plume` 主题下开发的，样式也只适配了这个主题。如果使用其他主题，有两种解决方案：

- 请参照你所使用的主题的文档，将生成的页面设置成裸页面（无侧边栏和 margin）
- 移除或更改 `css` 字符串
