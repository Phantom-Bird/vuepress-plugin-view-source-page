# vuepress-plugin-view-source-page

为每一个 Markdown 页面生成一个对应的查看源代码页面 / Generate a view-source page for each Markdown page.

没想着进包管理器，所以没搞这么多东西 / I didn't do so many things in this imperfect project.

## 使用 / Usage

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

### 配置项 / Options

---

#### `viewSourcePathPattern?: string`

默认值 / default: `/view-source/:filePath/`

支持的格式化选项 / supports:
- 源文件相对路径 / Markdown file path (relative): `:filePath`
  > [!WARNING]
  > 这个路径是相对于文档文件夹（通常为 `docs/`）的路径，而非项目文件夹的路径。  
  > This path is relative to the documentation folder (usually `docs/`), not the project folder.
- 页面路径（去除 `.html`）/ Page path (without `.html`): `:pagePath`

> [!WARNING]
> 如果路径直接以 `.md` 结尾，vuepress 无法正常识别。此时请在末尾加上 `/`

---

#### `viewSourceTitlePattern?: string`

默认值 / default: `View Source of :title`

支持的格式化选项 / supports:
- 此页标题 / Page title: `:title`
- 源文件基名 / Markdown file basename: `:basename`

---

## 其他主题

该插件是在 `vuepress-theme-plume` 主题下开发的，样式也只适配了这个主题。如果使用其他主题，有两种解决方案：

- 请参照你所使用的主题的文档，将生成的页面设置成裸页面（无侧边栏和 margin）
- 移除或更改 `css` 字符串

This plugin was developed for the `vuepress-theme-plume` theme, and its styles are specific to that theme. If you're using a different theme, there are two solutions:

- Please refer to your theme's documentation to configure the generated pages to be bare bones (without sidebars or margins).
- Remove or modify the `css` string.
