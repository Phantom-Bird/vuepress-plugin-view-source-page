const css = '/view-source-page-style.css';

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
   * > If the path ends with `.md`, Vuepress cannot recognize it properly. In this case, please add `/` at the end of the path.
   */
  viewSourcePathPattern?: string;
  /**
   * default: `View Source of :narrowBr:title`
   * 
   * supports: 
   * - Page title: `:title`
   * - Markdown filename (without `.md`): `:basename`
   * - add a `<br/>` on narrow screen: `:narrowBr`
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

export default (options: ViewSourceOptions) => ({
  name: 'vuepress-plugin-view-source-page',

  async onInitialized(app: App) {
    const viewSourcePathPattern = options.viewSourcePathPattern
      || '/view-source/:filePath/';
    const viewSourceTitlePattern = options.viewSourceTitlePattern
      || 'View Source of :narrowBr:title';

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
        narrowBr: '',
      });

      const viewSourceH1 = format(viewSourceTitlePattern, {
        title: page.title,
        basename: basename(page.filePath, '.md'),
        narrowBr: '<br class="only-narrow"/>',
      });

      const viewSourceMarkdownContent = `
# ${viewSourceH1}
@[code md](${page.filePath})

<link href="${css}" rel="stylesheet"/>
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
