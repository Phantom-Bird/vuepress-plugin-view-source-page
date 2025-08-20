// **WARNING**
// 如果不使用 plume，请移除默认的 css

import { createPage, App } from 'vuepress/core'
import { basename } from 'path'

interface ViewSourceOptions {
  /**
   * default: `/view-source/:filePath/`
   * 
   * supports: 
   * - Markdown file path (relative): `:filePath`
   * - Page path (without `.html`): `:pagePath`
   * 
   * > **WARNING**
   * > 
   * > 如果路径直接以 `.md` 结尾，vuepress 无法正常识别。此时请在末尾加上 `/`
   */
  viewSourcePathPattern?: string;
  /**
   * default: `View Source of :title`
   * 
   * supports: 
   * - Page title: `:title`
   * - Markdown filename (without `.md`): `:basename`
   */
  viewSourceTitlePattern?: string;
}

function format(pattern: string, values: Record<string, any>): string {
  var res: string = pattern;
  for (var placeholder in values) {
    res = res.replace(`:${placeholder}`, `${values[placeholder]}`);
  }
  return res;
}

const css = `.vp-content {
  --vp-layout-top-height: 20px;
  @media (min-width: 768px) {
    max-width: 80%;
  }
}`;

export default (options: ViewSourceOptions) => ({
  name: 'vuepress-plugin-view-source-page',

  async onInitialized(app: App) {
    const viewSourcePathPattern = options.viewSourcePathPattern
      || '/view-source/:filePath/';
    const viewSourceTitlePattern = options.viewSourceTitlePattern
      || 'View Source of :title';

    const originalPages = [...app.pages];  // 防止边遍历边修改

    for (const page of originalPages) {
      if (!page.filePathRelative || !page.filePath) {
        continue;
      }

      const viewSourcePath = format(viewSourcePathPattern, {
        filePath: page.filePathRelative,
        pagePath: page.path.replace(/\.html$/, ''),
      });

      const viewSourceTitle = format(viewSourceTitlePattern, {
        title: page.title,
        basename: basename(page.filePath, '.md'),
      });

      const viewSourceMarkdownContent = `
# ${viewSourceTitle}
@[code md](${page.filePath})

<style>
${css}
</style>
      `;  // 只能用绝对路径

      // 创建新页面
      const viewSourcePage = await createPage(app, {
        path: viewSourcePath,
        content: viewSourceMarkdownContent,
        frontmatter: {
          title: viewSourceTitle,
          pageLayout: 'page',
        }
      });
      app.pages.push(viewSourcePage);
    }
  },
})
