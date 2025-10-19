[中文](README.md) / [English](README_en.md)

# vuepress-plugin-view-source-page

Generate a view-source page for each Markdown page.

I didn't do so many things in this imperfect project.

## Usage

Put `view-source-page-style.css` into folder `.vuepress/public`.

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

### Options

---

#### viewSourcePathPattern?: string

default: `/view-source/:filePath/`

supports:
- Markdown file path (relative): `:filePath`
  > **Warning**  
  > This path is relative to the documentation folder (usually `docs/`), not the project folder.
- Page path (without `.html`): `:pagePath`

> [!WARNING]
> If the path ends with `.md`, Vuepress cannot recognize it properly. In this case, please add `/` at the end of the path.

---

#### viewSourceTitlePattern?: string

default: `View Source of :narrowBr:title`

supports:
- Page title: `:title`
- Markdown file basename: `:basename`
- Add a `<br/>` on narrow screen: `:narrowBr`
  > `<br/>` will only affect the content of `<h1>` but not `<head><title>`.

---

## For other themes

This plugin was developed for the `vuepress-theme-plume` theme, and its styles are specific to that theme. If you're using a different theme, there are two solutions:

- Refer to your theme's documentation to configure the generated pages to be bare bones (without sidebars or margins).
- Remove or modify the `css` string.
